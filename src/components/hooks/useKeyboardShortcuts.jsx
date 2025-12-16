// hooks/useKeyboardShortcuts.jsx
import { useEffect } from 'react';

export function useKeyboardShortcuts({ onCommandPaletteOpen, onThemeToggle }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Cmd/Ctrl + K (Command Palette)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        if (onCommandPaletteOpen) {
          onCommandPaletteOpen();
        }
      }
      if(event.key === 't'){
        event.preventDefault();
        if (onThemeToggle){
          onThemeToggle();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCommandPaletteOpen,onThemeToggle]);
}

export default useKeyboardShortcuts;