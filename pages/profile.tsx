import Layout from "../components/Layout"
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import axios from "axios";


export default function Profile({ user }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const formRef = useRef(null);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    console.log(status);
 
    if (!session && status !== "loading") {
      router.push("/");
    }
  }, [session, status])

  async function editProfile(){
    setDisable(true)
    const {
      editName,
      editEmail,
      editImage,
    } = formRef.current;
    const name = editName.value;
    const email = editEmail.value;
    const image = editImage.value;

    await axios.put("/api/edit_user_profile", {
      id: parseInt(user?.id),
      name,
      email,
      image
    })
    setDisable(false);
    window.location.reload();
  }

  if (!session && status === "loading") {
    return (<h1>loading ...</h1>)
  }

  if (session) {
    return (
      <Layout>
        <h1>Signed in as {session.user.email} </h1>
        <form ref={formRef}>
         <input defaultValue={user?.name} name="editName" type="text" />
         <input defaultValue={user?.email} name="editEmail" type="text" />
          <input defaultValue={user?.image} name="editImage" type="text" />
          <button disabled={disable} className="btn" onClick={() => editProfile()}>
            Save
          </button>
        </form>
      </Layout>
    )
  }
  console.log(status);
}

export async function getServerSideProps(context) {
  const prisma = new PrismaClient();

  console.log(context.params)
  await prisma.user.findUnique({ where: { id: parseInt(id) } });
  const user = ""
  return {
    props: {
      user,
    },
  };
}