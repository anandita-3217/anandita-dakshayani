// components/SkillIcon.jsx
import {
  Code, FileCode, Braces, FileJson, Type, Coffee, Database, Terminal,
  Globe, Layout, Server, PanelLeft, Palette, Tablet,
  BadgePlus, BarChart, Brain, LineChart, Sigma,
  Coins, Boxes, Link as LinkIcon, LockKeyhole, Wallet, FolderArchive,
  Cloud, CloudCog, Container, GitBranch, Layers, CircleDashed, UploadCloud,
  Cpu, Network, Bot, Share2, Settings, Zap, ShieldCheck
} from "lucide-react";
import { Icon, useColorModeValue } from "@chakra-ui/react";

export default function SkillIcon({ name, size = 20, color, ...props }) {
  const iconMap = {
    // Languages
    code: Code,
    "file-code": FileCode,
    braces: Braces,
    "file-json": FileJson,
    type: Type,
    coffee: Coffee,
    database: Database,
    terminal: Terminal,

    // Web
    globe: Globe,
    layout: Layout,
    server: Server,
    "panel-left": PanelLeft,
    palette: Palette,
    tablet: Tablet,

    // ML/Data
    "badge-plus": BadgePlus,
    "bar-chart": BarChart,
    brain: Brain,
    "line-chart": LineChart,
    sigma: Sigma,

    // Blockchain
    coins: Coins,
    boxes: Boxes,
    link: LinkIcon,
    "lock-keyhole": LockKeyhole,
    wallet: Wallet,
    "folder-archive": FolderArchive,

    // Cloud/DevOps
    cloud: Cloud,
    "cloud-cog": CloudCog,
    container: Container,
    "git-branch": GitBranch,
    layers: Layers,
    "circle-dashed": CircleDashed,
    "upload-cloud": UploadCloud,

    // Concepts
    cpu: Cpu,
    network: Network,
    bot: Bot,
    "share-2": Share2,
    settings: Settings,
    zap: Zap,
    "shield-check": ShieldCheck,
  };

  const IconComponent = iconMap[name] || Code;

  const hoverColor = useColorModeValue("#14b8a6", "#5eead4"); // teal glow

  return (
    <Icon
      as={IconComponent}
      boxSize={size}
      color={color || useColorModeValue("gray.700", "gray.300")}
      transition="all 0.2s"
      _hover={{
        color: hoverColor,
        transform: "scale(1.1)",
      }}
      {...props}
    />
  );
}
