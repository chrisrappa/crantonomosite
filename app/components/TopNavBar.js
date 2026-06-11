'use client';

import { Box, AppBar, Toolbar, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Brightness4, Brightness7, Menu } from '@mui/icons-material';
import { useTheme as useAppTheme } from '../MUIThemeProvider';

export default function TopNavBar({ onMobileMenuToggle, isMobileDrawerOpen, isSmallScreen }) {
  const muiTheme = useTheme();
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <AppBar
      position="static"
      sx={{
        height: '64px',
        backgroundColor: muiTheme.palette.background.paper,
        color: muiTheme.palette.text.primary,
        boxShadow: 'none',
        borderBottom: `1px solid ${muiTheme.palette.divider || 'rgba(0,0,0,0.12)'}`,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '64px',
          padding: '0 20px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isSmallScreen && (
            <IconButton
              onClick={onMobileMenuToggle}
              sx={{
                color: muiTheme.palette.text.primary,
                '&:hover': {
                  backgroundColor: muiTheme.palette.action.hover,
                },
              }}
            >
              <Menu />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: '0.5px',
              ...muiTheme.typography.primaryFont,
            }}
          >
            Crantonomo
          </Typography>
        </Box>

        <IconButton
          onClick={toggleTheme}
          sx={{
            color: muiTheme.palette.text.primary,
            '&:hover': {
              backgroundColor: muiTheme.palette.action.hover,
            },
          }}
        >
          {isDark ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
