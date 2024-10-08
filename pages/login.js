import Login from "@/components/Auth/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function login() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status == "authenticated") {
      router.push("/");
    }
  }, [session.status]);

  return (
    <div>
      <Login />
    </div>
  );
}

export default login;
