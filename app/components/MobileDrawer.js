'use client';

import { useState } from 'react';
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  useTheme,
  Divider,
} from '@mui/material';
import { Close, ExpandMore, ExpandLess } from '@mui/icons-material';
import { topMenuItems, bottomMenuItems, subMenuItems } from '../consts/MenuItems';

export default function MobileDrawer({
  open,
  onClose,
  selectedNav,
  onSelectNav,
  selectedSubMenu,
  onSelectSubMenu,
}) {
  const theme = useTheme();
  const [expandedMenu, setExpandedMenu] = useState(null);

  const handleMenuClick = (menuId) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId);
  };

  const handleSubMenuClick = (menuId, subMenuId) => {
    onSelectNav({ id: menuId, label: topMenuItems.find(m => m.id === menuId)?.label || bottomMenuItems.find(m => m.id === menuId)?.label });
    onSelectSubMenu(subMenuId);
  };

  const renderMenuSection = (items, isBottom = false) => (
    <Box key={isBottom ? 'bottom' : 'top'}>
      {isBottom && <Divider sx={{ my: 2 }} />}
      <List sx={{ width: '100%' }}>
        {items.map((item) => (
          <Box key={item.id}>
            {/* Main Menu Item */}
            <ListItemButton
              onClick={() => handleMenuClick(item.id)}
              sx={{
                backgroundColor:
                  selectedNav === item.id
                    ? theme.palette.primary.main + '20'
                    : 'transparent',
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '10',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.95rem',
                    fontWeight: 500,
                  },
                }}
              />
              {expandedMenu === item.id ? (
                <ExpandLess sx={{ color: theme.palette.primary.main }} />
              ) : (
                <ExpandMore sx={{ color: theme.palette.text.secondary }} />
              )}
            </ListItemButton>

            {/* Submenu Items */}
            <Collapse in={expandedMenu === item.id} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subMenuItems[item.id]?.map((subItem) => (
                  <ListItemButton
                    key={subItem.id}
                    onClick={() => handleSubMenuClick(item.id, subItem.id)}
                    sx={{
                      pl: 6,
                      backgroundColor:
                        selectedSubMenu === subItem.id
                          ? theme.palette.primary.main + '30'
                          : 'transparent',
                      color: theme.palette.text.primary,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main + '15',
                      },
                      borderLeft: `3px solid ${
                        selectedSubMenu === subItem.id
                          ? theme.palette.primary.main
                          : 'transparent'
                      }`,
                    }}
                  >
                    <ListItemText
                      primary={subItem.label}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '0.85rem',
                          fontWeight:
                            selectedSubMenu === subItem.id ? 600 : 400,
                        },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          maxWidth: '280px',
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      {/* Drawer Header with Close Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            ...theme.typography.primaryFont,
          }}
        >
          Menu
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          <Close />
        </IconButton>
      </Box>

      {/* Menu Content */}
      <Box sx={{ overflow: 'auto' }}>
        {renderMenuSection(topMenuItems)}
        {renderMenuSection(bottomMenuItems, true)}
      </Box>
    </Drawer>
  );
}
