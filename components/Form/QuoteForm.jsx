import { useSession } from "next-auth/react";
import React, { useState } from "react";

import styles from "@/styles/components/Form/QuoteForm.module.css";

function QuoteForm() {
  const [error, setError] = useState(false);

  const session = useSession();

  async function addQuote(event) {
    event.preventDefault();

    const author = event.target[0].value;
    const quote = event.target[1].value;

    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author,
        quote,
        userid: session.data.user.user.id,
      }),
    });

    if (!res.ok) {
      setError(true);
      return;
    } else {
      setError(false);
    }
  }

  return (
    <div className={styles.cont}>
      {error && <h2>Failed to add quote</h2>}
      <form onSubmit={addQuote} className={styles.form}>
        <label htmlFor="author" className={styles.label}>
          Author
        </label>
        <input type="text" name="author" className={styles.input} />
        <label htmlFor="name" className={styles.label}>
          Quote
        </label>
        {/* <input
          type="text"
          name="quote"
          className={`${styles.input} ${styles.quote}`}
        /> */}
        <textarea
          id="w3review"
          name="w3review"
          rows="4"
          cols="50"
          className={`${styles.input}`}
        ></textarea>

        <button type="submit" className={styles.button}>
          Add Quote
        </button>
      </form>
    </div>
  );
}

export default QuoteForm;
