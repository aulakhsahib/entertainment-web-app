import { useEffect, useRef } from "react";
export default function useUpdateEffect(fn, dependencies) {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    fn();
  }, dependencies);
}
