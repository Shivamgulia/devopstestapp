import React, { useState } from "react";
import toast from "react-hot-toast";

import styles from "@/styles/components/Auth/Forgot.module.css";
import { passwordReset } from "../lib/authApi";
import { useRouter } from "next/router";

function Forgot() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  function resetPassword(event) {
    event.preventDefault();
    setLoading(true);
    setError(false);
    const email = event.target[0].value;
    const password = event.target[1].value;

    updatePassword(email, password);
  }

  async function updatePassword(email, password) {
    const shipName = router.query.shipname;
    const response = await passwordReset(email, password, shipName);
    const { data } = response;
    setError(response.error ? true : false);
    setLoading(false);
    if (!response.error) {
      toast.success("Password Updated Successfully");
    } else {
      toast.error(response.error);
    }
  }

  return (
    <div className={`${styles.cont}`}>
      <h1>Reset Password</h1>
      <form onSubmit={resetPassword} className={`${styles.form}`}>
        {error && <p className={`${styles.error}`}>Error resetting password</p>}
        <div className={styles.inputDiv}>
          <input
            type="text"
            placeholder="Username"
            className={`${styles.input}`}
            required
          />
        </div>
        <div className={styles.inputDiv}>
          <input
            type="text"
            placeholder="password"
            className={`${styles.input}`}
            required
          />
        </div>
        <div>
          <button className={`${styles.button}`} disabled={loading}>
            {loading ? " Loading ... " : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Forgot;
