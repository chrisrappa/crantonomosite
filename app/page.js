'use client';

import { useState, useEffect, useMemo } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import TopNavBar from './components/TopNavBar';
import LeftNavBar from './components/LeftNavBar';
import RightSidebar from './components/RightSidebar';
import ContentArea from './components/ContentArea';
import { subMenuItems } from './consts/MenuItems';

export default function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedNav, setSelectedNav] = useState('overview');
  const [hoveredNav, setHoveredNav] = useState(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  console.log('selected sub menu', selectedSubMenu);

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
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Top Navigation Bar */}
      <TopNavBar />

      {/* Main Content Container */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {/* Left Navigation Bar */}
        <LeftNavBar
          selectedNav={selectedNav}
          onSelectNav={(nav) => {
            setSelectedNav(nav);
            setHoveredNav(null);
            setSelectedSubMenu(subMenuItems[nav]?.[0]?.id || null);
          }}
          onHoverNav={setHoveredNav}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Right Sidebar */}
        <RightSidebar
          selectedNav={activeNav}
          selectedSubMenu={selectedSubMenu}
          onSelectSubMenu={setSelectedSubMenu}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          isSmallScreen={isSmallScreen}
        />

        {/* Content Area */}
        <ContentArea
          selectedNav={selectedNav}
          selectedSubMenu={selectedSubMenu}
        />
      </Box>
    </Box>
  );
}
