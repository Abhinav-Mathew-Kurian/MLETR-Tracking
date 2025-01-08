import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Container,
  CardMedia,
  Tooltip,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";

function ViewFiles() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://mletr-tracking-backend.onrender.com/api/files")
      .then((response) => setFiles(response.data))
      .catch((error) => {
        console.error("Error fetching files:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch files. Please try again later.",
          confirmButtonColor: "#3085d6",
        });
      });
  }, []);

  const handleDownload = async (fileId) => {
    try {
      const { value: privateKey, isConfirmed } = await Swal.fire({
        title: "Enter your private key",
        input: "textarea",
        inputLabel: "Private Key",
        inputPlaceholder: "Paste your private key here",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        inputValidator: (value) => {
          if (!value) {
            return "Please enter your private key";
          }
        },
      });
  
      if (!isConfirmed || !privateKey) return;
  
      Swal.fire({
        title: "Downloading...",
        text: "Please wait while we process your request",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      const response = await axios.post(
        "https://mletr-tracking-backend.onrender.com/api/download",
        { fileId, privateKey: privateKey.trim() },
        {
          responseType: "blob",
          headers: { Accept: "*/*" },
        }
      );
  
      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
  
      let filename = "downloaded-file";
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
  
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Download Complete",
        text: "Your file has been downloaded successfully!",
        confirmButtonColor: "#3085d6",
      });
  
    } catch (error) {
      console.error("Error downloading file:", error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: error.response?.data?.error || "Failed to download file. Please check your private key and try again.",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          left: { xs: 16, sm: 24 },
          top: { xs: 16, sm: 24 },
          backgroundColor: 'background.paper',
          boxShadow: 1,
          '&:hover': {
            backgroundColor: 'background.paper',
            boxShadow: 2,
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 700,
          color: "primary.main",
          mb: 4,
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        Available Files
      </Typography>
      <Grid container spacing={3}>
        {files.map((file) => (
          <Grid item xs={12} sm={6} md={4} key={file.id}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                sx={{
                  height: 140,
                  bgcolor: "grey.100",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <InsertDriveFileIcon
                  sx={{
                    fontSize: 60,
                    color: "primary.main",
                    opacity: 0.8,
                  }}
                />
              </CardMedia>
              <CardContent sx={{ flexGrow: 1, pb: 0 }}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {file.filename}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Uploaded: {new Date(file.uploadDate).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Tooltip title="Download File">
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleDownload(file.id)}
                    startIcon={<DownloadIcon />}
                    sx={{
                      py: 1,
                      textTransform: "none",
                      borderRadius: 2,
                      boxShadow: 2,
                      "&:hover": {
                        boxShadow: 4,
                      },
                    }}
                  >
                    Download
                  </Button>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ViewFiles;