import { useState, useCallback } from 'react';

export function useToast() {
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success',
  });

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' = 'success', duration: number = 3000) => {
      setToast({ show: true, message, type });

      if (duration > 0) {
        setTimeout(() => {
          setToast((prev) => ({ ...prev, show: false }));
        }, duration);
      }
    },
    [],
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
}
