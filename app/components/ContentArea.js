"use client";

import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";
import OverviewCard from "../contentCards/OverviewCard";
import {
  Dashboard,
  Settings,
  Help,
  Logout,
  ChevronRight,
} from '@mui/icons-material';

const contentData = {
  overview: {
    home: {
      title: "A.I. Supercharged Engineering Lead",
      img: "primaryHeadshot.png",
      description:
        "Years of classic style programming, experience at pre-revenue to Fortune 50 companies, and highly leveraged with agentic AI systems.",
      content:
        "This is your main dashboard view. Customize this area with your portfolio information.",
      stats: [
        { label: "Years of Experience", value: "10+", icon: Dashboard },
        { label: "Projects Completed", value: "50+", icon: Settings },
        { label: "AI Systems Integrated", value: "20+", icon: Help},
      ]
    },
    analytics: {
      title: "Analytics",
      description: "View detailed analytics and metrics.",
      content: "Analytics content will be displayed here.",
    },
  },
  settings: {
    account: {
      title: "Account Settings",
      description: "Manage your account information.",
      content: "Update your account settings here.",
    },
    security: {
      title: "Security Settings",
      description: "Manage your security preferences.",
      content: "Security options will appear here.",
    },
  },
  help: {
    faq: {
      title: "Frequently Asked Questions",
      description: "Find answers to common questions.",
      content: "FAQ content will be displayed here.",
    },
  },
  logout: {
    logout: {
      title: "Logout",
      description: "You have been logged out.",
      content: "Redirecting to login page...",
    },
  },
};

function ContentCardView({ selectedSubMenu, data, theme }) {
  switch (selectedSubMenu) {
    case "overview":
      return <OverviewCard data={data} />;
    default:
      return (
        <Card
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: `0 2px 8px ${theme.palette.divider || "rgba(0,0,0,0.1)"}`,
            borderRadius: "12px",
          }}
        >
          <CardContent>
            <Typography
              variant="body1"
              sx={{
                ...theme.typography.secondaryFont,
                lineHeight: "1.6",
              }}
            >
              {data?.content}
            </Typography>

            {/* Sample Content Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "16px",
                marginTop: "24px",
              }}
            >
              {[1, 2, 3].map((i) => (
                <Card
                  key={i}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "#ffffff",
                    padding: "16px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, marginBottom: "8px" }}
                  >
                    Item {i}
                  </Typography>
                  <Typography variant="body2">
                    Sample content for item {i}
                  </Typography>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>
      );
  }
}

export default function ContentArea({ selectedNav, selectedSubMenu }) {
  const theme = useTheme();

  console.log("selectedNav:", selectedNav);

  const data =
    contentData[selectedNav]?.[selectedSubMenu] ||
    contentData[selectedNav]?.[Object.keys(contentData[selectedNav])[0]];

  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        padding: "24px",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: theme.palette.background.default,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.action.disabled,
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ marginBottom: "32px" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            marginBottom: "8px",
            ...theme.typography.primaryFont,
          }}
        >
          {data?.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            ...theme.typography.secondaryFont,
          }}
        >
          {data?.description}
        </Typography>
      </Box>

      {/* Content Card */}
      <ContentCardView
        selectedSubMenu={selectedSubMenu}
        data={data}
        theme={theme}
      />
    </Box>
  );
}
