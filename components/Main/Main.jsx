import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import QuoteList from "../Quotes/QuoteList";

function Main() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status == "unauthenticated") {
      router.push("/login");
    }
  }, [session.status]);

  return (
    <div>
      <QuoteList />
    </div>
  );
}

export default Main;
