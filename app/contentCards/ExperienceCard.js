import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import React from "react";

function ExperienceCard({ data }) {

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
        <Typography
          variant="body1"
          sx={{
            ...theme.typography.secondaryFont,
            lineHeight: "1.6",
          }}
        >
          {data?.content}
        </Typography>

        {/* Sample Content Grid */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "24px",
          }}
        >
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
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
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, marginBottom: "8px" }}
              >
                Item {i}
              </Typography>
              <Typography variant="body2">
                Sample content for item {i}
              </Typography>
            </Card>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ExperienceCard;
