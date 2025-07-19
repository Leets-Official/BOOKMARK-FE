import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type React from 'react';

interface FolderMenuPortalProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  children: React.ReactNode;
}

const MenuPortal = ({ isOpen, onClose, position, children }: FolderMenuPortalProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // 다른 곳 클릭 시 메뉴 닫힘
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    //esc 이벤트 핸들러
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // 스크롤 이벤트 핸들러 추가
    const handleScroll = () => {
      onClose();
    };

    // 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && position.x !== 0 && position.y !== 0 && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          transition={{ duration: 0.15 }}
          className='fixed bg-white border border-[#D8DCE6] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.1)] p-2'
          style={{
            left: position.x,
            top: position.y,
            zIndex: 9999,
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default MenuPortal;
