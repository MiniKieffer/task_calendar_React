import { useEffect, useRef, useState  } from "react";

type UseOutsideClickCloseParams = {
  ref: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  delay?: number;
};

export function useOutsideClickClose({ ref, onClose, delay = 200 }: UseOutsideClickCloseParams) {
  const justClosedRef = useRef(false);
  const [justClosed, setJustClosed] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
        justClosedRef.current = true;
        setJustClosed(true);
        setTimeout(() => {
          justClosedRef.current = false;
          setJustClosed(false);
        }, delay);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose, delay]);

  return { justClosedRef, justClosed };
}