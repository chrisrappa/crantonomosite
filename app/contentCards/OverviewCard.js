import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import LaunchIcon from "@mui/icons-material/Launch";

const logos = [
  { src: "/bluecrossshieldblackwhite.png", alt: "BlueCrossBlueShield" },
  { src: "/carelonbw.png", alt: "CarelonRx" },
  { src: "/launchdarklygray.png", alt: "LaunchDarkly" },
  { src: "/vmwaregray.png", alt: "VMware" },
  { src: "/futuresgrayevensmaller.png", alt: "US Army Software Factory" },
  { src: "/wellsfargogray.png", alt: "Wells Fargo" },
];

export default function OverviewCard({ data }) {
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
          <filter id="overviewDisplacementFilter">
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
          borderRadius: "1rem",
          overflow: "auto",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "1rem",
          flexDirection: "column",
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
                  "brightness(1.05) blur(5px) url(#overviewDisplacementFilter)",
                WebkitBackdropFilter:
                  "brightness(1.05) blur(5px) url(#overviewDisplacementFilter)",
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
            ...(isChromium
              ? {
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
                }
              : {
                  boxShadow: "none",
                  WebkitBoxShadow: "none",
                }),
            pointerEvents: "none",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Grid
            container
            columns={3}
            sx={{
              alignItems: "flex-start",
              justifyContent: "center",
              width: "100%",
            }}
            spacing={4}
          >
            <Box
              component="img"
              src={data.img}
              alt={data.title}
              sx={{
                width: "265px",
                height: "300px",
                borderRadius: "1rem",
                marginBottom: "8px",
                marginTop: "8px",
                marginLeft: "8px",
              }}
            />
            <Grid sx={{ minWidth: "200px", flex: 1 }}>
              <List sx={{ flex: 1, padding: "0" }}>
                {data.stats.map((item) => (
                  <ListItem
                    key={item.label}
                    sx={{
                      backgroundColor: "transparent",
                      color: theme.palette.text.primary,
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "transparent",
                        cursor: "default",
                      },
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "inherit",
                        minWidth: "40px",
                      }}
                    >
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      secondary={item.value}
                      sx={{
                        "& .MuiListItemText-primary": {
                          ...theme.typography.secondaryFont,
                          fontSize: "0.75rem",
                        },
                        "& .MuiListItemText-secondary": {
                          ...theme.typography.primaryFont,
                          fontWeight: 600,
                          fontSize: "1rem",
                          fontFamily: "'Kode Mono', monospace",
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid
              container
              sx={{
                flex: 1,
                minWidth: "320px",
                maxWidth: { md: "none", lg: "600px" },
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <List sx={{ flex: 1, width: "100%", pt: 0 }}>
                {data.techs.map((item) => (
                  <ListItem
                    key={item.name}
                    sx={{
                      backgroundColor: "transparent",
                      color: theme.palette.text.primary,
                      margin: "10px 0px",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "transparent",
                        cursor: "default",
                      },
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      width: "100%",
                      border: `1px solid ${theme.palette.primary.main}20`,
                      boxShadow: `0 1px 10px ${theme.palette.primary.main}10`,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "inherit",
                        minWidth: "40px",
                      }}
                    ></ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontSize: "1rem",
                          ...theme.typography.secondaryFont,
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "3px",
                        minWidth: "42px",
                        height: "16px",
                      }}
                    >
                      {Array.from({ length: 5 }).map((_, barIndex) => {
                        const statLevel = Math.min(
                          5,
                          Math.max(0, Number(item.statLevel) || 0),
                        );

                        return (
                          <Box
                            key={`${item.name}-${barIndex}`}
                            sx={{
                              width: "5px",
                              height: `${6 + barIndex * 2}px`,
                              borderRadius: "2px",
                              backgroundColor:
                                barIndex < statLevel
                                  ? theme.palette.primary.main
                                  : "#d3d3d3",
                            }}
                          />
                        );
                      })}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
          {/* Sample Content Grid */}
          <Divider sx={{ my: 2, mx: 5 }} />
          <Typography
            variant="h2"
            sx={{ fontWeight: 900, opacity: 0.2, mx: 5 }}
          >
            Trusted By...
          </Typography>
          <Grid
            container
            sx={{
              alignItems: "center",
              // mx: 5,
              flexWrap: "wrap",
              gap: 2,
              display: "flex",
              width: "100%",
            }}
          >
            {logos.map((i) => (
              <Box
                key={i.alt}
                sx={{
                  width: {
                    xs: "calc(50% - 8px)",
                    md: "calc(33% - 8px)",
                    lg: "calc(15% - 6px)",
                  },
                  height: 100,
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  fill
                  src={i.src}
                  alt={i.alt}
                  style={{ objectFit: "contain" }}
                />
              </Box>
            ))}
          </Grid>
          <Card
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
              },
            }}
          >
            <Grid
              container
              sx={{
                flex: 1,
                gap: "25px",
                alignItems: "flex-start",
                minWidth: "125px",
              }}
            >
              <Avatar
                alt="Ashlee Barsky"
                src="/ashleebarsky.png"
                sx={{ width: 100, height: 100, marginRight: "1rem" }}
              />
            </Grid>
            <Grid sx={{ flex: 11, minWidth: "220px" }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Ashlee Barsky - UI Design Engineer, Elevate Health
              </Typography>
              <Link
                href="https://www.linkedin.com/in/ashlee-barsky-91202a91/"
                target="_blank"
              >
                View LinkedIn Profile
                <LaunchIcon sx={{ fontSize: "1rem", marginLeft: "4px" }} />
              </Link>
              <Typography variant="body2" sx={{ marginTop: "8px" }}>
                {`"I've had the pleasure of working closely with Christian
              across multiple projects. He leads with clarity, collaborates
              seamlessly across teams, and creates a strong sense of alignment.
              As a designer, I truly appreciate his ability to elevate ideas
              while balancing technical excellence with strong collaboration."`}
              </Typography>
            </Grid>
          </Card>
        </Box>
      </Box>
    </>
  );
}
