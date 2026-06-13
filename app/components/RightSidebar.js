"use client";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Popover,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ChevronLeft } from "@mui/icons-material";
import { subMenuItems } from "../consts/MenuItems";

export default function RightSidebar({
  selectedNav,
  selectedNavLabel,
  selectedSubMenu,
  onSelectSubMenu,
  isCollapsed,
  onToggleCollapse,
}) {
  console.log("selected nav label in sidebar", selectedNavLabel);
  const theme = useTheme();
  const items = subMenuItems[selectedNav] || [];

  return (
    <>
      {/* SVG Filter for Glass Morphism Effect */}
      <svg style={{ display: "none" }}>
        <filter id="rightSidebarDisplacementFilter">
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
          width: isCollapsed ? "0px" : "250px",
          height: "98%",
          margin: "0.5rem",
          marginLeft: "0",
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRight: `1px solid ${theme.palette.divider || "rgba(0,0,0,0.12)"}`,
          display: "flex",
          flexDirection: "column",
          overflow: "visible",
          borderRadius: "1rem",
          transition: "all 0.3s ease",
          filter: "drop-shadow(-8px -10px 20px rgba(0, 0, 0, 0.31))",
          WebkitFilter: "drop-shadow(-8px -10px 20px rgba(0, 0, 0, 0.31))",
          backdropFilter: `brightness(1.05) blur(3px) url(#rightSidebarDisplacementFilter)`,
          WebkitBackdropFilter: `brightness(1.05) blur(3px) url(#rightSidebarDisplacementFilter)`,
          willChange: "backdrop-filter",
          WebkitWillChange: "backdrop-filter",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          isolation: "isolate",
          "&::before": {
            content: "''",
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
            borderRadius: "1rem",
            boxShadow:
              "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
            WebkitBoxShadow:
              "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)",
            pointerEvents: "none",
          },
        }}
      >
        {/* Header with Collapse Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px 5px 0px 20px",
            borderBottom: `1px solid ${theme.palette.divider}`,
            flexShrink: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              ...theme.typography.primaryFont,
            }}
          >
            {selectedNavLabel}
          </Typography>

          {/* Collapse Button - Show on all screens when not collapsed */}
          {!isCollapsed && (
            <IconButton
              onClick={onToggleCollapse}
              sx={{
                color: theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ChevronLeft sx={{ fontSize: "20px" }} />
            </IconButton>
          )}
        </Box>

        {/* Menu Items */}
        <List
          sx={{
            flex: 1,
            padding: "8px 0",
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
          }}
        >
          {items.map((item) => (
            <ListItem
              key={item.id}
              component="button"
              onClick={() => onSelectSubMenu(item.id)}
              sx={{
                backgroundColor:
                  selectedSubMenu === item.id
                    ? theme.palette.primary.main
                    : "transparent",
                color:
                  selectedSubMenu === item.id
                    ? "#ffffff"
                    : theme.palette.text.primary,
                margin: "4px 8px",
                border: "none",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor:
                    selectedSubMenu === item.id
                      ? theme.palette.primary.light
                      : theme.palette.action.hover,
                },
                transition: "all 0.2s ease",
                cursor: "pointer",
                height: "40px",
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
                sx={{
                  "& .MuiListItemText-primary": {
                    fontWeight: 500,
                    ...theme.typography.primaryFont,
                    color:
                      selectedSubMenu === item.id
                        ? theme.palette.text.light
                        : theme.palette.text.primary,
                  },
                  "& .MuiListItemText-secondary": {
                    ...theme.typography.secondaryFont,
                    fontSize: "0.75rem",
                    color:
                      selectedSubMenu === item.id
                        ? theme.palette.text.tertiary
                        : theme.palette.text.secondary,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
