import React, { useState } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { Play } from 'lucide-react';

function YouTubeEmbed({ videoId, title }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <Box
        as="iframe"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        width="100%"
        height="100%"
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      cursor="pointer"
      onClick={() => setIsPlaying(true)}
      bg="#000"
    >
      <Box
        as="img"
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        width="100%"
        height="100%"
        objectFit="cover"
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="rgba(0,0,0,0.3)"
        transition="all 0.3s"
        _hover={{ bg: 'rgba(0,0,0,0.5)' }}
      >
        <IconButton
          icon={<Play size={32} fill="white" />}
          aria-label="Play video"
          isRound
          size="lg"
          bg="rgba(20,184,166,0.9)"
          color="white"
          _hover={{
            bg: 'rgba(20,184,166,1)',
            transform: 'scale(1.1)'
          }}
          transition="all 0.3s"
        />
      </Box>
    </Box>
  );
}

export default YouTubeEmbed;