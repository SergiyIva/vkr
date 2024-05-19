import { MutableRefObject, useEffect } from "react";

type UseClickOutsideType = (
  handler: () => void,
  ref: MutableRefObject<HTMLElement>
) => void;
export const useClickOutside: UseClickOutsideType = (handler, ref) => {
  useEffect(() => {
    const evt = (e: MouseEvent | TouchEvent) => {
      if (!ref || !ref.current) return;
      // Node, а не HTMLElement, т.к., например, svg - не явл последним, а в ноду входит
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        handler();
      }
    };
    window.addEventListener("mousedown", evt);
    window.addEventListener("touchstart", evt);
    return () => {
      window.removeEventListener("mousedown", evt);
      window.addEventListener("touchstart", evt);
    };
  }, [ref, handler]);
};
