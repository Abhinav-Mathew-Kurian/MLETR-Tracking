import React, { useState } from 'react';
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
} from '@mui/material';
import { CloudUpload, Lock, CheckCircle } from '@mui/icons-material';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [publicKey, setPublicKey] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setError('');
    } else {
      setSnackbarMessage('Please select a valid PDF file');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setSelectedFile(null);
    }
  };

  const handlePublicKeyChange = (event) => {
    setPublicKey(event.target.value);
  };

  const handleUpload = async () => {
    if (!selectedFile || !publicKey) {
      setSnackbarMessage('Please select a file and provide a public key');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('publicKey', publicKey);

    try {
      const response = await axios.post('https://mletr-tracking-backend.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess('File encrypted and uploaded successfully!');
        setSnackbarMessage('File uploaded successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setSelectedFile(null);
        setPublicKey('');
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      setSnackbarMessage('Failed to upload and encrypt file: ' + err.message);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setUploading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card
      sx={{
        marginTop:10,
        maxWidth: 600,
        marginLeft:"25%",
        padding: 4,
        borderRadius: 3,
        boxShadow: 4,
        backgroundColor: '#f5f5f5',
      }}
    >
      <CardHeader
        title={<Typography variant="h4" align="center" color="primary">Secure PDF Upload</Typography>}
        sx={{ paddingBottom: 2 }}
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                border: '2px dashed #90caf9',
                borderRadius: 2,
                padding: 2,
                textAlign: 'center',
                backgroundColor: '#e3f2fd',
              }}
            >
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Drag & Drop your PDF file here or
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUpload />}
                onClick={() => document.getElementById('fileInput').click()}
              >
                Choose File
              </Button>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginTop: 1 }}
              >
                {selectedFile ? selectedFile.name : 'No file selected'}
              </Typography>
              <input
                id="fileInput"
                type="file"
                accept="application/pdf"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
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
              startIcon={uploading ? <CircularProgress size={20} /> : <Lock />}
            >
              {uploading ? 'Encrypting & Uploading...' : 'Encrypt & Upload'}
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
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default FileUpload;
