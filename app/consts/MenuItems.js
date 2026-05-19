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
import TerminalIcon from '@mui/icons-material/Terminal';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AssistantIcon from '@mui/icons-material/Assistant';
import InfoIcon from '@mui/icons-material/Info';

const topMenuItems = [
  { id: "overview", label: "Overview", icon: InfoIcon },
  { id: "videos", label: "Videos", icon: PlayCircleIcon },
  { id: "projects", label: "Projects", icon: TerminalIcon },
];

const bottomMenuItems = [
  { id: "chat", label: "Agent Chat", icon: AssistantIcon },
  { id: "contact", label: "Contact", icon: AlternateEmailIcon },
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
  projects: [
    {
      id: "meddpiccPal",
      label: "MEDDPICC Pal",
      icon: Help,
      description: "Frequently Asked Questions",
    },
    {
      id: "sparkBins",
      label: "Spark Bins",
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
