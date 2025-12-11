// hooks/useKeyboardShortcuts.jsx
import { useEffect } from 'react';

export function useKeyboardShortcuts({ onCommandPaletteOpen }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Cmd/Ctrl + K (Command Palette)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        if (onCommandPaletteOpen) {
          onCommandPaletteOpen();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCommandPaletteOpen]);
}

export default useKeyboardShortcuts;