import Layout from "../components/Layout"
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";


export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(status);
    if (!session && status !== "loading") {
      router.push("/");
    }
  }, [session, status])
  if (!session && status === "loading") {
    return (<h1>loading ...</h1>)
  }
  if (session) {
    return (
      <Layout>
        <h1>Signed in as {session.user.email} </h1>
      </Layout>
    )
  }
  console.log(status);
}

