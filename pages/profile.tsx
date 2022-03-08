import Layout from "../components/Layout"
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  if (!session) {
    return (<h1>bug</h1>)
  }
  else {
    console.log(session.user)
    return (
      <Layout>
        <h1>Signed in as {session.user.email} </h1>
      </Layout>
    )
  }
}


