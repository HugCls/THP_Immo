import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import NavBar from "./navbar";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <Box sx={{display:"flex", flexDirection: 'column', minHeight: "100vh"}}>
    <NavBar />
    <Box className="layout">{props.children}</Box>
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        background: rgba(0, 0, 0, 0.05);
      }

      input,
      textarea {
        font-size: 16px;
      }

      button {
        cursor: pointer;
      }
    `}</style>
    <style jsx>{`
      .layout {
        padding: 0 2rem;
      }
    `}</style>
  </Box>
);

export default Layout;
