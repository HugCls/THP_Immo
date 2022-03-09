import Layout from "../../components/Layout"
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import models from "../../lib/models";
import axios from "axios";
import { deserialize, serialize } from "superjson";
import { Button, FormGroup, TextField, Typography } from "@mui/material";

import type { User } from "@prisma/client";


export default function Profile({ rawUser }) {
  const user = deserialize<User>(rawUser);
  
  const { data: session, status } = useSession({ required: true });
  const isUser = !!session?.user
  const formRef = useRef(null);
  const [disable, setDisable] = useState(false);

  const editProfile = async (e) => {
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
  if (!isUser) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <Layout>
      <h1>Signed in as {session.user.email} </h1>
      {/* <FormGroup sx={{width: '50%', display:'flex', flexDirection: 'column'}}  >
        <Typography variant='h5'>Nouveau message</Typography>
        <TextField sx={{marginTop: 2}} name="text" id="text" label="text" value={text} onChange={onTextChange}/>
        <Button variant="contained" color="primary" type="submit" sx={{marginTop: 2}}>Submit</Button>
      </FormGroup> */}
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

export async function getServerSideProps(context) {

  const { id } = context.params
  const rawUser = await models.user.findUnique({ where: { id: parseInt(id) } });
  return {
    props: {
      rawUser :serialize(rawUser),
    },
  };
}