import React from "react";
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
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            flex: 1,
            backgroundColor:
              theme.palette.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            overflow: { xs: "auto", md: "hidden" },
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 24px",
              gap: "24px",
              minWidth: 0,
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
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                    textTransform: "none",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 12px",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main + "10",
                      borderColor: theme.palette.primary.main,
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
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}

export default SocialMediaLinksCard;