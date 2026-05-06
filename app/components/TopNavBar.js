'use client';

import { Box, AppBar, Toolbar, Typography, IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme as useAppTheme } from '../MUIThemeProvider';

export default function TopNavBar() {
  const muiTheme = useTheme();
  const { isDark, toggleTheme } = useAppTheme();

  return (
    <AppBar
      position="static"
      sx={{
        height: '64px',
        backgroundColor: muiTheme.palette.background.paper,
        color: muiTheme.palette.text.primary,
        boxShadow: `0 2px 4px ${muiTheme.palette.divider || 'rgba(0,0,0,0.1)'}`,
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
