import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useTheme,
  Tooltip,
} from "@mui/material"; // Card, CardContent used for outer container
import React from "react";
import { alpha } from "@mui/material/styles";

import experienceEntries from "../consts/experienceEntries";
import Image from "next/image";

function ExperienceCard() {
  const theme = useTheme();

  return (
    <>
      {/* SVG Filter for Glass Morphism Effect */}
      <svg style={{ display: "none" }}>
        <filter id="displacementFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.02"
            numOctaves="3"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {experienceEntries.map((i) => (
          <Box
            key={i.id}
            sx={{
              position: "relative",
              color: theme.palette.text.primary,
              padding: "16px",
              borderRadius: "28px",
              cursor: "pointer",
              transition:
                "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.26s ease-out",
              filter: "drop-shadow(-8px -10px 46px rgba(0, 0, 0, 0.5))",
              WebkitFilter: "drop-shadow(-8px -10px 46px rgba(0, 0, 0, 0.5))",
              backdropFilter:
                `brightness(1.05) blur(3px) url(#displacementFilter)`,
              WebkitBackdropFilter:
                `brightness(1.05) blur(3px) url(#displacementFilter)`,
              willChange: "backdrop-filter",
              WebkitWillChange: "backdrop-filter",
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)",
              isolation: "isolate",
              overflow: "visible",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              "&::before": {
                content: "''",
                position: "absolute",
                inset: 0,
                zIndex: 0,
                overflow: "hidden",
                borderRadius: "28px",
                boxShadow:
                  "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
                WebkitBoxShadow:
                  "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
                pointerEvents: "none",
              },
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 4px 12px ${theme.palette.primary.main}0`,
              },
            }}
          >
            {/* Title - Role and Company */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                marginBottom: "4px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {i.title} - {i.company}
            </Typography>

            {/* Year Range */}
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                marginBottom: "12px",
                display: "block",
                position: "relative",
                zIndex: 1,
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
                position: "relative",
                zIndex: 1,
              }}
            >
              {i.techStack.map((tech, index) => (
                <Tooltip key={index} title={tech.name}>
                  <Box
                    sx={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0.05rem",
                      backgroundColor: "rgb(255, 255, 255)",
                    }}
                  >
                    <Image
                      src={tech.src}
                      alt={tech.name}
                      width={28}
                      height={28}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Tooltip>
              ))}
            </Box>

            {/* Description */}
            <Typography
              variant="body2"
              sx={{ lineHeight: "1.6", position: "relative", zIndex: 1 }}
            >
              {i.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default ExperienceCard;
