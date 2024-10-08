import React, { Fragment, useState } from "react";
import styles from "@/styles/components/Auth/Login.module.css";
// import toast from "react-hot-toast";

import { signUp } from "../lib/authApi";
import { useRouter } from "next/router";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [desList, setDesList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function signup(event) {
    event.preventDefault();
    setLoading(true);
    setError(false);

    const username = event.target[0].value;
    const name = event.target[1].value;
    const password = event.target[2].value;

    const response = await signUp({
      username,
      name,
      password,
    });

    const { data } = response;
    setError(response.error ? true : false);
    setLoading(false);
    if (!response.error) {
      // toast.success("User Created Successfully");
      alert("User Created Successfully");
    } else {
      // toast.error(response.error);
      alert(response.error);
    }
  }

  return (
    <>
      <div className={`${styles.cont}`}>
        <div className={styles.loginCont}>
          <div className={`${styles.formDiv}`}>
            <h1 className={`${styles.heading}`}>Create User</h1>
            <form className={styles.loginForm} onSubmit={signup}>
              <div className={`${styles.error}`}>
                {error && <h4>SignUp Failed</h4>}
              </div>
              <div className={styles.formInput}>
                <label htmlFor="uname" className={styles.label}>
                  User Name
                </label>
                <input
                  type="text"
                  name="uname"
                  id="uname"
                  placeholder="JhonDoe"
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formInput}>
                <label htmlFor="uname" className={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  name="uname"
                  id="uname"
                  placeholder="JhonDoe"
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formInput}>
                <label htmlFor="pass" className={styles.label}>
                  Passwords
                </label>
                <input
                  className={styles.input}
                  type={showPassword ? "text" : "password"}
                  name="pass"
                  id="pass"
                  placeholder={showPassword ? "password@123" : "XXXXXXXXXXXX"}
                  required
                />
              </div>
              <div className={`${styles.showPasswordDiv}`}>
                <input
                  type="checkbox"
                  id="showP"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className={`${styles.passCheck}`}
                />
                <label htmlFor="showP">Show Password</label>
              </div>

              <button className={styles.loginButton} disabled={loading}>
                {loading ? "Loading" : "Signup"}
              </button>
            </form>
            <button
              className={styles.loginButton}
              onClick={() => {
                router.push("/login");
              }}
            >
              Go To Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
