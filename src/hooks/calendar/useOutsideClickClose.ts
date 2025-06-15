import { useEffect, useRef } from "react";

type UseOutsideClickCloseParams = {
  ref: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  delay?: number;
};

export function useOutsideClickClose({ ref, onClose, delay = 100 }: UseOutsideClickCloseParams) {
  const justClosedRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
        justClosedRef.current = true;
        setTimeout(() => {
          justClosedRef.current = false;
        }, delay);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose, delay]);

  return justClosedRef;
}