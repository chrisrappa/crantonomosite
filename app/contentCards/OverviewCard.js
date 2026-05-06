import {
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

import React from "react";

export default function OverviewCard({ data }) {
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
        <Grid
          container
          columns={2}
          sx={{ alignItems: "flex-start" }}
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
          <Grid>
            <List sx={{ flex: 1, padding: "8px 0", overflow: "hidden" }}>
              {data.stats.map((item) => (
                <ListItem
                  key={item.label}
                  button
                  sx={{
                    backgroundColor: "transparent",
                    color: theme.palette.text.primary,
                    margin: "4px 8px",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
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
                    secondaryTypographyProps={{
                      sx: {
                        color: theme.palette.text.secondary,
                      },
                    }}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight: 500,
                        ...theme.typography.primaryFont,
                      },
                      "& .MuiListItemText-secondary": {
                        ...theme.typography.secondaryFont,
                        fontSize: "0.75rem",
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>

        {/* Sample Content Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
