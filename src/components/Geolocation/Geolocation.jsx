import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import {
  Box,
  Button,
  Typography,
  Card,
  Stack,
  Avatar,
  CircularProgress,
} from "@mui/material";

const defaultLocation = { lat: -25.7566, lng: 28.1914 };

export default function GeoNearbyUsers() {
  const [location, setLocation] = useState(defaultLocation);
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCOCu38e9cnVI6yjtBUTuwBVtyOBuvlMIg",
  });

  const fetchNearbyUsers = async (lat, lng) => {
    setLoadingUsers(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/nearby?latitude=${lat}&longitude=${lng}&radiusInKm=5`
      );
      const data = await response.json();
      setNearbyUsers(data.users || []);
    } catch (err) {
      console.error("Failed to fetch nearby users:", err);
      setError("Could not load nearby users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLocation(coords);
        setError("");
        fetchNearbyUsers(coords.lat, coords.lng);
      },
      () => {
        setError("Failed to get location. Using default.");
        setLocation(defaultLocation);
        fetchNearbyUsers(defaultLocation.lat, defaultLocation.lng);
      }
    );
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  if (!isLoaded) return <CircularProgress />;

  return (
    <Box className="max-w-4xl mx-auto p-4">
      <Typography variant="h5" mb={2} fontWeight="bold">
        Nearby Users
      </Typography>

      <GoogleMap
        zoom={13}
        center={location}
        mapContainerStyle={{ width: "100%", height: "400px" }}
      >
        <Marker position={location} title="Your Location" />
      </GoogleMap>

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      <Button
        onClick={fetchLocation}
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Refresh Location & Nearby Users
      </Button>

      <Box mt={4}>
        {loadingUsers ? (
          <CircularProgress />
        ) : nearbyUsers.length === 0 ? (
          <Typography>No nearby users found.</Typography>
        ) : (
          <Stack spacing={2}>
            {nearbyUsers.map((user) => (
              <Card key={user.id} sx={{ p: 2, display: "flex", alignItems: "center" }}>
                <Avatar src={`https://i.pravatar.cc/150?u=${user.id}`} sx={{ mr: 2 }} />
                <Box>
                  <Typography fontWeight="bold">{user.full_name}</Typography>
                  <Typography variant="body2">{user.email}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Points: {user.points} | Rating: {user.average_rating}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
