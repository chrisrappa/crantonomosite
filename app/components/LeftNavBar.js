"use client";

import { Box, IconButton, Tooltip, Divider, useTheme } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { bottomMenuItems, topMenuItems } from "../consts/MenuItems";

export default function LeftNavBar({
  selectedNav,
  onSelectNav,
  onHoverNav,
  sidebarCollapsed,
  onToggleSidebar,
}) {
  const theme = useTheme();

  const handleNavClick = ({ id, label, Icon }) => {
    onSelectNav({ id, label, Icon });
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
        onClick={() => handleNavClick({ id, label, Icon })}
        onMouseEnter={() => handleNavHover(id)}
        onMouseLeave={handleNavLeave}
        sx={{
          width: "100%",
          height: "50px",
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
        width: "70px",
        margin: "0.5rem",
        height: "98%",
        border: `2px solid transparent`,
        background: `linear-gradient(${theme.palette.background.paper}, ${theme.palette.background.paper}) padding-box, linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.light}) border-box`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 8px",
        overflow: "hidden",
        borderRadius: "1rem",
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
                  height: "50px",
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
