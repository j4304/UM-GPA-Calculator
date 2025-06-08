import { useEffect, useState } from "react";

export function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsSmall(window.innerWidth < 775);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return isSmall;
}
