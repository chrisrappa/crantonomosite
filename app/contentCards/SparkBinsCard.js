import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  useTheme,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import LaunchIcon from "@mui/icons-material/Launch";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";

// Sample carousel images
const carouselImages = [
  { src: "/sparkbins-dash-3.png", alt: "Spark Bins - Dashboard" },
  {
    src: "/sparkbins-new-1.png",
    alt: "Spark Bins - Idea Capture",
  },
  {
    src: "/sparkbins-edit-1.png",
    alt: "Spark Bins - Rich Text Editing",
  },
];

// Tech stack for SparkBins
const techStack = [
  { techName: "Next.js", techIcon: "/nextjs-icon.png" },
  { techName: "TypeScript", techIcon: "/typescript-icon.png" },
  { techName: "Redux Toolkit", techIcon: "/redux-icon.png" },
  { techName: "MongoDB", techIcon: "/mongodb-icon.png" },
  { techName: "OpenAI API", techIcon: "/openai-icon.png" },
  { techName: "Material UI", techIcon: "/material-ui-icon.png" },
  { techName: "Auth0", techIcon: "/auth0-icon.png" },
];

function SparkBinsCard() {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [isChromium] = useState(() => {
    if (typeof window === "undefined") return true;

    const userAgent = navigator.userAgent;
    const isChrome = /Chrome|Chromium|Opera/.test(userAgent);
    const isEdge = /Edg/.test(userAgent);
    const isFirefox = /Firefox/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

    return (isChrome || isEdge) && !isFirefox && !isSafari;
  });

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <>
      {/* SVG Filter for Glass Morphism Effect - Chromium only */}
      {isChromium && (
        <svg style={{ display: "none" }}>
          <filter id="sparkBinsDisplacementFilter">
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
          borderRadius: "28px",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          willChange: "backdrop-filter",
          WebkitWillChange: "backdrop-filter",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          isolation: "isolate",
          ...(isChromium
            ? {
                // Chromium (Chrome, Edge, Opera): Full glass morphism with SVG
                filter: "drop-shadow(-8px -10px 30px rgba(0, 0, 0, 0.5))",
                WebkitFilter: "drop-shadow(-8px -10px 30px rgba(0, 0, 0, 0.5))",
                backdropFilter: `brightness(1.05) blur(3px) url(#sparkBinsDisplacementFilter)`,
                WebkitBackdropFilter: `brightness(1.05) blur(3px) url(#sparkBinsDisplacementFilter)`,
              }
            : {
                // Firefox/Safari: Simpler styling without SVG
                backdropFilter: "brightness(1) blur(6px)",
                WebkitBackdropFilter: "brightness(1) blur(6px)",
                boxShadow: `
                  inset 0 1px 3px rgba(255, 255, 255, 0.1),
                  inset 6px 6px 12px rgba(255, 255, 255, 0.1),
                  -8px -10px 30px rgba(0, 0, 0, 0.06)
                `,
                WebkitBoxShadow: `
                  inset 0 1px 3px rgba(255, 255, 255, 0.1),
                  inset 6px 6px 12px rgba(255, 255, 255, 0.1),
                  -8px -10px 30px rgba(0, 0, 0, 0.06)
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
                    "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
                  WebkitBoxShadow:
                    "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
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
            height: "100%",
            padding: "32px",
            position: "relative",
            zIndex: 1,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "column",
                lg: "row",
              },
              overflow: "auto",
            }}
          >
            <Box
              sx={{
                flex: { xs: 1, md: 1.2 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "24px",
                minWidth: 0,
              }}
            >
              {/* Image Carousel */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  borderRadius: "8px",
                  overflow: "hidden",
                  mb: 2,
                  backgroundColor: "transparent",
                }}
              >
                <Image
                  src={carouselImages[currentImageIndex].src}
                  alt={carouselImages[currentImageIndex].alt}
                  fill
                  style={{ objectFit: "fill" }}
                />
                {/* Magnify Icon Button */}
                <IconButton
                  onClick={() => setOpenImageModal(true)}
                  sx={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    backgroundColor: theme.palette.primary.main + "dd",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <ZoomInIcon />
                </IconButton>
              </Box>

              {/* Carousel Controls */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: "2rem",
                }}
              >
                <IconButton
                  onClick={handlePrevImage}
                  size="medium"
                  sx={{
                    color: theme.palette.secondary.dark,
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.dark + "20",
                    },
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>

                <Box
                  sx={{
                    display: "flex",
                    gap: "8px",
                    flex: 1,
                    justifyContent: "center",
                    px: 2,
                  }}
                >
                  {carouselImages.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      sx={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor:
                          index === currentImageIndex
                            ? theme.palette.secondary.dark
                            : theme.palette.secondary.dark + "40",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.2)",
                        },
                      }}
                    />
                  ))}
                </Box>

                <IconButton
                  onClick={handleNextImage}
                  size="medium"
                  sx={{
                    color: theme.palette.secondary.dark,
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.dark + "20",
                    },
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Description and Links Section */}
            <Box
              sx={{
                flex: { xs: 1, sm: 1, md: 1, lg: 0.8 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                padding: "24px",
                borderLeft: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  lg: `1px solid ${theme.palette.divider}`,
                },
                borderTop: {
                  xs: `1px solid ${theme.palette.divider}`,
                  sm: `1px solid ${theme.palette.divider}`,
                  md: `1px solid ${theme.palette.divider}`,
                  lg: "none",
                },
              }}
            >
              {/* Tech Stack Chips */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {techStack.map((tech, index) => (
                  <Chip
                    key={index}
                    icon={
                      <Box
                        sx={{
                          position: "relative",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          src={tech.techIcon}
                          alt={tech.techName}
                          width={20}
                          height={20}
                          style={{ objectFit: "contain" }}
                        />
                      </Box>
                    }
                    label={tech.techName}
                    variant="outlined"
                    sx={{
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.text.primary,
                      backgroundColor: "#fffff020",
                      "& .MuiChip-icon": {
                        color: "inherit",
                        marginLeft: "8px",
                        marginRight: "-4px",
                      },
                    }}
                  />
                ))}
              </Box>

              {/* Description Text */}
              <Box sx={{ pb: 3, pt: 1 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Problem Statement
                </Typography>
                <Typography>
                  When I take down my ideas in my notes app, I never remember
                  where they are, have no way to easily revisit them, expand on
                  them, or an assistant to help me ask questions against them so
                  that they become highly useful at any time.
                </Typography>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  App Solution
                </Typography>
                <Typography>
                  SparkBins is an AI-powered idea management app built to ensure
                  users can quickly and easily capture ideas, seamlessly
                  organize them, and integrate AI assistance into them so that
                  they become a highly useful inspiration hub.
                </Typography>
                <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                  Features
                </Typography>
                <List sx={{ p: 0, m: 0 }}>
                  <ListItem sx={{ p: 0, mb: 1 }}>
                    <ListItemIcon
                      sx={{
                        minWidth: "24px",
                        color: theme.palette.text.primary,
                      }}
                    >
                      •
                    </ListItemIcon>
                    <ListItemText primary="Typing and voice capture with AI-assisted transcription" />
                  </ListItem>
                  <ListItem sx={{ p: 0, mb: 1 }}>
                    <ListItemIcon
                      sx={{
                        minWidth: "24px",
                        color: theme.palette.text.primary,
                      }}
                    >
                      •
                    </ListItemIcon>
                    <ListItemText primary="Customizable file or bin system with AI auto bin assignment" />
                  </ListItem>
                  <ListItem sx={{ p: 0, mb: 1 }}>
                    <ListItemIcon
                      sx={{
                        minWidth: "24px",
                        color: theme.palette.text.primary,
                      }}
                    >
                      •
                    </ListItemIcon>
                    <ListItemText primary="Automatic title generation, auto bin and spark titling, and automated idea expansion." />
                  </ListItem>
                  <ListItem sx={{ p: 0 }}>
                    <ListItemIcon
                      sx={{
                        minWidth: "24px",
                        color: theme.palette.text.primary,
                      }}
                    >
                      •
                    </ListItemIcon>
                    <ListItemText primary="Centralized AI assistant that uses all of your sparks as an inspiration knowledge base." />
                  </ListItem>
                </List>
              </Box>
              {/* <Box sx={{ mb: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    lineHeight: 1.6,
                    ...theme.typography.primaryFont,
                    fontSize: "1rem",
                    fontWeight: 400,
                  }}
                >
                  SparkBins is an AI-powered idea management app built to ensure
                  you never lose a spark of inspiration again, letting users
                  instantly capture thoughts the moment they appear through
                  quick typing, automatic voice capture with transcription into
                  editable text, or AI-assisted creation. Sparks can be rapidly
                  organized into customizable folders called “bins” (with manual
                  sorting, AI auto-assignment, or priority labeling), while a
                  clean dashboard highlights recent bins, highest-priority
                  items, and recent activity for at-a-glance visibility. A
                  built-in AI personal assistant goes further by letting you ask
                  natural-language questions about anything stored in your
                  sparks—pulling answers directly from your own data and linking
                  straight to the source spark for full context—supported by a
                  full file management system and rich text editing for polished
                  organization and retrieval.
                </Typography>
              </Box> */}

              {/* Action Links */}
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                <Button
                  component={Link}
                  href="#"
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                    textTransform: "none",
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Walkthrough Video
                  <LaunchIcon sx={{ fontSize: "1rem" }} />
                </Button>

                <Button
                  component={Link}
                  href="https://trello.com/invite/b/682bb76f68714cc465e00ae4/ATTI0ae0a12ed5155efe0dd72eb23384174819BF47F7/spark-bins"
                  target="_blank"
                  variant="outlined"
                  sx={{
                    color: theme.palette.secondary.main,
                    borderColor: theme.palette.secondary.main,
                    textTransform: "none",
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary.main + "10",
                      borderColor: theme.palette.secondary.main,
                    },
                  }}
                >
                  Development Map
                  <LaunchIcon sx={{ fontSize: "1rem" }} />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Image Modal */}
        <Dialog
          open={openImageModal}
          onClose={() => setOpenImageModal(false)}
          maxWidth="lg"
          fullWidth
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
            }}
          >
            <Image
              src={carouselImages[currentImageIndex].src}
              alt={carouselImages[currentImageIndex].alt}
              fill
              style={{
                objectFit: "cover",
                borderRadius: "1.5rem",
              }}
            />
          </Box>
          <Button
            onClick={() => setOpenImageModal(false)}
            sx={{
              color: "#ffffff",
              backgroundColor: theme.palette.primary.main,
              width: "10rem",
              height: "3rem",
              position: "absolute",
              right: 0,
              bottom: 0,
              borderRadius: "1.5rem 0 1.5rem 0",
              "&:hover": { backgroundColor: theme.palette.secondary.main },
            }}
          >
            <CloseIcon />
            <Typography variant="button" sx={{ ml: 1, fontSize: "1rem" }}>
              Close
            </Typography>
          </Button>
        </Dialog>
      </Box>
    </>
  );
}

export default SparkBinsCard;
