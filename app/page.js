"use client";

import { useState, useEffect, useMemo } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import TopNavBar from "./components/TopNavBar";
import LeftNavBar from "./components/LeftNavBar";
import RightSidebar from "./components/RightSidebar";
import ContentArea from "./components/ContentArea";
import MobileDrawer from "./components/MobileDrawer";
import { subMenuItems } from "./consts/MenuItems";

export default function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedNav, setSelectedNav] = useState("overview");
  const [selectedNavLabel, setSelectedNavLabel] = useState("Overview");
  const [hoveredNav, setHoveredNav] = useState(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  console.log("selected sub menu", selectedSubMenu);

  // Determine if sidebar should be auto-collapsed based on screen size changes
  const shouldAutoCollapse = useMemo(() => {
    return isSmallScreen;
  }, [isSmallScreen]);

  // Auto-collapse sidebar when transitioning to small screens
  useEffect(() => {
    if (shouldAutoCollapse) {
      setSidebarCollapsed(true);
    }
  }, [shouldAutoCollapse]);

  // Use hovered nav if available, otherwise use selected nav
  const activeNav = hoveredNav || selectedNav;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        // backgroundColor: theme.palette.background.default,
      }}
    >
      <video
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          // opacity: 0.06,
          opacity: 0.2,
          zIndex: -1,
        }}
      >
        <source src="/darkDotsWave.mp4" type="video/mp4" />
      </video>
      {/* Top Navigation Bar */}
      <TopNavBar
        onMobileMenuToggle={() => setMobileDrawerOpen(!mobileDrawerOpen)}
        isMobileDrawerOpen={mobileDrawerOpen}
        isSmallScreen={isSmallScreen}
      />

      {/* Main Content Container */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* Mobile Drawer (xs only) */}
        {isSmallScreen && (
          <MobileDrawer
            open={mobileDrawerOpen}
            onClose={() => setMobileDrawerOpen(false)}
            selectedNav={selectedNav}
            onSelectNav={({ id, label }) => {
              setSelectedNav(id);
              setSelectedNavLabel(label);
              setHoveredNav(null);
              setSelectedSubMenu(subMenuItems[id]?.[0]?.id || null);
            }}
            selectedSubMenu={selectedSubMenu}
            onSelectSubMenu={(subMenuId) => {
              setSelectedSubMenu(subMenuId);
              setMobileDrawerOpen(false);
            }}
          />
        )}

        {/* Left Navigation Bar (hidden on xs) */}
        {!isSmallScreen && (
          <LeftNavBar
            selectedNav={selectedNav}
            onSelectNav={({ id, label, Icon }) => {
              console.log("id, label", id, label);
              setSelectedNav(id);
              setSelectedNavLabel(label);
              setHoveredNav(null);
              setSelectedSubMenu(subMenuItems[id]?.[0]?.id || null);
            }}
            onHoverNav={setHoveredNav}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )}

        {/* Right Sidebar (hidden on xs) */}
        {!isSmallScreen && (
          <RightSidebar
            selectedNav={activeNav}
            selectedNavLabel={selectedNavLabel}
            selectedSubMenu={selectedSubMenu}
            onSelectSubMenu={setSelectedSubMenu}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            isSmallScreen={isSmallScreen}
          />
        )}

        {/* Content Area */}
        <ContentArea
          selectedNav={selectedNav}
          selectedNavLabel={selectedNavLabel}
          selectedSubMenu={selectedSubMenu}
        />
      </Box>
    </Box>
  );
}
