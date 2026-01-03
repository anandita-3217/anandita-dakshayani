import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Heading, Text, VStack, HStack, Button, Badge } from '@chakra-ui/react';
import { Flame, Star, Building2, Music, Layers } from 'lucide-react';

// ============================================
// CONFIGURATION - PUT YOUR GITHUB USERNAME HERE
// ============================================
const GITHUB_USERNAME = ""; // ← CHANGE THIS!

// Sample contribution data (in real app, fetch from GitHub API or use react-github-calendar)
// Each week has 7 days, intensity 0-4 (0=none, 4=most commits)
const generateSampleData = () => {
  const weeks = 52;
  const data = [];
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      week.push({
        date: new Date(2024, 0, 1 + w * 7 + d),
        count: Math.floor(Math.random() * 15), // 0-15 commits
        level: Math.floor(Math.random() * 5), // 0-4 intensity
      });
    }
    data.push(week);
  }
  return data;
};

// ============================================
// STYLE 1: HEATMAP WITH GLOW EFFECTS
// ============================================
const GlowHeatmap = ({ data }) => {
  const getColor = (level) => {
    const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
    return colors[level] || colors[0];
  };

  return (
    <Box>
      <Heading size="md" mb={4} color="brand.400">
        🌟 Glow Heatmap Style
      </Heading>
      <Box 
        display="flex" 
        gap="3px" 
        overflowX="auto" 
        p={4}
        bg="rgba(0,0,0,0.3)"
        borderRadius="xl"
      >
        {data.map((week, wi) => (
          <VStack key={wi} spacing="3px">
            {week.map((day, di) => (
              <Box
                key={`${wi}-${di}`}
                w="12px"
                h="12px"
                bg={getColor(day.level)}
                borderRadius="sm"
                transition="all 0.3s"
                boxShadow={day.level > 2 ? `0 0 ${day.level * 8}px ${getColor(day.level)}` : 'none'}
                _hover={{
                  transform: 'scale(1.5)',
                  boxShadow: `0 0 20px ${getColor(day.level)}`,
                  zIndex: 10,
                }}
                cursor="pointer"
              />
            ))}
          </VStack>
        ))}
      </Box>
    </Box>
  );
};

// ============================================
// STYLE 2: 3D ELEVATED GRAPH
// ============================================
const ElevatedGraph = ({ data }) => {
  return (
    <Box>
      <Heading size="md" mb={4} color="purple.400">
        📊 3D Elevated Graph
      </Heading>
      <Box 
        display="flex" 
        gap="2px" 
        overflowX="auto"
        p={4}
        bg="rgba(0,0,0,0.3)"
        borderRadius="xl"
        style={{ perspective: '1000px' }}
      >
        {data.slice(0, 30).map((week, wi) => (
          <VStack key={wi} spacing="2px" align="stretch">
            {week.map((day, di) => {
              const height = day.count * 3 + 10;
              return (
                <Box
                  key={`${wi}-${di}`}
                  w="14px"
                  h={`${height}px`}
                  bg={`hsl(${120 + day.level * 20}, 70%, ${40 + day.level * 10}%)`}
                  borderRadius="sm"
                  transition="all 0.3s"
                  transform="rotateX(45deg)"
                  transformOrigin="bottom"
                  boxShadow="0 4px 8px rgba(0,0,0,0.3)"
                  _hover={{
                    transform: 'rotateX(45deg) scale(1.2)',
                    zIndex: 10,
                  }}
                  cursor="pointer"
                />
              );
            })}
          </VStack>
        ))}
      </Box>
    </Box>
  );
};

