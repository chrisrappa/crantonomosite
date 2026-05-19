import { Box, Button, Card, CardContent, Typography, useTheme } from "@mui/material";
import React from "react";
import experienceEntries from "../consts/experienceEntries";

function ExperienceCard() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 2px 8px ${theme.palette.divider || "rgba(0,0,0,0.1)"}`,
        borderRadius: "12px",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {experienceEntries.map((i) => (
            <Card
              key={i.id}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
                padding: "16px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                },
              }}
            >
              {/* Title - Role and Company */}
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, marginBottom: "4px" }}
              >
                {i.title} - {i.company}
              </Typography>

              {/* Year Range */}
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: "12px",
                  display: "block",
                }}
              >
                {i.duration}
              </Typography>

              {/* Tech Stack Icons */}
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "12px",
                  flexWrap: "wrap",
                }}
              >
                {i.techStack.map((tech, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "28px",
                      height: "28px",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      borderRadius: "4px",
                    }}
                  />
                ))}
              </Box>

              {/* Description */}
              <Typography variant="body2" sx={{ lineHeight: "1.6" }}>
                {i.description}
              </Typography>
            </Card>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ExperienceCard;
