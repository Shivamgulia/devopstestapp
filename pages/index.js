import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Login from "@/components/Auth/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Main from "@/components/Main/Main";
import Layout from "@/components/Layout/Layout";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session.status);
    if (session.status == "unauthenticated") {
      router.push("/login");
    }
  }, [session.status]);

  if (session.status != "authenticated") {
    return <LoadingSpinner />;
  }

  return (
    <Layout>
      <Main />
    </Layout>
  );
}
