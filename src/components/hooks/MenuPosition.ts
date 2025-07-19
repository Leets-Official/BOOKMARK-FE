import { useState, useRef, useCallback, useEffect } from 'react';

export function useMenuHandler(offsetX = 143, offsetY = 4) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 4 });
  const iconRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (iconRef.current && isMenuOpen) {
      const rect = iconRef.current.getBoundingClientRect();
      setMenuPosition({
        x: rect.right - offsetX,
        y: rect.bottom + offsetY,
      });
    }
  }, [isMenuOpen, offsetX, offsetY]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const resizeObserver = new ResizeObserver(() => {
      updatePosition();
    });

    resizeObserver.observe(document.body);
    window.addEventListener('resize', updatePosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updatePosition);
    };
  }, [isMenuOpen, updatePosition]);

  const isOpen = () => {
    updatePosition();
    setIsMenuOpen(true);
  };

  const isClose = () => setIsMenuOpen(false);

  return {
    isMenuOpen,
    menuPosition,
    iconRef,
    isOpen,
    isClose,
  };
}
