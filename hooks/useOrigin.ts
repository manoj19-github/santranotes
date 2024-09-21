import { useEffect, useState } from "react";
export const useOrigin = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);
  if (!isMounted) return "";
  return origin;
  // const [origin, setOrigin] = useState<string>("")
  // useEffect(() => {
  //     setOrigin(window.location.origin)
  // }, [])
  // return origin
};
