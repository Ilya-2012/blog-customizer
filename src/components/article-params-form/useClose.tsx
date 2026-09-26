import { type RefObject, useEffect } from 'react';

type UseCloseProps = {
  isOpen: boolean;
  onClose: () => void;
  rootRef: RefObject<HTMLElement | null>;
};

export const useClose = ({ isOpen, onClose, rootRef }: UseCloseProps): void => {
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent): void => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return (): void => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose, rootRef]);
};
