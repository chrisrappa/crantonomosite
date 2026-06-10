"use client";

import {
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  Button,
} from "@mui/material";
import OverviewCard from "../contentCards/OverviewCard";
import contentData from "../consts/contentData";
import ExperienceCard from "../contentCards/ExperienceCard";
import FullLengthVideo from "../contentCards/FullLengthVideo";
import VideoShorts from "../contentCards/VideoShorts";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MEDDPICCPalCard from "../contentCards/MEDDPICCPalCard";
import SparkBinsCard from "../contentCards/SparkBinsCard";
import AIChatCard from "../contentCards/AIChatCard";
import EmailSubmission from "../contentCards/EmailSubmission";
import SocialMediaLinksCard from "../contentCards/SocialMediaLinksCard";
import MeetingScheduleCard from "../contentCards/MeetingScheduleCard";

function ContentCardView({ selectedSubMenu, data, theme }) {
  switch (selectedSubMenu) {
    case "overview":
      return <OverviewCard data={data} />;
    case "experience":
      return <ExperienceCard data={data} />;
    case "fullLength":
      return <FullLengthVideo data={data} />;
    case "shorts":
      return <VideoShorts data={data} />;
    case "meddpiccPal":
      return <MEDDPICCPalCard data={data} />;
    case "sparkBins":
      return <SparkBinsCard data={data} />;
    case "aichatplacholder":
      return <AIChatCard data={data} />;
    case "emailForm":
      return <EmailSubmission data={data} />;
     case "socialMediaLinks":
      return <SocialMediaLinksCard data={data} />;
     case "scheduleMeeting":
      return <MeetingScheduleCard data={data} />;
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

  const data =
    contentData[selectedNav]?.[selectedSubMenu] ||
    contentData[selectedNav]?.[Object.keys(contentData[selectedNav])[0]];

    console.log('data', data)

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
      <Box
        sx={{
          marginBottom: "32px",
          display: "flex",
          gap: "12px",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Box>
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

        {data?.title === "Experience" && (
          <Button
            variant="contained"
            component="a"
            href="/Chris_Rappa.pdf"
            download="Chris_Rappa.pdf"
            startIcon={<PictureAsPdfIcon />}
            sx={{
              ...theme.typography.secondaryFont,
              textTransform: "none",
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            Download PDF Version
          </Button>
        )}
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
