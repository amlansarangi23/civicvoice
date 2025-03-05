import { Appbar } from "@/components/navbar";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { signIn } from "next-auth/react";
import Signup from "./SignUp/page";
import Display from "@/components/Display";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}

export default async function Home() {
  const session = await getUser();

  return (
    <div>
      <Appbar />
      <Signup/>
      <Display/>
    </div>
  );
}