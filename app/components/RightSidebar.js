'use client';

import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, useTheme, Popover, IconButton, useMediaQuery } from '@mui/material';
import {
  Home,
  BarChart,
  Settings as SettingsIcon,
  Lock,
  Help,
  Logout as LogoutIcon,
  ChevronLeft,
} from '@mui/icons-material';
import { useState } from 'react';

const subMenuItems = {
  overview: [
    { id: 'overview', label: 'Basic Info', icon: Home, description: 'Primary Stats' },
    { id: 'analytics', label: 'Analytics', icon: BarChart, description: 'View Analytics' },
  ],
  settings: [
    { id: 'account', label: 'Account', icon: SettingsIcon, description: 'Account Settings' },
    { id: 'security', label: 'Security', icon: Lock, description: 'Security Settings' },
  ],
  help: [
    { id: 'faq', label: 'FAQ', icon: Help, description: 'Frequently Asked Questions' },
  ],
  logout: [
    { id: 'logout', label: 'Logout', icon: LogoutIcon, description: 'Sign Out' },
  ],
};

export default function RightSidebar({
  selectedNav,
  selectedSubMenu,
  onSelectSubMenu,
  isCollapsed,
  onToggleCollapse,
  isSmallScreen,
}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const items = subMenuItems[selectedNav] || [];
  console.log('selected sub menu', selectedSubMenu);

  // Handle popover open/close for small screens
  const handleMouseEnter = (event) => {
    if (isSmallScreen && isCollapsed) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMouseLeave = () => {
    if (isSmallScreen && isCollapsed) {
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);

  // Don't render sidebar if collapsed and on small screens
  const shouldShowAsPopover = isSmallScreen && isCollapsed;

  if (shouldShowAsPopover) {
    return (
      <>
        {/* Invisible hover target for small screens */}
        <Box
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            position: 'absolute',
            left: '80px',
            top: '64px',
            width: '0',
            height: 'calc(100vh - 64px)',
            zIndex: 1000,
          }}
        />

        {/* Popover for small screens */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleMouseLeave}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            pointerEvents: 'auto',
          }}
        >
          <Box
            sx={{
              width: '320px',
              maxHeight: 'calc(100vh - 64px)',
              backgroundColor: theme.palette.background.paper,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: `2px 0 4px ${theme.palette.divider || 'rgba(0,0,0,0.1)'}`,
            }}
          >
            {/* Header */}
            <Box sx={{ padding: '16px', borderBottom: `1px solid ${theme.palette.divider}`, flexShrink: 0 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  ...theme.typography.primaryFont,
                }}
              >
                {selectedNav.charAt(0).toUpperCase() + selectedNav.slice(1)}
              </Typography>
            </Box>

            {/* Menu Items */}
            <List sx={{ flex: 1, padding: '8px 0', overflow: 'hidden' }}>
              {items.map((item) => (
                <ListItem
                  key={item.id}
                  button
                  onClick={() => {
                    onSelectSubMenu(item.id);
                    handleMouseLeave();
                  }}
                  sx={{
                    backgroundColor:
                      selectedSubMenu === item.id
                        ? theme.palette.primary.main
                        : 'transparent',
                    color:
                      selectedSubMenu === item.id
                        ? '#ffffff'
                        : theme.palette.text.primary,
                    margin: '4px 8px',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor:
                        selectedSubMenu === item.id
                          ? theme.palette.primary.dark
                          : theme.palette.action.hover,
                    },
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: 'inherit',
                      minWidth: '40px',
                    }}
                  >
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    secondary={item.description}
                    secondaryTypographyProps={{
                      sx: {
                        color: selectedSubMenu === item.id
                          ? '#ffffff'
                          : theme.palette.text.secondary,
                      },
                    }}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontWeight: 500,
                        ...theme.typography.primaryFont,
                      },
                      '& .MuiListItemText-secondary': {
                        ...theme.typography.secondaryFont,
                        fontSize: '0.75rem',
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Popover>
      </>
    );
  }

  // Desktop view or expanded state
  return (
    <Box
      sx={{
        width: isCollapsed ? '0px' : '320px',
        minWidth: isCollapsed ? '0px' : '320px',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider || 'rgba(0,0,0,0.12)'}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: `2px 0 4px ${theme.palette.divider || 'rgba(0,0,0,0.1)'}`,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Header with Collapse Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          borderBottom: `1px solid ${theme.palette.divider}`,
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            ...theme.typography.primaryFont,
          }}
        >
          {selectedNav.charAt(0).toUpperCase() + selectedNav.slice(1)}
        </Typography>

        {/* Collapse Button - Show on all screens when not collapsed */}
        {!isCollapsed && (
          <IconButton
            onClick={onToggleCollapse}
            sx={{
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ChevronLeft sx={{ fontSize: '20px' }} />
          </IconButton>
        )}
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, padding: '8px 0', overflow: 'hidden' }}>
        {items.map((item) => (
          <ListItem
            key={item.id}
            button
            onClick={() => onSelectSubMenu(item.id)}
            sx={{
              backgroundColor:
                selectedSubMenu === item.id
                  ? theme.palette.primary.main
                  : 'transparent',
              color:
                selectedSubMenu === item.id
                  ? '#ffffff'
                  : theme.palette.text.primary,
              margin: '4px 8px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor:
                  selectedSubMenu === item.id
                    ? theme.palette.primary.dark
                    : theme.palette.action.hover,
              },
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
          >
            <ListItemIcon
              sx={{
                color: 'inherit',
                minWidth: '40px',
              }}
            >
              <item.icon />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              secondary={item.description}
              secondaryTypographyProps={{
                sx: {
                  color: selectedSubMenu === item.id
                    ? '#ffffff'
                    : theme.palette.text.secondary,
                },
              }}
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: 500,
                  ...theme.typography.primaryFont,
                },
                '& .MuiListItemText-secondary': {
                  ...theme.typography.secondaryFont,
                  fontSize: '0.75rem',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
