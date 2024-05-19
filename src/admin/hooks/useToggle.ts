import { useCallback, useState } from "react";

export const useToggle = (
  initialState = false
): [boolean, (arg?: boolean) => () => void] => {
  const [state, dispatch] = useState<boolean>(initialState);
  const toggle = useCallback((newState?: boolean) => {
    return () => {
      if (newState === undefined) {
        dispatch((state) => !state);
      } else {
        dispatch(newState);
      }
    };
  }, []);
  return [state, toggle];
};
