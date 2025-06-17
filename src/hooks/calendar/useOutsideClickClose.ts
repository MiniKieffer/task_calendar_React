import { useEffect, useRef, useState  } from "react";

type UseOutsideClickCloseParams = {
  ref: React.RefObject<HTMLElement | null>;
  ignoreRef?: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  delay?: number;
};

export function useOutsideClickClose({ ref, ignoreRef, onClose, delay = 200 }: UseOutsideClickCloseParams) {
  const justClosedRef = useRef(false);
  const [justClosed, setJustClosed] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        ref.current &&
        !ref.current.contains(target) &&
        !(ignoreRef?.current?.contains(target))
      ) {
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
  }, [ref, ignoreRef, onClose, delay]);

  return { justClosedRef, justClosed };
}