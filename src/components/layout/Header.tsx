import {
  Typography,
  Container,
  Grid,
  Box,
  Divider,
  Button,
} from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header(): JSX.Element {
  const router = useRouter();
  const {data: session, status} = useSession();
  
  const navLinks = [
    { title: `THP immo`, path: `/` },
    { title: `Contact`, path: `/contact` }
  ]

  let right = null;

  if (status === 'loading') {
    right = (<p>Validating session ...</p>)
  }

  if (!session) {
    right = (
      <Link href="/auth/email-signin"  passHref>
        <Button
          sx={{ mr: 2 }}
          color={router.pathname === "/auth/email-signin" ? "primary" : "secondary"}
        >
          Sign up
        </Button>
      </Link>
      )
  }

  if (session) {
    right = (
        <Box>
          <Link href={"/profile/" + session.user.id}  passHref>
            <Button
              sx={{ mr: 2 }}
              color={router.pathname.includes("/profile/") ? "primary" : "secondary"}
            >
              {session.user.name ? session.user.name : session.user.email }
            </Button>
          </Link>
          <Button
            sx={{ mr: 2 }}
            color={router.pathname === "/auth/email-signin" ? "primary" : "secondary"}
            onClick={() => signOut({callbackUrl:"/"})}
          >
            Log out
          </Button>
        </Box>
      )
  }
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Container maxWidth="md" sx={{ py: 1, display: 'flex', flexDirection: 'row' }}>
        <Grid container alignItems="center">
            <Typography variant="body1" align="center" sx={{ fontWeight: 600 }}>
            {navLinks.map((link,i) => 
              <Link key={i} href={link.path} passHref>
                <Button
                  sx={{ mr: 2 }}
                  color={router.pathname === link.path ? "primary" : "secondary"}
                >
                  {link.title}
                </Button>
              </Link>
            )}
            </Typography>
          </Grid>
          <Grid container item xs={10} justifyContent="flex-end">
            {right}
          </Grid>
      </Container>
      <Divider />
    </Box>
  );
}
