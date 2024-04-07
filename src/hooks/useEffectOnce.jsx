import { useEffect, useRef } from "react";

export default function useEffectOnce(cb) {
  const cbRef = useRef(cb);
  useEffect(() => {
    cbRef.current();
  }, []);
}
