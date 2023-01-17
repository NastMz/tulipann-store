import { scroller } from "react-scroll";

/**
 * Scrolls the page to the element with the given ID, with an optional vertical offset.
 *
 * @param {string} scrollTo - The ID of the element to scroll to.
 * @param {number} [offset=0] - The number of pixels to offset the scroll position vertically.
 */
export const scrollToSection = (scrollTo: string, offset = 0) => {
  scroller.scrollTo(scrollTo, {
    duration: 800,
    delay: 0,
    smooth: "easeInOutQuart",
    offset,
  });
};
