import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

interface DropDownMenuProps {
  children: React.ReactNode;
  isOpen: boolean;
  position: string;
  className?: string;
}

const DropDownMenu = ({ children, isOpen, position, className }: DropDownMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`${position} ${className} absolute`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropDownMenu;
