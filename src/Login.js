import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid, Paper, Container, Divider } from "@mui/material";
import {  Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LockOutlined, EmailOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    Swal.fire({
      title: "Logging in...",
      text: "Please wait while we process your request",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false, 
    });

    try {
      const res = await axios.post("https://mletr-tracking-backend.onrender.com/login", form);
  
      Swal.close();
      localStorage.setItem("token", res.data.token);
      console.log(res.data.token)
      Swal.fire({
        icon: "success",
        title: "Logged in successfully",
        text: "Redirecting to your dashboard...",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
     
      Swal.close();
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "There was an error during login. Please try again.",
      });
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left side content */}
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          bgcolor: "#004d4d",
          color: "white",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(45deg, rgba(0,77,77,0.95) 0%, rgba(0,77,77,0.8) 100%)",
            zIndex: 1,
          },
        }}
      >
        <Container
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
            pl: 8,
            pr: 4,
          }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                color: "white",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                textAlign: "left",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Welcome Back to ETR Tracker
            </Typography>

            <Divider
              sx={{
                mb: 4,
                borderColor: "#80ffff",
                width: "100px",
                borderWidth: 2,
              }}
            />

            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: "#80ffff",
                textAlign: "left",
                fontWeight: 500,
                lineHeight: 1.4,
                maxWidth: "600px",
              }}
            >
              Your journey continues here, unlocking full access to your global
              trade tracking tools.
            </Typography>

            <Box sx={{ my: 5 }}>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: "#b3ffff",
                  textAlign: "left",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  maxWidth: "550px",
                }}
              >
                Access your personalized dashboard to manage all your
                trade-related activities in one secure place.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#b3ffff",
                  textAlign: "left",
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  maxWidth: "550px",
                }}
              >
                Stay connected and secure with our robust login system, ensuring
                that your data is always protected.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Grid>

      {/* Right side login form */}
      <Grid item xs={12} md={5}>
        <Paper
          elevation={3}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 4,
            bgcolor: "#ffffff",
          }}
        >
          <Box
            component="form"
            sx={{
              maxWidth: 400,
              mx: "auto",
              width: "100%",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                color: "#004d4d",
                fontWeight: 700,
                textAlign: "center",
                letterSpacing: "1px",
              }}
            >
              Login
            </Typography>

            <Box sx={{ position: "relative", mb: 3 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <EmailOutlined sx={{ ml: 1, color: "#004d4d" }} />
                  ),
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#004d4d",
                    transform: "translate(14px, 16px) scale(1)",
                    "&.Mui-focused, &.MuiFormLabel-filled": {
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: "#004d4d",
                      borderWidth: 2,
                    },
                    "&:hover fieldset": {
                      borderColor: "#006666",
                      borderWidth: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderWidth: 2,
                    },
                    "& input": {
                      pr: 1, 
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ position: "relative", mb: 3 }}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <LockOutlined sx={{ ml: 1, color: "#004d4d" }} />
                  ),
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#004d4d",
                    transform: "translate(14px, 16px) scale(1)",
                    "&.Mui-focused, &.MuiFormLabel-filled": {
                      transform: "translate(14px, -9px) scale(0.75)",
                    },
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: "#004d4d",
                      borderWidth: 2,
                    },
                    "&:hover fieldset": {
                      borderColor: "#006666",
                      borderWidth: 2,
                    },
                    "&.Mui-focused fieldset": {
                      borderWidth: 2,
                    },
                    "& input": {
                      pr: 1,
                    },
                  },
                }}
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#004d4d",
                color: "white",
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#006666",
                  transform: "translateY(-2px)",
                  transition: "all 0.2s ease-in-out",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              Login
            </Button>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#004d4d",
                fontSize: "0.95rem",
              }}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#006666",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Register here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