// ============================================
// STYLE 3: NEON CITY SKYLINE
// ============================================
const NeonCity = ({ data }) => {
  return (
    <Box>
      <Heading size="md" mb={4} color="cyan.400">
        🏙️ Neon City Skyline
      </Heading>
      <Box 
        h="200px"
        display="flex"
        alignItems="flex-end"
        gap="1px"
        overflowX="auto"
        p={4}
        bg="linear-gradient(to bottom, #0a0a1a 0%, #1a0a2e 100%)"
        borderRadius="xl"
        position="relative"
      >
        {/* Stars background */}
        {[...Array(50)].map((_, i) => (
          <Box
            key={i}
            position="absolute"
            w="2px"
            h="2px"
            bg="white"
            borderRadius="full"
            top={`${Math.random() * 60}%`}
            left={`${Math.random() * 100}%`}
            opacity={Math.random()}
          />
        ))}
        
        {data.slice(0, 30).map((week, wi) => (
          <VStack key={wi} spacing="1px" h="100%" justify="flex-end">
            {week.map((day, di) => {
              const height = `${(day.count * 8 + 20)}px`;
              const glowColor = day.level > 2 ? '#00ffff' : day.level > 1 ? '#ff00ff' : '#4a5568';
              return (
                <Box
                  key={`${wi}-${di}`}
                  w="8px"
                  h={height}
                  bg={glowColor}
                  borderTopRadius="sm"
                  transition="all 0.3s"
                  boxShadow={`0 0 ${day.level * 10}px ${glowColor}, 0 -5px 10px ${glowColor}80`}
                  _hover={{
                    transform: 'scaleY(1.2)',
                    boxShadow: `0 0 30px ${glowColor}`,
                  }}
                  cursor="pointer"
                  position="relative"
                >
                  {day.level > 2 && (
                    <Box
                      position="absolute"
                      top="-4px"
                      left="50%"
                      transform="translateX(-50%)"
                      w="2px"
                      h="4px"
                      bg={glowColor}
                      boxShadow={`0 0 10px ${glowColor}`}
                    />
                  )}
                </Box>
              );
            })}
          </VStack>
        ))}
      </Box>
    </Box>
  );
};

