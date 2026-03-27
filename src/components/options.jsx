import ReelCarousel from "../components/ui/ReelCarousel";
import { Paintbrush, CodeXml, Sparkles, Handshake } from 'lucide-react';
// 1. Your JSON Data (Mocked here since I can't see your .json file)
import reelsData from '../data/reels.json';

// 2. The Icon Map
const REEL_ICON_MAP = { Paintbrush, CodeXml, Sparkles, Handshake };

// 4. The Default Export (The Page)
export default function Sample() {
  return (
    // <Box py={20} bg="gray.900" minH="100vh">
      <ReelCarousel reels={reelsData} iconMap={REEL_ICON_MAP} />
    // </Box>
  );
}