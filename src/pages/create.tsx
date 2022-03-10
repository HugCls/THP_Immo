import React, { useState } from "react";
import Router from "next/router";
import { Box, Button, FormGroup, TextField, Typography } from "@mui/material";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch(`http://localhost:3000/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    /*
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Signed in as {session.user.email} </h1>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <form ref={formRef}>
        <FormGroup sx={{ mt: 8, display: 'flex', flexDirection: 'column' }}  >
          <TextField label="Email" type="editEmail" id="editEmail" name="editEmail" defaultValue={user?.email} sx={{ mt: 2 }} />
          <TextField label="Nom" type="editName" id="editName" name="editName" defaultValue={user?.name} sx={{ mt: 2 }} />
          <TextField label="Lien vers une image" type="editImage" id="editImage" name="editImage" defaultValue={user?.image} sx={{ mt: 2 }} />
          <Button sx={{ mt: 2 }} type="submit" onClick={(e) => editProfile(e)}>Enregistrer</Button>
        </FormGroup>
      </form>
    </Box>
    <div>
     {  <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
    </div> */
    <></>
  );
};

export default Draft;
