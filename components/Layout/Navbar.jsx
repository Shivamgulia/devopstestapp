import React from "react";
import styles from "@/styles/components/Layout/Navbar.module.css";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Great Quote</div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link
              href="/myquote"
              className={router.pathname == "/myquote" ? styles.active : ""}
            >
              My Quotes
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className={router.pathname == "/" ? styles.active : ""}
            >
              All Quotes
            </Link>
          </li>
          <li>
            <Link
              href="/newquote"
              className={router.pathname == "/newquote" ? styles.active : ""}
            >
              Add Quote
            </Link>
          </li>
          <li>
            <button
              activeClassName={styles.active}
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
