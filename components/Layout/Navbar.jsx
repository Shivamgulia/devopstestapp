import React from "react";
import styles from "@/styles/components/Layout/Navbar.module.css";
import Link from "next/link";
import { signOut } from "next-auth/react";

function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Great Quote</div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/myquote" activeClassName={styles.active}>
              My Quotes
            </Link>
          </li>
          <li>
            <Link href="/" activeClassName={styles.active}>
              All Quotes
            </Link>
          </li>
          <li>
            <Link href="/newquote" activeClassName={styles.active}>
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
