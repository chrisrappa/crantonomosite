"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

function SocialMediaLinksCard() {
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

  const socialLinks = [
    {
      handle: "@crantonomo",
      href: "https://youtube.com/@crantonomo",
      image: "/youtubeLogo.png",
    },
    {
      handle: "@crantonomo",
      href: "https://www.instagram.com/crantonomo/",
      image: "/instagramLogoCrop.png",
    },
    {
      handle: "@crantonomo",
      href: "https://www.linkedin.com/in/crantonomo-265b6939/",
      image: "/linkedInlogo.png",
    },
    {
      handle: "@crantonomo",
      href: "https://www.tiktok.com/@crantonomo",
      image: "/tiktoklogo.png",
    },
  ];

  return (
    <>
      {/* SVG Filter for Glass Morphism Effect - Chromium only */}
      {isChromium && (
        <svg style={{ display: "none" }}>
          <filter id="socialMediaDisplacementFilter">
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
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          overflow: "visible",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          willChange: "backdrop-filter",
          WebkitWillChange: "backdrop-filter",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          isolation: "isolate",
          ...(isChromium
            ? {
                // Chromium (Chrome, Edge, Opera): Full glass morphism with SVG
                filter: "drop-shadow(-8px -10px 20px rgba(0, 0, 0, 0.31))",
                WebkitFilter:
                  "drop-shadow(-8px -10px 20px rgba(0, 0, 0, 0.31))",
                backdropFilter:
                  "brightness(1.05) blur(5px) url(#socialMediaDisplacementFilter)",
                WebkitBackdropFilter:
                  "brightness(1.05) blur(5px) url(#socialMediaDisplacementFilter)",
                boxShadow:
                  "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
                WebkitBoxShadow:
                  "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
              }
            : {
                // Firefox/Safari: Simpler styling without SVG
                backdropFilter: "brightness(1.1) blur(8px)",
                WebkitBackdropFilter: "brightness(1.1) blur(8px)",
                boxShadow: `
                  inset 0 1px 3px rgba(255, 255, 255, 0.3),
                  inset 6px 6px 12px rgba(255, 255, 255, 0.2),
                  -8px -10px 20px rgba(0, 0, 0, 0.06)
                `,
                WebkitBoxShadow: `
                  inset 0 1px 3px rgba(255, 255, 255, 0.3),
                  inset 6px 6px 12px rgba(255, 255, 255, 0.2),
                  -8px -10px 20px rgba(0, 0, 0, 0.06)
                `,
              }),
          "&::before": {
            content: "''",
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
            borderRadius: "12px",
            pointerEvents: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            height: "100%",
            padding: "32px",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Avatar */}
          <Avatar
            alt="Christian Rappa"
            src="/primaryHeadshot.png"
            sx={{
              width: 120,
              height: 120,
              border: `3px solid ${theme.palette.primary.main}`,
            }}
          />

          {/* Social Media Links */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: "12px",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                component={Link}
                href={link.href}
                target="_blank"
                variant="outlined"
                sx={{
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.primary.light,
                  backgroundColor: theme.palette.primary.light + "20",
                  textTransform: "none",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 12px",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary.main + "10",
                    borderColor: theme.palette.secondary.main,
                  },
                }}
              >
                <Image
                  src={link.image}
                  alt={link.handle}
                  width={30}
                  height={30}
                />
                {link.handle}
              </Button>
            ))}
          </Box>

          {/* Full Width External Link Buttons (Commented Out for Later) */}
          {/* 
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px", mt: 2 }}>
              <Button
                component={Link}
                href="#"
                target="_blank"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                External Link 1
              </Button>

              <Button
                component={Link}
                href="#"
                target="_blank"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                External Link 2
              </Button>
            </Box>
            */}
        </Box>
      </Box>
    </>
  );
}

export default SocialMediaLinksCard;
