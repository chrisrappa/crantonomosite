import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  useTheme,
  CircularProgress,
} from "@mui/material";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useTheme as useAppTheme } from '../MUIThemeProvider';

function MeetingScheduleCard() {
  const theme = useTheme();
  const { isDark } = useAppTheme();
  const themeMode = isDark ? 'dark' : 'light';
  const [schedularLoading, setSchedularLoading] = useState(true);


  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      if (cal) {
        cal("ui",
          {
            theme: themeMode,
            cssVarsPerTheme: {
              light: { "cal-brand": "#581f18" },
              dark: { "cal-brand": "#d26c52" },
            },
            hideEventTypeDetails: false,
            layout: "month_view",
          });

        const checkCalLoaded = setInterval(() => {
          const calFrame = document.querySelector('iframe[src*="cal.com"]');
          if (calFrame) {
            setSchedularLoading(false);
            clearInterval(checkCalLoaded);
          }
        }, 100);

        setTimeout(() => {
          setSchedularLoading(false);
          clearInterval(checkCalLoaded);
        }, 5000);
      }
    })();
  }, []);

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 2px 8px ${theme.palette.divider || "rgba(0,0,0,0.1)"}`,
        borderRadius: "12px",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {schedularLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "10            ls -la ~/Library/AWS_CLI/0%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.palette.background.paper + "cc",
            zIndex: 10,
            borderRadius: "12px",
          }}
        >
          <CircularProgress size={48} />
        </Box>
      )}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          height: "100%",
          padding: "32px",
          overflow: "hidden",
        }}
      >
        <Cal
          namespace="30min"
          calLink="christian-rappa-4eblfb/30min"
          style={{ width: "100%", height: "100%", overflow: "auto" }}
          config={{
            layout: "week_view",
            useSlotsViewOnSmallScreen: "true",
            theme: themeMode,
          }}
        />
      </CardContent>
    </Card>
  );
}

export default MeetingScheduleCard;
