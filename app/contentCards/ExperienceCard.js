import {
  Box,
  Typography,
  useTheme,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";

import experienceEntries from "../consts/experienceEntries";
import Image from "next/image";

function ExperienceCard() {
  const theme = useTheme();
  const [isChromium] = useState(() => {
    if (typeof window === "undefined") return true;

    const userAgent = navigator.userAgent;
    const isChrome = /Chrome|Chromium|Opera/.test(userAgent);
    const isEdge = /Edg/.test(userAgent);
    const isFirefox = /Firefox/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

    return (isChrome || isEdge) && !isFirefox && !isSafari;
  });

  return (
    <>
      {/* SVG Filter for Glass Morphism Effect - Chromium only */}
      {isChromium && (
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
      )}

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
              cursor: "default",
              transition:
                "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.26s ease-out",
              willChange: "backdrop-filter",
              WebkitWillChange: "backdrop-filter",
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)",
              isolation: "isolate",
              overflow: "visible",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              ...(isChromium
                ? {
                    // Chromium (Chrome, Edge, Opera): Full glass morphism with SVG
                    filter: "drop-shadow(-8px -10px 46px rgba(0, 0, 0, 0.31))",
                    WebkitFilter:
                      "drop-shadow(-8px -10px 46px rgba(0, 0, 0, 0.31))",
                    backdropFilter: `brightness(1.05) blur(5px) url(#displacementFilter)`,
                    WebkitBackdropFilter: `brightness(1.05) blur(5px) url(#displacementFilter)`,
                    boxShadow:
                      "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
                    WebkitBoxShadow:
                      "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
                  }
                : {
                    // Firefox/Safari: Simpler styling without SVG
                    backdropFilter: "brightness(1) blur(6px)",
                    WebkitBackdropFilter: "brightness(1) blur(6px)",
                    boxShadow: `
                      inset 0 1px 3px rgba(255, 255, 255, 0.1),
                      inset 6px 6px 12px rgba(255, 255, 255, 0.1),
                      -8px -10px 46px rgba(0, 0, 0, 0.06)
                    `,
                    WebkitBoxShadow: `
                      inset 0 1px 3px rgba(255, 255, 255, 0.1),
                      inset 6px 6px 12px rgba(255, 255, 255, 0.1),
                      -8px -10px 46px rgba(0, 0, 0, 0.06)
                    `,
                  }),
              "&::before": {
                content: "''",
                position: "absolute",
                inset: 0,
                zIndex: 0,
                overflow: "hidden",
                borderRadius: "28px",
                ...(isChromium
                  ? {
                      boxShadow:
                        "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.3), inset 0 0 1px 1px rgba(255, 255, 255, 0.2), -8px -10px 20px rgba(0, 0, 0, 0.06)",
                      WebkitBoxShadow:
                        "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.3), inset 0 0 1px 1px rgba(255, 255, 255, 0.2), -8px -10px 20px rgba(0, 0, 0, 0.06)",
                    }
                  : {
                      boxShadow: "none",
                      WebkitBoxShadow: "none",
                    }),
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
                fontFamily: "'Kode Mono', monospace",
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
                fontWeight: 700,
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
              sx={{
                lineHeight: "1.6",
                position: "relative",
                zIndex: 1,
                fontWeight: 500,
                fontSize: "0.95rem",
              }}
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
