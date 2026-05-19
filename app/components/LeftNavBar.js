"use client";

import { Box, IconButton, Tooltip, Divider, useTheme } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { bottomMenuItems, topMenuItems } from "../contentCards/MenuItems";

export default function LeftNavBar({
  selectedNav,
  onSelectNav,
  onHoverNav,
  sidebarCollapsed,
  onToggleSidebar,
}) {
  const theme = useTheme();

  const handleNavClick = (navId) => {
    onSelectNav(navId);
  };

  const handleNavHover = (navId) => {
    onHoverNav(navId);
  };

  const handleNavLeave = () => {
    onHoverNav(null);
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <Tooltip title={label} placement="right">
      <IconButton
        onClick={() => handleNavClick(id)}
        onMouseEnter={() => handleNavHover(id)}
        onMouseLeave={handleNavLeave}
        sx={{
          width: "100%",
          height: "60px",
          borderRadius: "12px",
          margin: "8px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:
            selectedNav === id ? theme.palette.primary.main : "transparent",
          color: selectedNav === id ? "#ffffff" : theme.palette.text.primary,
          "&:hover": {
            backgroundColor:
              selectedNav === id
                ? theme.palette.primary.dark
                : theme.palette.action.hover,
          },
          transition: "all 0.3s ease",
        }}
      >
        <Icon sx={{ fontSize: "24px" }} />
      </IconButton>
    </Tooltip>
  );

  return (
    <Box
      sx={{
        width: "80px",
        maxWidth: "80px",
        height: "100%",
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider || "rgba(0,0,0,0.12)"}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 8px",
        overflow: "hidden",
        boxShadow: `2px 0 4px ${theme.palette.divider || "rgba(0,0,0,0.1)"}`,
      }}
    >
      {/* Top Section with Expand Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* Expand Button - Only show when sidebar is collapsed */}
        {sidebarCollapsed && (
          <>
            <Tooltip title="Expand Sidebar" placement="right">
              <IconButton
                onClick={onToggleSidebar}
                sx={{
                  width: "100%",
                  height: "60px",
                  borderRadius: "12px",
                  margin: "8px 0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.palette.primary.main,
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <ChevronRight sx={{ fontSize: "24px" }} />
              </IconButton>
            </Tooltip>
            <Divider
              sx={{
                width: "80%",
                margin: "8px 0",
                backgroundColor: theme.palette.divider,
              }}
            />
          </>
        )}

        {/* Top Menu Group */}
        {topMenuItems.map((item) => (
          <NavItem
            key={item.id}
            id={item.id}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </Box>

      {/* Bottom Menu Group */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          width: "100%",
          alignItems: "center",
        }}
      >
        {bottomMenuItems.map((item) => (
          <NavItem
            key={item.id}
            id={item.id}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </Box>
    </Box>
  );
}
