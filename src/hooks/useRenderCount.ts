import { useRef } from "react";

export const useRenderCount = (): number => {
  const renders = useRef(0);
  renders.current += 1;

  return renders.current;
};
