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

function FullLengthVideo() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("vidoes", videos);

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

  const showSkeletons = loading || (!error && videos.length === 0);

  if (showSkeletons) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 2,
          width: "100%",
        }}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{
              width: "100%",
              height: 220,
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
        display: "flex",
        gap: 2,
        width: "100%",
        flexWrap: "wrap",
        justifyContent: { xs: "center", md: "center", lg: "flex-start" },
      }}
    >
      {videos?.map((video) => (
        <Card
          key={video.id}
          sx={{
            borderRadius: "12px",
            minHeight: 200,
            display: "flex",
            flexDirection: "column",
            maxWidth: 400
          }}
        >
          <CardMedia
            component="img"
            image={video.thumbnail}
            alt={video.title}
            sx={{ minHeight: 150, maxHeight: 200, objectFit: "cover" }}
          />
          <CardContent
            sx={{
              py: 1,
              px: 1.5,
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              "&:last-child": { pb: 1.5 },
            }}
          >
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
              sx={{ mt: "auto", display: "flex", justifyContent: "flex-end", marginTop: 1 }}
            >
              <Link href={video.url} passHref>
                <Button variant="outlined" color="secondary">Watch Video</Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default FullLengthVideo;
