import Layout from "../../components/Layout"
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { deserialize, serialize } from "superjson";




export default function Profile({ user }) {
  deserialize(user);

  user = user.json
  const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user
  const formRef = useRef(null);
  const [disable, setDisable] = useState(false);

  const  editProfile = async (e) => {
    e.preventDefault()
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
      id: user.id,
      name,
      email,
      image
    })
    
    setDisable(false);

  }
  if (isUser) {
    return (
      <Layout>
        <h1>Signed in as {session.user.email} </h1>
        <form ref={formRef}>
          <input defaultValue={user?.name} name="editName" type="text" />
          <input defaultValue={user?.email} name="editEmail" type="text" />
          <input defaultValue={user?.image} name="editImage" type="text" />
          <button disabled={disable} className="btn" onClick={(e) => editProfile(e)}>
            Save
          </button>
        </form>
      </Layout>
    )
  }

  return <div>Loading...</div>
}

export async function getServerSideProps(context) {


  const id = context.params.id
  const prisma = new PrismaClient();
  const rawUser = await prisma.user.findUnique({ where: { id: parseInt(id) } }).finally(async () => { await prisma.$disconnect()});
  const user = serialize(rawUser);
  return {
    props: {
      user,
    },
  };
}