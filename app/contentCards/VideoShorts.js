"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import Link from "next/link";

function VideoShorts() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getShortVideos = async () => {
      try {
        const res = await fetch("/api/youtube/shorts", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch shorts: ${res.status}`);
        }

        const data = await res.json();
        setVideos(data.videos || []);
      } catch (fetchError) {
        setError(fetchError.message || "Error fetching shorts");
      } finally {
        setLoading(false);
      }
    };

    getShortVideos();
  }, []);

  const showSkeletons = loading || (!error && videos.length === 0);

  if (showSkeletons) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, minmax(0, 1fr))",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
            xl: "repeat(4, minmax(0, 1fr))",
          },
          gap: 2,
          width: "100%",
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{
              width: "100%",
              height: 440,
              borderRadius: "12px",
            }}
          />
        ))}
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
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, minmax(0, 1fr))",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(3, minmax(0, 1fr))",
          xl: "repeat(4, minmax(0, 1fr))",
        },
        gap: 2,
        width: "100%",
      }}
    >
      {videos.map((video) => (
        <Card
          key={video.id}
          sx={{
            borderRadius: "12px",
            height: 475,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            image={video.thumbnail}
            alt={video.title}
            sx={{
              height: 320,
              width: "100%",
              objectFit: "cover",
            }}
          />
          <CardContent sx={{ py: 1, px: 1.5, flex: 1, minHeight: 0 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                mb: 0.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {video.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {video.description}
            </Typography>
            <Box
              sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <Link href={video.url} target="_blank" passHref>
                <Button variant="outlined" color="secondary">Watch</Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default VideoShorts;
