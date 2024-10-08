import Layout from "@/components/Layout/Layout";
import Main from "@/components/Main/Main";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import LoadingSpinner from "@/components/UI/LoadingSpinner";

function myquote() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status == "unauthenticated") {
      router.push("/");
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

export default myquote;
