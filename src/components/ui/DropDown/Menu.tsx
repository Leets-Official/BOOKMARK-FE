import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

interface DropDownMenuProps {
  isOpen: boolean;
  parentRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
  alignLeft?: boolean;
  onClose?: () => void;
}

const DropDownMenu = forwardRef<HTMLDivElement, DropDownMenuProps>(
  ({ isOpen, parentRef, children, className, alignLeft = false, onClose }, ref) => {
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
    const rafId = useRef<number | null>(null);

    const updatePosition = useCallback(() => {
      if (parentRef.current) {
        const rect = parentRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    }, [parentRef]);

    // 쓰로틀링: requestAnimationFrame으로 한 프레임에 한 번만 위치 업데이트
    const scheduleUpdate = useCallback(() => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updatePosition);
    }, [updatePosition]);

    // 드롭다운 위치 업데이트(계속 부모 위치 바로 밑으로)
    useEffect(() => {
      if (isOpen) {
        updatePosition();
        window.addEventListener('resize', scheduleUpdate);
        window.addEventListener('scroll', scheduleUpdate, true);

        // 스크롤 시 닫히는 기능
        const handleScrollClose = () => {
          if (onClose) onClose();
        };
        window.addEventListener('scroll', handleScrollClose, true);

        return () => {
          window.removeEventListener('resize', scheduleUpdate);
          window.removeEventListener('scroll', scheduleUpdate, true);
          window.removeEventListener('scroll', handleScrollClose, true);
          if (rafId.current !== null) cancelAnimationFrame(rafId.current);
        };
      }
    }, [isOpen, scheduleUpdate, updatePosition, onClose]);

    if (typeof window === 'undefined') return null;

    return createPortal(
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            className={`absolute z-50 ${className ?? ''}`}
            style={{
              top: position.top,
              left: alignLeft ? 0 : position.left,
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
  },
);

DropDownMenu.displayName = 'DropDownMenu';

export default DropDownMenu;
