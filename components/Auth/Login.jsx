import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";

// import Logo from "@/assets/images/image001.png";
// import { IoIosArrowBack } from "react-icons/io";

import styles from "@/styles/components/Auth/Login.module.css";

export default function Login() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session]);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      username: userName,
      password: password,
      redirect: false,
    });

    if (res.error) setError(true);
    else setError(false);
    setLoading(false);
  }

  return (
    <div className={`${styles.cont}`}>
      <div className={styles.wave1}></div>
      <div className={styles.wave2}></div>
      <div className={styles.wave3}></div>
      <div className={styles.loginCont}>
        <button
          className={`${styles.goback}`}
          onClick={() => {
            router.push("/signup");
          }}
        >
          Sign Up
          {/* <IoIosArrowBack size="30px" /> Back to Ships */}
        </button>

        <div className={`${styles.formDiv}`}>
          <h1 className={`${styles.heading}`}>Login</h1>
          <form action="" className={styles.loginForm} onSubmit={onSubmit}>
            <div className={`${styles.error}`}>
              {error && <h4>Invalid Credentials</h4>}
            </div>
            <div className={styles.formInput}>
              <label htmlFor="uname" className={styles.label}>
                {" "}
                User Name
              </label>
              <input
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
              {loading ? "Loading" : "Login"}
            </button>
          </form>
        </div>
      </div>
      <div className={styles.logo}>
        {/* <Image src={Logo} className={styles.logoImage} /> */}
      </div>
    </div>
  );
}
