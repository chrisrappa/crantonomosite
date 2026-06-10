'use client';

import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, useTheme, Popover, IconButton, useMediaQuery } from '@mui/material';
import {
  ChevronLeft,
} from '@mui/icons-material';
import { useState } from 'react';
import { subMenuItems } from '../consts/MenuItems';

export default function RightSidebar({
  selectedNav,
  selectedNavLabel,
  selectedSubMenu,
  onSelectSubMenu,
  isCollapsed,
  onToggleCollapse,
  isSmallScreen,
}) {
  console.log('selected nav label in sidebar', selectedNavLabel);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const items = subMenuItems[selectedNav] || [];

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
                {selectedNavLabel}
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
                        : theme.palette.text.light,
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
                    sx={{
                      '& .MuiListItemText-primary': {
                        ...theme.typography.primaryFont,
                        fontWeight: 500,
                        color:
                          selectedSubMenu === item.id
                            ? theme.palette.text.light
                            : theme.palette.text.primary,
                      },
                      '& .MuiListItemText-secondary': {
                        ...theme.typography.secondaryFont,
                        fontSize: '0.75rem',
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
          {selectedNavLabel}
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
            component="button"
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
                    ? theme.palette.primary.light
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
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: 500,
                  ...theme.typography.primaryFont,
                  color:
                    selectedSubMenu === item.id
                      ? theme.palette.text.light
                      : theme.palette.text.primary,
                },
                '& .MuiListItemText-secondary': {
                  ...theme.typography.secondaryFont,
                  fontSize: '0.75rem',
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
  );
}
