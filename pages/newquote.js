import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import QuoteForm from "@/components/Form/QuoteForm";

function newquote() {
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
      <QuoteForm />
    </Layout>
  );
}

export default newquote;
