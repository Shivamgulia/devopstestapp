import SignUp from "@/components/Auth/SignUp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function signup() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status == "authenticated") {
      router.push("/");
    }
  }, [session.status]);
  return (
    <div>
      <SignUp />
    </div>
  );
}

export default signup;
