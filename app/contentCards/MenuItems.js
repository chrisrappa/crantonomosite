import {
  Home,
  BarChart,
  Settings as SettingsIcon,
  Lock,
  Help,
  Logout as LogoutIcon,
  Dashboard,
  Settings,
  Logout,
} from "@mui/icons-material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FastForwardIcon from '@mui/icons-material/FastForward';

const topMenuItems = [
  { id: "overview", label: "Overview", icon: Dashboard },
  { id: "videos", label: "Videos", icon: PlayCircleIcon },
];

const bottomMenuItems = [
  { id: "help", label: "Help", icon: Help },
  { id: "logout", label: "Logout", icon: Logout },
];

const subMenuItems = {
  overview: [
    {
      id: "overview",
      label: "Basic Info",
      icon: Home,
      description: "Primary Stats",
    },
    {
      id: "experience",
      label: "Experience",
      icon: BarChart,
      description: "Primary Resume",
    },
  ],
  videos: [
    {
      id: "fullLength",
      label: "Full Length",
      icon: YouTubeIcon,
      description: "Full Length Videos",
    },
    {
      id: "shorts",
      label: "Shorts",
      icon: FastForwardIcon,
      description: "Short Videos",
    },
  ],
  help: [
    {
      id: "faq",
      label: "FAQ",
      icon: Help,
      description: "Frequently Asked Questions",
    },
  ],
  logout: [
    {
      id: "logout",
      label: "Logout",
      icon: LogoutIcon,
      description: "Sign Out",
    },
  ],
};

export { subMenuItems, topMenuItems, bottomMenuItems };
