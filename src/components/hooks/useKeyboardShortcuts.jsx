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
      // TODO: Figure out what combination
      if((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === 'k'
){
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