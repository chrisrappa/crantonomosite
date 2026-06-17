"use client";

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';

function AIChatCard() {
  const theme = useTheme();
  const [isChromium] = useState(() => {
    if (typeof window === "undefined") return true;
    
    const userAgent = navigator.userAgent;
    const isChrome = /Chrome|Chromium|Opera/.test(userAgent);
    const isEdge = /Edg/.test(userAgent);
    const isFirefox = /Firefox/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    
    return (isChrome || isEdge) && !isFirefox && !isSafari;
  });

  return (
    <>
      {/* SVG Filter for Glass Morphism Effect - Chromium only */}
      {isChromium && (
        <svg style={{ display: "none" }}>
          <filter id="aiChatDisplacementFilter">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="3"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
      )}
      <Card
        sx={{
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          overflow: 'visible',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.26s ease-out',
          willChange: 'backdrop-filter',
          WebkitWillChange: 'backdrop-filter',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          isolation: 'isolate',
          ...(isChromium
            ? {
                // Chromium (Chrome, Edge, Opera): Full glass morphism with SVG
                filter: 'drop-shadow(-8px -10px 20px rgba(0, 0, 0, 0.31))',
                WebkitFilter: 'drop-shadow(-8px -10px 20px rgba(0, 0, 0, 0.31))',
                backdropFilter: `brightness(1.05) blur(5px) url(#aiChatDisplacementFilter)`,
                WebkitBackdropFilter: `brightness(1.05) blur(5px) url(#aiChatDisplacementFilter)`,
              }
            : {
                // Firefox/Safari: Simpler styling without SVG
                backdropFilter: 'brightness(1) blur(6px)',
                WebkitBackdropFilter: 'brightness(1) blur(6px)',
                boxShadow: `
                  inset 0 1px 3px rgba(255, 255, 255, 0.1),
                  inset 6px 6px 12px rgba(255, 255, 255, 0.1),
                  -8px -10px 20px rgba(0, 0, 0, 0.06)
                `,
                WebkitBoxShadow: `
                  inset 0 1px 3px rgba(255, 255, 255, 0.1),
                  inset 6px 6px 12px rgba(255, 255, 255, 0.1),
                  -8px -10px 20px rgba(0, 0, 0, 0.06)
                `,
              }),
          '&::before': {
            content: "''",
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
            borderRadius: '12px',
            ...(isChromium
              ? {
                  boxShadow:
                    'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)',
                  WebkitBoxShadow:
                    'inset 6px 6px 0px -6px rgba(255, 255, 255, 0.4), inset 0 0 1px 1px rgba(255, 255, 255, 0.47)',
                }
              : {
                  boxShadow: 'none',
                  WebkitBoxShadow: 'none',
                }),
            pointerEvents: 'none',
          },
          '&:hover': {
            transform: 'translateY(-4px)',
          },
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
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Subtitle */}
        <Typography
          variant="subtitle1"
          sx={{
            color: theme.palette.text.secondary,
            ...theme.typography.secondaryFont,
            fontSize: '2rem',
          }}
        >
          AI Chat Agent
        </Typography>

        {/* Coming Soon Title */}
        <Typography
          variant="h5"
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
    </>
  );
}

export default AIChatCard;