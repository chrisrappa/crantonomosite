import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  useTheme,
  Button,
  Divider,
  Dialog,
  DialogTitle,
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

function SparkBinsCard() {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openImageModal, setOpenImageModal] = useState(false);

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
    <Card
      sx={{
        backgroundColor: "transparent",
        boxShadow: `0 2px 8px ${theme.palette.divider || "rgba(0,0,0,0.1)"}`,
        borderRadius: "12px",
        overflow: "auto",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          height: "100%",
          padding: "32px",
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
          <CardContent
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
          </CardContent>

          {/* Description and Links Section */}
          <CardContent
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
                instantly capture thoughts the moment they appear through quick
                typing, automatic voice capture with transcription into editable
                text, or AI-assisted creation. Sparks can be rapidly organized
                into customizable folders called “bins” (with manual sorting, AI
                auto-assignment, or priority labeling), while a clean dashboard
                highlights recent bins, highest-priority items, and recent
                activity for at-a-glance visibility. A built-in AI personal
                assistant goes further by letting you ask natural-language
                questions about anything stored in your sparks—pulling answers
                directly from your own data and linking straight to the source
                spark for full context—supported by a full file management
                system and rich text editing for polished organization and
                retrieval.
              </Typography>
            </Box>

            {/* Action Links */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
          </CardContent>
        </Box>
      </CardContent>

      {/* Image Modal */}
      <Dialog
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {carouselImages[currentImageIndex].alt}
          </Typography>
          <IconButton
            onClick={() => setOpenImageModal(false)}
            sx={{
              color: theme.palette.text.primary,
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
            padding: "24px",
          }}
        >
          <Image
            src={carouselImages[currentImageIndex].src}
            alt={carouselImages[currentImageIndex].alt}
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </Box>
      </Dialog>
    </Card>
  );
}

export default SparkBinsCard;
