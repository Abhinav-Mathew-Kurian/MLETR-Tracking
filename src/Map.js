import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import {
  AppBar,
  Toolbar,
  Typography,
  Autocomplete,
  TextField,
  Box,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton,
  Divider,
} from "@mui/material";
import {
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Backdrop, Skeleton, Stack } from "@mui/material";
import Swal from "sweetalert2";
const Map = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);
  const [mapData, setMapData] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([0, 20]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTooltipLocked, setIsTooltipLocked] = useState(false);
  const [selectedGeo, setSelectedGeo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // const response = await fetch("https://mletr-tracking-backend.onrender.com/geojson");
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5001/geojson", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const geoData = await response.json();
        const geoJsonData = geoData[0];

        const countryList = geoJsonData.features.map((feature) => ({
          iso_a3: feature.properties.iso_a3,
          label: feature.properties.name_long,
          properties: feature.properties,
          level: feature.properties.mletr_level || 0,
          notes: feature.properties.notes,
        }));

        setCountries(countryList);
        setMapData(geoJsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const colorGrades = {
    0: "#E0F2F1",
    1: "#A5D6A7",
    2: "#66BB6A",
    3: "#2E7D32",
  };

  const legendItems = [
    { label: "ETR-SOCIALISATION", level: 0 },
    { label: "ETR-UNDER CONSIDERATION", level: 1 },
    { label: "ETR-DISCUSSION BETWEEN STAKEHOLDERS", level: 2 },
    { label: "ETR-COMPLIANT", level: 3 },
  ];
  useEffect(() => {
    if (!isLoggedIn) {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        navigate("/login");
      }
    }
  }, [isLoggedIn, navigate]);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("signature")
      setIsLoggedIn(false);
    } else {
      navigate("/login");
    }
  };

  const getColorForCountry = (geo) => {
    const isSelected =
      (selectedGeo &&
        selectedGeo.properties.iso_a3 === geo.properties.iso_a3) ||
      (selectedCountry && selectedCountry.iso_a3 === geo.properties.iso_a3);

    if (isSelected) {
      return "#FDD835";
    }

    const level = geo.properties.mletr_level || 0;
    return colorGrades[level];
  };

  const handleCountrySelect = (event, value) => {
    setSelectedCountry(value);
    setIsTooltipLocked(!!value);
    setSelectedGeo(null);

    if (value) {
      setHoveredCountry({
        name: value.label,
        level: value.level,
        notes: value.notes,
        iso_a3: value.iso_a3,
      });
    } else {
      setHoveredCountry(null);
    }
  };

  const handleGeographyClick = (geo) => {
    if (!isTooltipLocked) {
      setIsTooltipLocked(true);
      setSelectedGeo(geo);
      setHoveredCountry({
        name: geo.properties.name_long,
        iso_a3: geo.properties.iso_a3,
        level: geo.properties.mletr_level || 0,
        notes: geo.properties.notes,
      });
    } else {
      setIsTooltipLocked(false);
      setSelectedGeo(null);
      setHoveredCountry(null);
    }
  };

  const handleMouseEnter = (geo) => {
    if (!isTooltipLocked && !selectedCountry) {
      setHoveredCountry({
        name: geo.properties.name_long,
        iso_a3: geo.properties.iso_a3,
        level: geo.properties.mletr_level || 0,
        notes: geo.properties.notes,
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isTooltipLocked && !selectedCountry) {
      setHoveredCountry(null);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.5, 250));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.5, 0.2));
  };

  const handleViewMore = () => {
    if (selectedGeo || selectedCountry) {
      const countryData = selectedGeo
        ? {
            ...hoveredCountry,
            properties: selectedGeo.properties,
          }
        : {
            ...hoveredCountry,
            properties: selectedCountry.properties,
          };

      navigate(`/country/${hoveredCountry.iso_a3}`, { state: countryData });
    }
  };

  const handleMoveEnd = ({ coordinates, zoom: newZoom }) => {
    setZoom(newZoom);
    setCenter(coordinates);
  };
