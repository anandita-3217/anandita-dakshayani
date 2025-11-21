// hooks/useKeyboardShortcuts.jsx
import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';

export function useKeyboardShortcuts({ onSearchOpen }) {
  const { toggleColorMode } = useColorMode();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check for Cmd/Ctrl + K (Search)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        if (onSearchOpen) {
          onSearchOpen();
        }
      }

      // Check for 'T' key (Toggle Theme)
      // Only trigger if not typing in an input/textarea
      if (
        event.key === 't' && 
        !event.metaKey && 
        !event.ctrlKey && 
        !event.altKey &&
        event.target.tagName !== 'INPUT' &&
        event.target.tagName !== 'TEXTAREA' &&
        !event.target.isContentEditable
      ) {
        event.preventDefault();
        toggleColorMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleColorMode, onSearchOpen]);
}

export default useKeyboardShortcuts;