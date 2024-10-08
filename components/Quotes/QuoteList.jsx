import React, { useState, useEffect } from "react";
import Quote from "./Quote";

import styles from "@/styles/components/Quote/QuoteList.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../UI/LoadingSpinner";

function QuoteList() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const session = useSession();

  async function getQuotes() {
    setLoading(true);
    const res = await fetch("/api/quotes");

    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();

    console.log(data);

    setQuotes(data);
    setLoading(false);
  }

  async function getMyQuotes() {
    setLoading(true);
    const res = await fetch("/api/myquotes?id=" + session.data.user.user.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();

    console.log(data);

    setQuotes(data);
    setLoading(false);
  }

  function reloadQuotes() {
    if (session.status == "authenticated") {
      if (router.pathname == "/myquote") {
        getMyQuotes();
      } else {
        getQuotes();
      }
    }
  }

  useEffect(() => {
    if (session.status == "authenticated") {
      if (router.pathname == "/myquote") {
        getMyQuotes();
      } else {
        getQuotes();
      }
    }
  }, [session.status]);

  if (loading == true) {
    return (
      <div style={{ display: "grid", placeItems: "center" }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={styles.cont}>
      <ul className={styles.list}>
        {quotes.map((quote, index) => {
          console.log(quote);
          return (
            <li key={index} className={styles.listItem}>
              <Quote quote={quote} reloadQuotes={reloadQuotes} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QuoteList;
