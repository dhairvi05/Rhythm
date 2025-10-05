import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly move to the top of the page
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // 👈 ensures no animation
    });
  }, [pathname]);

  return null;
}
