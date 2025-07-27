import { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  toast: ToastState;
  // eslint-disable-next-line no-unused-vars
  showToast: (message: string, type?: 'success' | 'error', duration?: number) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    type: 'success',
  });

  // 현재 Toast 정보를 동기적으로 관리
  const currentToastRef = useRef<ToastState>({
    show: false,
    message: '',
    type: 'success',
  });

  // 이전 타이머를 저장할 ref
  const timerRef = useRef<number | null>(null);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' = 'success', duration: number = 3000) => {
      // 이전 타이머가 있다면 취소
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      // 현재 Toast 정보 업데이트
      const newToast = { show: true, message, type };
      currentToastRef.current = newToast;
      setToast(newToast);

      if (duration > 0) {
        timerRef.current = setTimeout(() => {
          // 현재 표시 중인 Toast가 이 Toast인지 확인
          if (currentToastRef.current.message === message) {
            setToast((prev) => ({ ...prev, show: false }));
            currentToastRef.current.show = false;
          }
          timerRef.current = null;
        }, duration);
      }
    },
    [],
  );

  const hideToast = useCallback(() => {
    // 타이머가 있다면 취소
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast((prev) => ({ ...prev, show: false }));
    currentToastRef.current.show = false;
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

// 간단한 훅
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
