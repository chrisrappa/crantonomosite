import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';

function AIChatCard() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 2px 8px ${theme.palette.divider || 'rgba(0,0,0,0.1)'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          height: '100%',
        }}
      >
        {/* Subtitle */}
        <Typography
          variant="subtitle1"
          sx={{
            color: theme.palette.text.secondary,
            ...theme.typography.secondaryFont,
            fontSize: '3rem',
          }}
        >
          AI Chat Agent
        </Typography>

        {/* Coming Soon Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            color: theme.palette.primary.main,
            border: `2px solid ${theme.palette.text.primary}`,
            padding: '16px 32px',
            borderRadius: '8px',
            ...theme.typography.primaryFont,
          }}
        >
          Coming Soon
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AIChatCard;