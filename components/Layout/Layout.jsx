import { Fragment } from "react";

import styles from "@/styles/components/Layout/Layout.module.css";
import Navbar from "./Navbar";

const Layout = (props) => {
  return (
    <Fragment>
      <Navbar />
      <main className={styles.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
