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
import VisitedCountries from "./VisitedCountries";

const geoUrl =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson";

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
  const visitedCountries = VisitedCountries();

  useEffect(() => {
    fetch(geoUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch GeoJSON");
        return response.json();
      })
      .then((data) => {
        const countryList = data.features.map((feature) => ({
          iso_a3: feature.properties.iso_a3,
          label: feature.properties.name_long,
          properties: feature.properties,
        }));
        setCountries(countryList);
        setMapData(data);
      })
      .catch((error) => console.error("Error fetching GeoJSON:", error));
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

  const getColorForCountry = (geo) => {
    if (selectedCountry && selectedCountry.iso_a3 === geo.properties.iso_a3) {
      return "#FDD835";
    }
    const country = visitedCountries.find(
      (c) => c.iso_a3 === geo.properties.iso_a3
    );
    return country ? colorGrades[country.level] : colorGrades[0];
  };

  const handleCountrySelect = (event, value) => {
    setSelectedCountry(value);
    if (value) {
      setHoveredCountry({
        name: value.label,
        ...visitedCountries.find((c) => c.iso_a3 === value.iso_a3),
      });
    } else {
      setHoveredCountry(null);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.5, 40));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.5, 0.2));
  };

  const handleViewMore = () => {
    if (hoveredCountry) {
      navigate(`/country/${hoveredCountry.iso_a3}`, { state: hoveredCountry });
    }
  };

  const handleMoveEnd = ({ coordinates, zoom: newZoom }) => {
    setZoom(newZoom);
    setCenter(coordinates);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e6ffff",
      }}
    >
      <AppBar
        position="sticky"
        elevation={4}
        sx={{ backgroundColor: "#008080" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "600",
              letterSpacing: "1px",
              color: "#fff",
              textAlign: "center",
            }}
          >
            ETR Tracking System
          </Typography>

          <Box sx={{ flexGrow: 1, mx: 2, maxWidth: 500 }}>
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
              scale: isMobile ? 100 : 220,
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup
              zoom={zoom}
              center={center}
              onMoveEnd={handleMoveEnd}
              maxZoom={40}
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
                            fill: theme.palette.warning.light,
                            outline: "none",
                            cursor: "pointer",
                          },
                          pressed: {
                            fill: theme.palette.warning.main,
                            outline: "none",
                          },
                        }}
                        onMouseEnter={() => {
                          if (!selectedCountry) {
                            const countryData = visitedCountries.find(
                              (c) => c.iso_a3 === geo.properties.iso_a3
                            );
                            setHoveredCountry({
                              name: geo.properties.name_long,
                              iso_a3: geo.properties.iso_a3,
                              ...countryData,
                            });
                          }
                        }}
                        onMouseLeave={() => {
                          if (!selectedCountry) {
                            setHoveredCountry(null);
                          }
                        }}
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
                sx={{ mt: 2,backgroundColor:"#006666" }}
                onClick={handleViewMore}
              >
                View Details
              </Button>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Map;