const handleUpload=()=>{
  navigate('/file-upload')
}
const handleView=()=>{
  navigate('/view-file')
}
if (error) {
  Swal.fire({
    title: 'Unable to process map',
    text: 'Please try login again!',
    icon: 'error',
    confirmButtonText: 'Go to Login',
    confirmButtonColor: '#3085d6',
    allowOutsideClick: false,
    backdrop: true
  }).then((result) => {
    if (result.isConfirmed) {
      
      navigate('/login');
      
    }
  });
  return null; 
}

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          backgroundColor: "#e6ffff",
        }}
      >
        {/* Header Skeleton */}
        <Box sx={{ backgroundColor: "#008080", pb: 2 }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Skeleton
              variant="rectangular"
              width={200}
              height={32}
              sx={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            />
            <Skeleton
              variant="rectangular"
              width={300}
              height={40}
              sx={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            />
          </Toolbar>
          <Stack
            direction="row"
            spacing={2}
            sx={{ px: 2, mt: 2 }}
            justifyContent="center"
          >
            {[1, 2, 3, 4].map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                width={150}
                height={24}
                sx={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              />
            ))}
          </Stack>
        </Box>

        {/* Map Loading Animation */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 144px)",
            position: "relative",
          }}
        >
          <Backdrop
            open={true}
            sx={{
              position: "absolute",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 1,
            }}
          >
            <Stack spacing={3} alignItems="center">
              <CircularProgress
                size={60}
                thickness={4}
                sx={{
                  color: "#008080",
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "round",
                  },
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "#006666",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                Loading Map Data...
              </Typography>
            </Stack>
          </Backdrop>
          <Box
            sx={{
              width: "95%",
              height: "100%",
              border: "2px solid black",
              borderRadius: 2,
              backgroundColor: "white",
              overflow: "hidden",
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
              sx={{ backgroundColor: "rgba(0,0,0,0.04)" }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  return (<>
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e6ffff",
      }}
    >
    <AppBar position="sticky" elevation={4} sx={{ backgroundColor: "#008080" }}>
  <Toolbar
    sx={{
      justifyContent: "space-between",
      flexWrap: { xs: "wrap", sm: "nowrap" },
      gap: 2,
    }}
  >
    <Typography
      variant="h5"
      component="div"
      sx={{
        fontWeight: "600",
        letterSpacing: "1px",
        color: "#fff",
        textAlign: { xs: "center", sm: "left" },
        flex: { xs: "1 1 100%", sm: "unset" }, // Ensures title stays on one line on bigger screens
        whiteSpace: "nowrap", // Prevents wrapping
      }}
    >
      ETR Tracking System
    </Typography>

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexGrow: 1,
        width: "100%",
        justifyContent: { xs: "center", sm: "flex-end" },
      }}
    >
      <Autocomplete
        options={countries}
        value={selectedCountry}
        onChange={handleCountrySelect}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search Countries"
            variant="outlined"
            size="small"
            sx={{
              width: { xs: "100%", sm: "300px" }, // Makes the search field take more width on larger screens
              bgcolor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.7)",
              },
            }}
          />
        )}
      />

      <Button
        variant="contained"
        color="secondary"
        onClick={handleLoginLogout}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.15)",
          color: "#fff",
          whiteSpace: "nowrap",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.3)",
          },
        }}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </Button>
    </Box>
  </Toolbar>

  <Paper
    elevation={0}
    sx={{
      bgcolor: "#006666",
      color: "white",
      px: 2,
      py: 1,
      display: "flex",
      gap: 2,
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    {legendItems.map((item, index) => (
      <Box
        key={index}
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: 1,
            bgcolor: colorGrades[item.level],
            border: 1,
            borderColor: "grey.300",
          }}
        />
        <Typography variant="body2">{item.label}</Typography>
      </Box>
    ))}
  </Paper>
</AppBar>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          p: 2,
        }}
      >
        <Box
          sx={{
            width: "95%",
            position: "relative",
            height: "calc(100vh - 144px)",
            border: "2px solid black",
            borderRadius: 2,
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: isMobile ? 300 : 220,
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup
              zoom={zoom}
              center={center}
              onMoveEnd={handleMoveEnd}
              maxZoom={250}
              minZoom={0.2}
            >
              {mapData && (
                <Geographies geography={mapData}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={getColorForCountry(geo)}
                        stroke={theme.palette.grey[700]}
                        strokeWidth={0.2}
                        style={{
                          default: { outline: "none" },
                          hover: {
                            fill: !isTooltipLocked
                              ? theme.palette.warning.light
                              : getColorForCountry(geo),
                            outline: "none",
                            cursor: isTooltipLocked ? "default" : "pointer",
                          },
                          pressed: {
                            fill: theme.palette.warning.main,
                            outline: "none",
                          },
                        }}
                        onClick={() => handleGeographyClick(geo)}
                        onMouseEnter={() => handleMouseEnter(geo)}
                        onMouseLeave={handleMouseLeave}
                      />
                    ))
                  }
                </Geographies>
              )}
            </ZoomableGroup>
          </ComposableMap>

          <Paper
            elevation={4}
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <IconButton onClick={handleZoomIn} color="primary">
                <ZoomInIcon />
              </IconButton>
              <Divider />
              <IconButton onClick={handleZoomOut} color="primary">
                <ZoomOutIcon />
              </IconButton>
            </Box>
          </Paper>

          {hoveredCountry && (
            <Paper
              elevation={4}
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                bottom: 16,
                minWidth: 300,
                maxWidth: "90%",
                p: 2,
                bgcolor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(8px)",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#006666", textAlign: "center" }}
              >
                {hoveredCountry.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", textAlign: "center", mt: 1 }}
              >
                {hoveredCountry.level
                  ? legendItems[hoveredCountry.level].label
                  : "No MLETR Status"}
              </Typography>
              {hoveredCountry.notes && (
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", textAlign: "center", mt: 1 }}
                >
                  {hoveredCountry.notes}
                </Typography>
              )}
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, backgroundColor: "#006666" }}
                onClick={handleViewMore}
              >
                View Details
              </Button>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
    <Button onClick={handleUpload}>Upload Files</Button><Button onClick={handleView}>View Files</Button>
    </>
  );
};

export default Map;
