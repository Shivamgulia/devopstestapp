import Head from "next/head";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import Layout from "@/components/UI/Layout";

import styles from "@/styles/components/Auth/ChangePassword.module.css";
import { useState } from "react";

export default function ChangePassword() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const session = useSession();

  async function resetPassword(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const formObj = Object.fromEntries(form);
    const email = session.data.user.user.username;
    const shipname = session.data.user.user.ship;
    const reqObj = {
      email,
      shipname,
      oldpassword: formObj.oldpassword,
      newpassword: formObj.newpassword,
    };
    if (formObj.newpassword == formObj.repassword) {
      try {
        const res = await fetch("/api/auth/forget_password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqObj),
        });

        if (res.ok) {
          toast.success("Password Updated");
        } else {
          const data = await res.json();

          toast.error(data.message);
        }
      } catch (e) {
        setError(true);
        toast.error("Failed to Update Password try again later");
      }
    } else {
      setError(true);
      toast.error("New Passwords do not Match");
    }
  }

  return (
    <>
      <Head>Update</Head>
      <Layout>
        <div className={`${styles.signCont}`}>
          <h1 className={styles.head}>Reset Password</h1>
          <form onSubmit={resetPassword} className={`${styles.form}`}>
            {error && (
              <p className={`${styles.error}`}>Error Reseting Password</p>
            )}

            <div className={styles.inputDiv}>
              <label htmlFor="" className={styles.label}>
                Current Password :
              </label>
              <input
                type="text"
                name="oldpassword"
                className={`${styles.input}`}
                placeholder="Current Password"
              />
            </div>

            <div className={styles.inputDiv}>
              <label htmlFor="" className={styles.label}>
                New Password :
              </label>
              <input
                type="text"
                name="newpassword"
                className={`${styles.input}`}
                placeholder="New Password"
              />
            </div>
            <div className={styles.inputDiv}>
              <label htmlFor="" className={styles.label}>
                Confirm Password :
              </label>
              <input
                type="text"
                className={`${styles.input}`}
                name="repassword"
                placeholder="Repeat Password"
              />
            </div>

            <button
              type="submit"
              className={`${styles.button}`}
              disabled={loading}
            >
              {loading ? " Loading... " : "Reset Password"}
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
}
