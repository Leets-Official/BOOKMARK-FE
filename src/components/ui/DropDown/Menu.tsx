import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface DropDownMenuProps {
  isOpen: boolean;
  parentRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
}

const DropDownMenu = ({ isOpen, parentRef, children, className }: DropDownMenuProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useLayoutEffect(() => {
    if (isOpen && parentRef.current) {
      const rect = parentRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen, parentRef]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`absolute z-50 ${className ?? ''}`}
          style={{
            top: position.top,
            left: position.left,
            minWidth: position.width,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default DropDownMenu;
