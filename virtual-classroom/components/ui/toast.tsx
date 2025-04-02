// components/ui/toast.tsx
import { useState, useEffect } from "react";
import React from "react"; // Required for React.ReactNode/Element

export function Toast({
  message,
  onClose,
  duration = 3000,
  className,
}: {
  message: string;
  onClose: () => void;
  duration?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    isVisible && (
      <div
        className={`fixed bottom-4 right-4 px-6 py-4 bg-blue-600 text-white rounded-md shadow-lg ${className}`}
      >
        {message}
      </div>
    )
  );
}

// ✅ Add missing exports for use-toast.ts compatibility

export type ToastActionElement = React.ReactElement;

export type ToastProps = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
