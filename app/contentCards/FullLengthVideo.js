"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";

function FullLengthVideo() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getFullLengthVideos = async () => {
      try {
        const res = await fetch("/api/youtube/full-length?limit=24", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch videos: ${res.status}`);
        }

        const data = await res.json();
        setVideos(data.videos || []);
      } catch (fetchError) {
        setError(fetchError.message || "Error fetching full-length videos");
      } finally {
        setLoading(false);
      }
    };

    getFullLengthVideos();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ py: 2 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, width: "100%" }}>
      {videos.map((video) => (
        <Card
          key={video.id}
          sx={{
            flex: "1 1 240px",
            maxWidth: {
              xs: "100%",
              sm: "calc(50% - 8px)",
              md: "calc(33.333% - 11px)",
              lg: "calc(25% - 12px)",
            },
            minWidth: 0,
            borderRadius: "12px",
          }}
        >
          <CardMedia
            component="img"
            image={video.thumbnail}
            alt={video.title}
            sx={{ aspectRatio: "16/9", objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
              {video.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {video.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default FullLengthVideo;
