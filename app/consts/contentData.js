import VerifiedIcon from "@mui/icons-material/Verified";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

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
        {
          label: "Specialty",
          value: "Full-Stack Development & AWS Cloud + A.I.",
          icon: VerifiedIcon,
        },
        { label: "Years of Experience", value: "10+", icon: CalendarMonthIcon },
        { label: "Features Shipped", value: "50+", icon: RocketLaunchIcon },
        {
          label: "AI Systems Deployed",
          value: "15+",
          icon: SettingsSuggestIcon,
        },
      ],
      techs: [
        { name: "Next.js / React / Angular", icon: "/nextjs-icon.png", statLevel: 5 },
        { name: "Vercel & Github CI/CD", icon: "/github-sign.png", statLevel: 4 },
        { name: "TypeScript", icon: "/typescript-icon.png", statLevel: 4 },
        { name: "Node.js / Java / Python", icon: "/node-js-icon.png", statLevel: 3 },
        { name: "AWS Cloud / Bedrock AI", icon: "/aws-icon.png", statLevel: 3 },
      ],
    },
    experience: {
      title: "Experience",
      description: "Classic style resume entries detailing my career journey.",
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
  projects: {
    meddpiccPal: {
      title: "MEDDPICC Pal",
      description: "Sales call intelligence made simple.",
      content: "Details about the MEDDPICC Pal project will be displayed here.",
    },
    sparkBins: {
      title: "SparkBins",
      description: "AI-powered idea notes manager.",
      content: "Details about the SparkBins project will be displayed here.",
    },
  },
  aichat: {
    aichatplacholder: {
      title: "AI Chat",
      description: "Conversational AI assistant for developers.",
      content: "Details about the AI Chat project will be displayed here.",
    },
  },
  contact: {
    emailForm: {
      title: "Email Form",
      description: "Submit your email for inquiries.",
      content: "Email form content will be displayed here.",
    },
    socialMediaLinks: {
      title: "Social Media Links",
      description: "Connect with me on social media.",
      content: "Social media links content will be displayed here.",
    },
    scheduleMeeting: {
      title: "Schedule a Meeting",
      description: "Book a meeting with me.",
      content: "Meeting schedule content will be displayed here.",
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

export default contentData;
