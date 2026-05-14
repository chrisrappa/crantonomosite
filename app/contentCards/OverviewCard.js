import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
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
import LaunchIcon from '@mui/icons-material/Launch';

const logos = [
  { src: "/bluecrossshieldblackwhite.png", alt: "BlueCrossBlueShield" },
  { src: "/carelonbw.png", alt: "CarelonRx" },
  { src: "/launchdarklygray.png", alt: "LaunchDarkly" },
  { src: "/vmwaregray.png", alt: "VMware" },
  { src: "/futuresgrayevensmaller.png", alt: "US Army Software Factory" },
  { src: "/wellsfargogray.png", alt: "Wells Fargo" },
  { src: "/applelogogray.png", alt: "Apple" },
];

export default function OverviewCard({ data }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 2px 8px ${theme.palette.divider || "rgba(0,0,0,0.1)"}`,
        borderRadius: "12px",
        overflow: "auto",
        width: "100%",
      }}
    >
      <CardContent
        width={"100%"}
        sx={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        <Grid
          container
          columns={3}
          sx={{ alignItems: "flex-start", width: "100%" }}
          spacing={4}
        >
          <Box
            component="img"
            src={data.img}
            alt={data.title}
            sx={{
              width: "265px",
              height: "300px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
          <Grid sx={{ minWidth: "220px" }}>
            <List sx={{ flex: 1, padding: "1px 0", overflow: "hidden" }}>
              {data.stats.map((item) => (
                <ListItem
                  key={item.label}
                  component="button"
                  sx={{
                    backgroundColor: "transparent",
                    color: theme.palette.text.primary,
                    margin: "0px 8px",
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
                        fontSize: "0.75rem",

                        ...theme.typography.secondaryFont,
                      },
                      "& .MuiListItemText-secondary": {
                        ...theme.typography.primaryFont,
                        fontWeight: 500,
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
              marginLeft: "auto",
              flex: 1,
              minWidth: "320px",
              maxWidth: "520px",
            }}
          >
            <List sx={{ flex: 1, width: "100%", padding: "1px 0" }}>
              {data.techs.map((item) => (
                <ListItem
                  key={item.name}
                  component="button"
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
                    boxShadow: `0 1px 3px ${theme.palette.primary.main}40`,
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
        <Typography variant="h5">Trusted By...</Typography>
        <Grid
          container
          columns={7}
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          {logos.map((i) => (
            <Image
              width={125}
              height={125}
              src={i.src}
              alt={i.alt}
              key={i.alt}
            />
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
            sx={{ flex: 1, gap: "25px", alignItems: "flex-start" }}
          >
            <Avatar
              alt="Ashlee Barsky"
              src="/ashleebarsky.png"
              sx={{ width: 100, height: 100, marginRight: '1rem'}}
            />
          </Grid>
          <Grid sx={{ flex: 11, minWidth: "220px" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600 }}
            >
              Ashlee Barsky - UI Design Engineer, Elevate Health
            </Typography>
            <Link
              href="https://www.linkedin.com/in/ashlee-barsky-91202a91/"
              target="_blank"
            >
              View LinkedIn Profile
              <LaunchIcon sx={{ fontSize: '1rem', marginLeft: '4px' }} />
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
      </CardContent>
    </Card>
  );
}
