import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * Component that scrolls the page to the top on route change.
 *
 * @returns {null} The component doesn't render anything.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top with a delay of 300ms
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }, 300);
  }, [pathname]);

  return null;
}
