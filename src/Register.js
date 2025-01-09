import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Grid,
  Paper,
  Container,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  LockOutlined,
  EmailOutlined,
  PersonOutline,
} from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!form.email || !form.name || !form.password) {
      setError("All fields are required");
      return false;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (!validateForm()) return;
  
    try {
      Swal.fire({
        title: "Registering...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      // const response = await axios.post("https://mletr-tracking-backend.onrender.com/register", {
      //   email: form.email.trim(),
      //   name: form.name.trim(),
      //   password: form.password,
      // });
      const response = await axios.post("http://localhost:5001/register", {
        email: form.email.trim(),
        name: form.name.trim(),
        password: form.password,
      });
  
      if (response.data.certificate) {
        try {
          localStorage.setItem(
            `cert_${response.data.user.id}`,
            JSON.stringify(response.data.certificate)
          );
        } catch (storageError) {
          console.error("Error storing certificate:", storageError);
          throw new Error("Failed to store certificate");
        }
      }
  
      if (response.data.privateKey) {
        try {
          localStorage.setItem(
            `privateKey_${response.data.user.id}`,
            response.data.privateKey
          );
  
        
          const privateKeyBlob = new Blob([response.data.privateKey], {
            type: "text/plain",
          });
  
         
          const downloadLink = document.createElement("a");
          downloadLink.href = URL.createObjectURL(privateKeyBlob);
          downloadLink.download = `${response.data.user.name}-privateKey.txt`; 
          downloadLink.click(); 
        } catch (storageError) {
          console.error("Error storing private key:", storageError);
          throw new Error("Failed to store private key");
        }
      }
  
      const storedCert = localStorage.getItem(`cert_${response.data.user.id}`);
      const storedKey = localStorage.getItem(
        `privateKey_${response.data.user.id}`
      );
  
      if (!storedCert || !storedKey) {
        throw new Error("Failed to verify stored credentials");
      }
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
  
      setForm({ email: "", name: "", password: "" });
  
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You can now log in with your credentials.",
        confirmButtonText: "OK",
      });
  
      setSuccess("Registration successful!");
  
      console.log("Stored Certificate:", JSON.parse(storedCert));
      console.log("Stored Private Key:", storedKey);
    } catch (error) {
      Swal.close();
  
      let errorMessage = "An error occurred during registration.";
  
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
  
      console.error("Registration error:", error);
  
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
      });
  
      setError(errorMessage);
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
              Welcome to ETR Tracker
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
              A comprehensive platform to access and manage country-specific
              information related to MLETR and other global trade-related ETR
              systems.
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
                Create your account today and unlock the full potential of
                digital trade with access to real-time data, enhanced tracking,
                and seamless integration with global trade standards.
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
                Join our growing community of users and experience a new level
                of transparency, efficiency, and connectivity in your global
                trade processes.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Grid>

      {/* Right side registration form */}
      <Grid item xs={12} md={5}>
        <Paper
          elevation={0}
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
            onSubmit={handleSubmit}
            sx={{
              maxWidth: 400,
              mx: "auto",
              width: "100%",
              p: { xs: 2, md: 4 },
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
              REGISTER
            </Typography>

            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 2,
                  borderRadius: 2,
                }}
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert
                severity="success"
                sx={{
                  mb: 2,
                  borderRadius: 2,
                }}
              >
                {success}
              </Alert>
            )}

            <Box sx={{ position: "relative", mb: 3 }}>
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
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
                required
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <PersonOutline sx={{ ml: 1, color: "#004d4d" }} />
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
                required
                type="password"
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
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
              type="submit"
              sx={{
                mt: 4,
                mb: 3,
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
              Create Account
            </Button>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#004d4d",
                fontSize: "0.95rem",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#006666",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Sign in here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
