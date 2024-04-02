import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useState } from "react";
import toast,{ Toaster } from "react-hot-toast";


const theme = createTheme();

export default function Signin() {

   const[email,setEmail]=useState("");
   const[password,setPassword]=useState("");

   const Navigate =useNavigate();
   
  //  handle click on sign in butoon 
   const handleSubmit = async (e)=>{
      e.preventDefault();
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredential)=>{
        const user = userCredential.user;
        toast.success("Successfully Login", {
            duration: 1000,
          });
          setTimeout(function () {
            Navigate('/chat/1')
          }, 1000)
      }).catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          toast.error("Invalid credentials", {
            duration: 3000,
          });
        } else {
          const errorMessage = error.message;
          toast.error("Login Failed: " + errorMessage, {
            duration: 3000,
          });
        }
      });
  }
  return <>
  <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 15,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                        p:"15px",
                        borderRadius:"6px",
                        
                    }}
                > 
                
                    {/* sign in word */}
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                      {/* email input */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                      
                        />
                        {/* password input */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* remeber me choice */}
                        <FormControlLabel
                            control={<Checkbox value="remember"
                                color="primary" />}
                            label="Remember me"
                        />
                        {/* sign in button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        {/* forget pass and register */}
                        <Grid container>
                          {/* forget pass */}
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            {/* register */}
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        <Toaster/>
  </>
}
