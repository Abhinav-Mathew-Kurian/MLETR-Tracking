import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Swal from "sweetalert2";

const CountryDetails = () => {
  const { state } = useLocation();
  const country = state;
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const hasData = country && (country.name || country.iso_a3 || country.image);

  useEffect(() => {
    const showAlert = async () => {
      if (country?.level === undefined) {
        await Swal.fire({
          title: "Limited Data Available",
          text: "This country's interaction with MLETR is minimal, more data will be updated shortly.",
          icon: "info",
          confirmButtonText: "Understood",
          confirmButtonColor: "#3b82f6",
          background: "#1f2937",
          color: "#fff",
          customClass: {
            title: "font-playfair",
            popup: "rounded-lg border border-gray-700",
          },
        });
      }
    };
    showAlert();
  }, [country?.level]);

  const MLETRInfo = () => (
    <Card elevation={3} sx={{ mt: 4, borderRadius: 2 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: "700",
            color: "#1e293b",
            fontSize: "1.5rem"
          }}
        >
          Understanding MLETR
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#475569",
            lineHeight: 1.8,
            fontSize: "1.1rem",
            mb: 2
          }}
        >
          The Model Law on Electronic Transferable Records (MLETR) is a landmark legal framework adopted by UNCITRAL in 2017. It enables the legal use of electronic transferable records both domestically and across borders.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: 4,
            mb: 2,
            fontWeight: "700",
            color: "#1e293b",
            fontSize: "1.3rem"
          }}
        >
          MLETR Implementation Levels
        </Typography>

        <div sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "600",
              color: "#1e293b",
              fontSize: "1.1rem",
              mb: 1
            }}
          >
            Level 0
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              lineHeight: 1.8,
              fontSize: "1.1rem",
              mb: 2
            }}
          >
            Initial stage where countries are exploring or considering MLETR adoption. No formal implementation steps have been taken yet.
          </Typography>
        </div>

        <div sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "600",
              color: "#1e293b",
              fontSize: "1.1rem",
              mb: 1
            }}
          >
            Level 1
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              lineHeight: 1.8,
              fontSize: "1.1rem",
              mb: 2
            }}
          >
            Countries have begun the formal process of MLETR adoption. This includes initial legal assessments and stakeholder consultations.
          </Typography>
        </div>

        <div sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "600",
              color: "#1e293b",
              fontSize: "1.1rem",
              mb: 1
            }}
          >
            Level 2
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              lineHeight: 1.8,
              fontSize: "1.1rem",
              mb: 2
            }}
          >
            Advanced implementation stage with draft legislation or regulations in place. Technical frameworks are being developed.
          </Typography>
        </div>

        <div sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "600",
              color: "#1e293b",
              fontSize: "1.1rem",
              mb: 1
            }}
          >
            Level 3
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              lineHeight: 1.8,
              fontSize: "1.1rem",
              mb: 2
            }}
          >
            Full MLETR implementation with enacted legislation and operational systems. The country actively uses electronic transferable records in trade.
          </Typography>
        </div>

        <Divider sx={{ my: 4 }} />

        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "700",
            color: "#1e293b",
            fontSize: "1.3rem"
          }}
        >
          Key Benefits
        </Typography>
        <List>
          <ListItem sx={{ display: 'list-item', py: 1 }}>
            <ListItemText
              primary="Establishes functional equivalence between electronic and paper-based transferable documents"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '1.1rem',
                  color: '#475569'
                }
              }}
            />
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 1 }}>
            <ListItemText
              primary="Supports cross-border trade and commerce through digital transformation"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '1.1rem',
                  color: '#475569'
                }
              }}
            />
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 1 }}>
            <ListItemText
              primary="Promotes paperless trade while maintaining legal certainty"
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '1.1rem',
                  color: '#475569'
                }
              }}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Paper 
        elevation={0}
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${country?.bgImage || 'https://via.placeholder.com/1920x400'})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "40px 20px",
          borderRadius: 0,
          position: "relative",
          height: "40vh",
          mb: 4
        }}
      >
        <Button
          onClick={handleBack}
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            backgroundColor: "#00663d",
            "&:hover": { backgroundColor: "#004d2e" },
            fontSize: "1rem",
            padding: "10px 20px"
          }}
        >
          Back
        </Button>
        <Typography
          variant="h2"
          sx={{
            color: "white",
            textAlign: "center",
            fontWeight: "800",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            mt: 15,
            fontSize: {
              xs: '2.5rem',
              md: '3.5rem'
            },
            letterSpacing: "0.02em"
          }}
        >
          {country.name ? `${country.name} - ETR Details` : "Country Details"}
        </Typography>
      </Paper>

      {hasData ? (
        <Grid container spacing={4} sx={{ px: { xs: 2, md: 4 }, mb: 4 }}>
          <Grid item xs={12} md={5}>
            <Card elevation={3} sx={{ height: 'auto', borderRadius: 2 }}>
              <CardContent sx={{ p: 4 }}>
                {country.image && (
                  <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <img
                      src={country.image}
                      alt={`${country.name} Flag`}
                      style={{
                        maxWidth: "200px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  </div>
                )}
                <MLETRInfo />
                <img
                  src="https://orbitshub.com/wp-content/uploads/2023/01/Top-10-Shipyards-in-India.png"
                  alt="Common pic"
                  style={{
                    marginTop: "50px",
                    width: "100%",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    mb: 3, 
                    fontWeight: "800",
                    color: "#1e293b",
                    fontSize: {
                      xs: '2rem',
                      md: '2.5rem'
                    }
                  }}
                >
                  {country.name}
                </Typography>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 2, 
                    color: "#475569",
                    fontSize: "1.5rem",
                    fontWeight: "600"
                  }}
                >
                  ISO Code: {country.iso_a3 || "N/A"}
                </Typography>

                <Divider sx={{ my: 4 }} />

                <div style={{ marginBottom: '3rem' }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 3, 
                      fontWeight: "700", 
                      color: "#1e293b",
                      fontSize: "1.8rem"
                    }}
                  >
                    MLETR Status
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      display: 'inline-block',
                      px: 4,
                      py: 2,
                      borderRadius: 3,
                      backgroundColor: country.level ? "rgba(56, 161, 255, 0.1)" : "rgba(169, 169, 169, 0.1)",
                      color: country.level ? "#2563eb" : "#64748b"
                    }}
                  >
                    <Typography variant="h6" sx={{ fontSize: "1.4rem", fontWeight: "600" }}>
                      {country.level !== undefined ? `Level ${country.level}` : "Not Available"}
                    </Typography>
                  </Paper>
                </div>

                {country.notes && (
                  <>
                    <Divider sx={{ my: 4 }} />
                    <div style={{ marginBottom: '3rem' }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 3, 
                          fontWeight: "700", 
                          color: "#1e293b",
                          fontSize: "1.8rem"
                        }}
                      >
                        Approach
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: "#475569", 
                          lineHeight: 2,
                          fontSize: "1.2rem",
                          letterSpacing: "0.015em"
                        }}
                      >
                        {country.notes}
                      </Typography>
                    </div>
                  </>
                )}

                {(country.point1 || country.point2 || country.point3) && (
                  <>
                    <Divider sx={{ my: 4 }} />
                    <div style={{ marginBottom: '3rem' }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 3, 
                          fontWeight: "700", 
                          color: "#1e293b",
                          fontSize: "1.8rem"
                        }}
                      >
                        Key Stages
                      </Typography>
                      <List sx={{ pl: 2 }}>
                        {country.point1 && (
                          <ListItem sx={{ display: 'list-item', py: 1.5 }}>
                            <ListItemText 
                              primary={country.point1}
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontSize: '1.2rem',
                                  lineHeight: 1.8,
                                  color: '#475569',
                                  fontWeight: 500
                                }
                              }}
                            />
                          </ListItem>
                        )}
                        {country.point2 && (
                          <ListItem sx={{ display: 'list-item', py: 1.5 }}>
                            <ListItemText 
                              primary={country.point2}
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontSize: '1.2rem',
                                  lineHeight: 1.8,
                                  color: '#475569',
                                  fontWeight: 500
                                }
                              }}
                            />
                          </ListItem>
                        )}
                        {country.point3 && (
                          <ListItem sx={{ display: 'list-item', py: 1.5 }}>
                            <ListItemText 
                              primary={country.point3}
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontSize: '1.2rem',
                                  lineHeight: 1.8,
                                  color: '#475569',
                                  fontWeight: 500
                                }
                              }}
                            />
                          </ListItem>
                        )}
                      </List>
                    </div>
                  </>
                )}

                {(country.journey1 || country.journey2 || country.journey3) && (
                  <>
                    <Divider sx={{ my: 4 }} />
                    <div>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 3, 
                          fontWeight: "700", 
                          color: "#1e293b",
                          fontSize: "1.8rem"
                        }}
                      >
                       {country.name}'s ETR Journey
                      </Typography>
                      <List sx={{ pl: 2 }}>
                        {country.journey1 && (
                          <ListItem sx={{ display: 'list-item', py: 1.5 }}>
                            <ListItemText 
                              primary={country.journey1}
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontSize: '1.2rem',
                                  lineHeight: 1.8,
                                  color: '#475569',
                                  fontWeight: 500
                                }
                              }}
                            />
                          </ListItem>
                        )}
                        {country.journey2 && (
                          <ListItem sx={{ display: 'list-item', py: 1.5 }}>
                            <ListItemText 
                              primary={country.journey2}
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontSize: '1.2rem',
                                  lineHeight: 1.8,
                                  color: '#475569',
                                  fontWeight: 500
                                }
                              }}
                            />
                          </ListItem>
                        )}
                        {country.journey3 && (
                          <ListItem sx={{ display: 'list-item', py: 1.5 }}>
                            <ListItemText 
                              primary={country.journey3}
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontSize: '1.2rem',
                                  lineHeight: 1.8,
                                  color: '#475569',
                                  fontWeight: 500
                                }
                              }}
                            />
                          </ListItem>
                        )}
                      </List>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h5" sx={{ textAlign: "center", mt: 4, color: "#64748b" }}>
          Data will be updated shortly.
        </Typography>
      )}
    </div>
  );
};

export default CountryDetails;