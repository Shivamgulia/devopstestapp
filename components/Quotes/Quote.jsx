import React from "react";

import styles from "@/styles/components/Quote/Quote.module.css";
import { useRouter } from "next/router";

function Quote(props) {
  const router = useRouter();

  async function deleteQuote() {
    const res = await fetch("/api/myquotes?id=" + props.quote.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      alert("Delete Failed");
    } else {
      props.reloadQuotes();
    }
    props.reloadQuotes();
  }

  return (
    <div className={styles.cont}>
      <h2 className={styles.quote}>{props.quote.quote}</h2>
      <div className={styles.bottom}>
        <div>
          {router.pathname == "/myquote" && (
            <button onClick={deleteQuote} className={styles.delete}>
              delete
            </button>
          )}
        </div>
        <div>
          <h3 className={styles.author}>{props.quote.author}</h3>
        </div>
      </div>
    </div>
  );
}

export default Quote;
