// @ts-ignore
import {scroller} from "react-scroll";
// excluded React component syntax...
export const scrollToSection = (scrollTo: string, offset: number = 0) => {
    scroller.scrollTo(scrollTo, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: offset
    });
};