// ============================================
// STYLE 4: CONSTELLATION MAP
// ============================================
const ConstellationMap = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, w, h);
    
    // Draw connections between days with commits
    const points = [];
    data.slice(0, 30).forEach((week, wi) => {
      week.forEach((day, di) => {
        if (day.level > 1) {
          points.push({
            x: wi * 20 + 20,
            y: di * 20 + 20,
            level: day.level,
          });
        }
      });
    });
    
    // Draw lines
    ctx.strokeStyle = 'rgba(100, 200, 255, 0.2)';
    ctx.lineWidth = 1;
    points.forEach((p1, i) => {
      points.slice(i + 1).forEach(p2 => {
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        if (dist < 60) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });
    
    // Draw stars
    points.forEach(p => {
      const size = p.level * 2 + 2;
      ctx.fillStyle = `hsl(${200 + p.level * 20}, 80%, 70%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = ctx.fillStyle;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, [data]);

  return (
    <Box>
      <Heading size="md" mb={4} color="blue.300">
        ✨ Constellation Map
      </Heading>
      <Box 
        bg="#0a0a1a" 
        borderRadius="xl" 
        p={4}
        overflowX="auto"
      >
        <canvas 
          ref={canvasRef} 
          width={700} 
          height={180}
          style={{ borderRadius: '8px' }}
        />
      </Box>
    </Box>
  );
};

// ============================================
// STYLE 5: FIRE/HEAT VISUALIZATION
// ============================================
const FireVisualization = ({ data }) => {
  const getFireColor = (level) => {
    const colors = [
      'linear-gradient(to top, #1a1a2e, #16213e)',
      'linear-gradient(to top, #0f3460, #16213e)',
      'linear-gradient(to top, #e94560, #0f3460)',
      'linear-gradient(to top, #ff6b6b, #e94560)',
      'linear-gradient(to top, #ffd93d, #ff6b6b)',
    ];
    return colors[level] || colors[0];
  };

  return (
    <Box>
      <Heading size="md" mb={4} color="orange.400">
        🔥 Fire Heat Visualization
      </Heading>
      <Box 
        display="flex" 
        gap="2px" 
        overflowX="auto"
        p={4}
        bg="linear-gradient(to bottom, #0a0a0a, #1a1a1a)"
        borderRadius="xl"
      >
        {data.slice(0, 30).map((week, wi) => (
          <VStack key={wi} spacing="2px">
            {week.map((day, di) => (
              <Box
                key={`${wi}-${di}`}
                w="12px"
                h="12px"
                bg={getFireColor(day.level)}
                borderRadius="sm"
                transition="all 0.3s"
                position="relative"
                _hover={{
                  transform: 'scale(1.3)',
                  zIndex: 10,
                }}
                cursor="pointer"
                _before={day.level > 2 ? {
                  content: '""',
                  position: 'absolute',
                  top: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  w: '4px',
                  h: '8px',
                  bg: 'orange.300',
                  borderRadius: 'full',
                  filter: 'blur(2px)',
                  animation: 'flicker 0.5s infinite',
                } : {}}
              >
                {day.level > 3 && (
                  <Box
                    position="absolute"
                    top="-4px"
                    left="50%"
                    transform="translateX(-50%)"
                    w="6px"
                    h="6px"
                    bg="yellow.300"
                    borderRadius="full"
                    filter="blur(3px)"
                    opacity={0.8}
                  />
                )}
              </Box>
            ))}
          </VStack>
        ))}
      </Box>
    </Box>
  );
};

// ============================================
// STYLE 6: GLASSMORPHISM TILES
// ============================================
const GlassTiles = ({ data }) => {
  return (
    <Box>
      <Heading size="md" mb={4} color="purple.300">
        💎 Glass Morphism Tiles
      </Heading>
      <Box 
        display="flex" 
        gap="4px" 
        overflowX="auto"
        p={4}
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        borderRadius="xl"
      >
        {data.slice(0, 30).map((week, wi) => (
          <VStack key={wi} spacing="4px">
            {week.map((day, di) => {
              const opacity = 0.1 + (day.level * 0.15);
              return (
                <Box
                  key={`${wi}-${di}`}
                  w="14px"
                  h="14px"
                  bg={`rgba(255, 255, 255, ${opacity})`}
                  backdropFilter="blur(10px)"
                  borderRadius="md"
                  border="1px solid"
                  borderColor={`rgba(255, 255, 255, ${opacity + 0.1})`}
                  transition="all 0.3s"
                  _hover={{
                    transform: 'scale(1.4) translateZ(20px)',
                    bg: 'rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    zIndex: 10,
                  }}
                  cursor="pointer"
                  style={{ perspective: '1000px' }}
                />
              );
            })}
          </VStack>
        ))}
      </Box>
    </Box>
  );
};

// ============================================
// STYLE 7: PIXELATED GAME BOARD
// ============================================
const PixelGameBoard = ({ data }) => {
  return (
    <Box>
      <Heading size="md" mb={4} color="green.400">
        🎮 Pixel Game Board
      </Heading>
      <Box 
        display="flex" 
        gap="1px" 
        overflowX="auto"
        p={4}
        bg="#0a0a0a"
        borderRadius="xl"
        border="4px solid"
        borderColor="green.500"
        imageRendering="pixelated"
      >
        {data.slice(0, 30).map((week, wi) => (
          <VStack key={wi} spacing="1px">
            {week.map((day, di) => {
              const colors = ['#1a1a1a', '#2d4a2b', '#3d6e3b', '#52a352', '#7bc67b'];
              return (
                <Box
                  key={`${wi}-${di}`}
                  w="12px"
                  h="12px"
                  bg={colors[day.level]}
                  transition="all 0.1s"
                  _hover={{
                    transform: 'scale(1.2)',
                    boxShadow: `0 0 0 2px ${colors[4]}`,
                    zIndex: 10,
                  }}
                  cursor="pointer"
                  position="relative"
                >
                  {day.level > 3 && (
                    <Box
                      position="absolute"
                      top="2px"
                      left="2px"
                      w="4px"
                      h="4px"
                      bg="yellow.300"
                    />
                  )}
                </Box>
              );
            })}
          </VStack>
        ))}
      </Box>
    </Box>
  );
};

// ============================================
// MAIN COMPONENT WITH SWITCHER
// ============================================
export default function GitHubContributions() {
  const [activeStyle, setActiveStyle] = useState('glow');
  const sampleData = generateSampleData();
  
  // Calculate streak (mock data)
  const currentStreak = 127; // ← You can calculate this from real data
  const longestStreak = 365;
  const totalContributions = 2847;

  const styles = [
    { id: 'glow', name: 'Glow Heatmap', icon: Flame, component: GlowHeatmap },
    { id: '3d', name: '3D Elevated', icon: Layers, component: ElevatedGraph },
    { id: 'city', name: 'Neon City', icon: Building2, component: NeonCity },
    { id: 'constellation', name: 'Constellation', icon: Star, component: ConstellationMap },
    { id: 'fire', name: 'Fire Heat', icon: Flame, component: FireVisualization },
    { id: 'glass', name: 'Glass Tiles', icon: Layers, component: GlassTiles },
    { id: 'pixel', name: 'Pixel Game', icon: Music, component: PixelGameBoard },
  ];

  const ActiveComponent = styles.find(s => s.id === activeStyle)?.component || GlowHeatmap;

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <VStack spacing={4} textAlign="center">
          <Heading size="xl" color="text.primary">
            GitHub Contribution Styles 🎨
          </Heading>
          <Text color="text.secondary">
            Choose your favorite visualization style
          </Text>
          
          {/* Stats */}
          <HStack spacing={6} pt={4}>
            <VStack spacing={0}>
              <Heading size="lg" color="green.400">{currentStreak}</Heading>
              <Text fontSize="xs" color="text.muted">Day Streak 🔥</Text>
            </VStack>
            <VStack spacing={0}>
              <Heading size="lg" color="purple.400">{longestStreak}</Heading>
              <Text fontSize="xs" color="text.muted">Longest Streak</Text>
            </VStack>
            <VStack spacing={0}>
              <Heading size="lg" color="blue.400">{totalContributions}</Heading>
              <Text fontSize="xs" color="text.muted">Total Contributions</Text>
            </VStack>
          </HStack>
        </VStack>

        {/* Style Switcher */}
        <HStack spacing={3} flexWrap="wrap" justify="center">
          {styles.map(style => (
            <Button
              key={style.id}
              size="sm"
              leftIcon={<style.icon size={16} />}
              onClick={() => setActiveStyle(style.id)}
              colorScheme={activeStyle === style.id ? 'purple' : 'gray'}
              variant={activeStyle === style.id ? 'solid' : 'outline'}
            >
              {style.name}
            </Button>
          ))}
        </HStack>

        {/* Active Visualization */}
        <Box>
          <ActiveComponent data={sampleData} />
        </Box>

        {/* Integration Instructions */}
        <Box
          bg="rgba(255, 255, 255, 0.02)"
          p={6}
          borderRadius="xl"
          border="1px solid"
          borderColor="rgba(255, 255, 255, 0.1)"
        >
          <Heading size="sm" mb={3} color="brand.400">
            📝 How to Use:
          </Heading>
          <VStack align="stretch" spacing={2} fontSize="sm" color="text.secondary">
            <Text>1. Change <Badge>GITHUB_USERNAME</Badge> at the top of the file</Text>
            <Text>2. Install: <Badge>npm install react-github-calendar</Badge> for real data</Text>
            <Text>3. Or fetch from GitHub API: <Badge>https://github-contributions-api.jogruber.de/v4/{GITHUB_USERNAME}</Badge></Text>
            <Text>4. Pick your favorite style and use that component</Text>
            <Text>5. Uncomment the style you want in your Learning.jsx</Text>
          </VStack>
        </Box>
      </VStack>

      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </Container>
  );
}