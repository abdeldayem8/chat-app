import React, { useState } from 'react'
import { auth ,db} from "../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import {  useNavigate } from 'react-router-dom';
import Link from "@mui/material/Link";
import { Box, Button, Container, CssBaseline, Grid, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import toast,{ Toaster } from 'react-hot-toast';

const theme = createTheme();

export default function Signup() {

  const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate=useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
    // Create a new user account 
    const userCredential = await createUserWithEmailAndPassword(auth,email, password);
    // Update the user's profile with the provided display name
    const update = await updateProfile(auth.currentUser, { displayName: username,});
    // Retrieve detailed user information
    const user = userCredential.user;

    // to set data in firestore 
    setDoc(doc(db,"users",user.uid),{
      username: username,
      email: email,
      userId: user.uid,
      timestamp: new Date(),
    });
    toast.success("Successfully Register",{
        duration:1000,
       });
       // navigate to signin page after register
       setTimeout(function () {
        Navigate('/')
      }, 1000)
    }catch(error){
        if (error.code === 'auth/email-already-in-use') {
            toast.error("Email already in use", {
              duration: 3000,
            });
          } else {
            toast.error("Registration Failed: " + error.message, {
              duration: 3000,
            });
    }
  }
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
                    
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                      {/* username input */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Name"
                                    autoFocus
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Grid>
                            {/* email input */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            {/* password input */}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        {/* sign up button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
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
