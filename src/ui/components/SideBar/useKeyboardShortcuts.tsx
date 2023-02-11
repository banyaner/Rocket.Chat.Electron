import { useEffect, useState } from 'react';

/*
  用户点击command或control时，是否显示出key
*/

export const useKeyboardShortcuts = (): boolean => {
  const [isEachShortcutVisible, setShortcutsVisible] = useState(false);

  useEffect(() => {
    const shortcutKey = process.platform === 'darwin' ? 'Meta' : 'Control';

    const handleKeyChange =
      (down: boolean) =>
      ({ key }: KeyboardEvent) => {
        if (shortcutKey !== key) {
          return;
        }

        setShortcutsVisible(down);
      };

    const handleKeyDown = handleKeyChange(true);
    const handleKeyUp = handleKeyChange(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return isEachShortcutVisible;
};
