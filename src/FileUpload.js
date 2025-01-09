import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Grid,
  Snackbar,
  Alert,
  Box,
  IconButton,
} from "@mui/material";
import { CloudUpload, Lock, CheckCircle, ArrowBack } from "@mui/icons-material";
import axios from "axios";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const FileUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [publicKey, setPublicKey] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const addDigitalSignature = async (pdfBytes) => {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const signature = localStorage.getItem("signature");


    firstPage.moveTo(30, 85);
    firstPage.drawLine({
      start: { x: 30, y: 85 },
      end: { x: 35, y: 80 },
      thickness: 2,
      color: rgb(0, 0.6, 0),
    });
    firstPage.drawLine({
      start: { x: 35, y: 80 },
      end: { x: 40, y: 90 },
      thickness: 2,
      color: rgb(0, 0.6, 0),
    });

    firstPage.drawText("Digitally Signed by Abhinav", {
      x: 50,
      y: 85,
      size: 12,
      font: helveticaBold,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText("Signature:", {
      x: 50,
      y: 65,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });


    firstPage.drawText(signature, {
      x: 50,
      y: 50,
      size: 8, 
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    // Add timestamp
    const timestamp = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    firstPage.drawText(`Signed on: ${timestamp}`, {
      x: 50,
      y: 35,
      size: 10,
      font: helveticaFont,
      color: rgb(0.4, 0.4, 0.4),
    });

    firstPage.drawRectangle({
      x: 25,
      y: 30,
      width: 450, 
      height: 70, 
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
      opacity: 0.1,
    });

    return await pdfDoc.save();
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setError("");
    } else {
      setSnackbarMessage("Please select a valid PDF file");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setSelectedFile(null);
    }
  };

  const handlePublicKeyChange = (event) => {
    setPublicKey(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !publicKey) {
      setSnackbarMessage("Please select a file and provide a public key");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      // Read the file as ArrayBuffer
      const fileBuffer = await selectedFile.arrayBuffer();

      // Add digital signature to PDF
      const signedPdfBytes = await addDigitalSignature(fileBuffer);

      // Create new File object with signed PDF
      const signedFile = new File([signedPdfBytes], selectedFile.name, {
        type: "application/pdf",
      });

      const formData = new FormData();
      formData.append("file", signedFile);
      formData.append("publicKey", publicKey);

      const response = await axios.post(
        "http://localhost:5001/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setSuccess("File signed, encrypted and uploaded successfully!");
        setSnackbarMessage("File uploaded successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setSelectedFile(null);
        setPublicKey("");
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      setSnackbarMessage("Failed to upload and encrypt file: " + err.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          left: { xs: 16, sm: 24 },
          top: { xs: 16, sm: 24 },
          backgroundColor: "background.paper",
          boxShadow: 1,
          "&:hover": {
            backgroundColor: "background.paper",
            boxShadow: 2,
          },
        }}
      >
        <ArrowBack />
      </IconButton>

      <Card
        sx={{
          marginTop: 10,
          maxWidth: 600,
          marginLeft: "25%",
          padding: 4,
          borderRadius: 3,
          boxShadow: 4,
          backgroundColor: "#f5f5f5",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h4" align="center" color="primary">
              Secure PDF Upload
            </Typography>
          }
          sx={{ paddingBottom: 2 }}
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "2px dashed #90caf9",
                  borderRadius: 2,
                  padding: 2,
                  textAlign: "center",
                  backgroundColor: "#e3f2fd",
                }}
              >
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Drag & Drop your PDF file here or
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUpload />}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Choose File
                </Button>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginTop: 1 }}
                >
                  {selectedFile ? selectedFile.name : "No file selected"}
                </Typography>
                <input
                  id="fileInput"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={publicKey}
                onChange={handlePublicKeyChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="-----BEGIN PUBLIC KEY-----..."
                label="Public Key (PEM format)"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!selectedFile || !publicKey || uploading}
                fullWidth
                startIcon={
                  uploading ? <CircularProgress size={20} /> : <Lock />
                }
              >
                {uploading
                  ? "Signing, Encrypting & Uploading..."
                  : "Sign, Encrypt & Upload"}
              </Button>
            </Grid>

            {success && (
              <Grid item xs={12}>
                <Typography color="success" variant="body2">
                  <CheckCircle sx={{ marginRight: 1 }} /> {success}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Card>
    </Box>
  );
};

export default FileUpload;
