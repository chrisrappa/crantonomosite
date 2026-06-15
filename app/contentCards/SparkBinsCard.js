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
  { src: "/sparkBinsPrimaryApp.png", alt: "Spark Bins - Dashboard" },
  {
    src: "/sparkbinsIdeaCaptureVoicerecord.png",
    alt: "Spark Bins - Idea Capture",
  },
  {
    src: "/sparkbinsRichTextEditing.png",
    alt: "Spark Bins - Rich Text Editing",
  },
];

// Tech stack for SparkBins
const techStack = [
  { techName: "React", techIcon: "⚛️" },
  { techName: "Next.js", techIcon: "▲" },
  { techName: "TypeScript", techIcon: "📘" },
  { techName: "Supabase", techIcon: "🟢" },
  { techName: "OpenAI API", techIcon: "🤖" },
  { techName: "Tailwind CSS", techIcon: "🎨" },
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
          overflow: "visible",
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
                backdropFilter: "brightness(1.1) blur(8px)",
                WebkitBackdropFilter: "brightness(1.1) blur(8px)",
                boxShadow: `
                  inset 0 1px 3px rgba(255, 255, 255, 0.3),
                  inset 6px 6px 12px rgba(255, 255, 255, 0.2),
                  -8px -10px 30px rgba(0, 0, 0, 0.06)
                `,
                WebkitBoxShadow: `
                  inset 0 1px 3px rgba(255, 255, 255, 0.3),
                  inset 6px 6px 12px rgba(255, 255, 255, 0.2),
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
              overflow: { xs: "auto", md: "auto", lg: "hidden" },
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
                    icon={<Box sx={{ fontSize: "1.2rem" }}>{tech.techIcon}</Box>}
                    label={tech.techName}
                    variant="outlined"
                    sx={{
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.primary.main + "10",
                      "& .MuiChip-icon": {
                        color: "inherit",
                        marginLeft: "8px",
                        marginRight: "-4px",
                      },
                      "&:hover": {
                        backgroundColor: theme.palette.primary.main + "20",
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                  />
                ))}
              </Box>

              {/* Description Text */}
              <Box sx={{ mb: 3 }}>
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
              </Box>

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
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "16px 24px",
            }}
          >
            <IconButton
              onClick={() => setOpenImageModal(false)}
              sx={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.paper,
                "&:hover": { backgroundColor: theme.palette.secondary.main },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: "3rem",
            }}
          >
            <Image
              src={carouselImages[currentImageIndex].src}
              alt={carouselImages[currentImageIndex].alt}
              fill
              style={{
                objectFit: "contain",
                borderRadius: "3rem",
              }}
            />
          </Box>
        </Dialog>
      </Box>
    </>
  );
}

export default SparkBinsCard;
