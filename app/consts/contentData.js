
import VerifiedIcon from '@mui/icons-material/Verified';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

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
        { label: "Specialty", value: "Full-Stack Development & AWS Cloud + A.I.", icon: VerifiedIcon},
        { label: "Years of Experience", value: "10+", icon: CalendarMonthIcon },
        { label: "Features Shipped", value: "50+", icon: RocketLaunchIcon },
        { label: "AI Systems Deployed", value: "15+", icon: SettingsSuggestIcon },
      ],
      techs: [
        { name: "Next.js / React", icon: "", statLevel: 5 },
        { name: "Vercel & Github CI/CD", icon: "", statLevel: 4 },
        { name: "TypeScript", icon: "", statLevel: 4 },
        { name: "Node.js / Java / Python", icon: "", statLevel: 3 },
        { name: "AWS Cloud / Bedrock AI", icon: "", statLevel: 3 },
      ]
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

export default contentData;