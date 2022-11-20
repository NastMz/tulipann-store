import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export function ScrollToTop() {
    const {pathname} = useLocation();

    useEffect(() => {
        // "document.documentElement.scrollTo" is the magic for React Router Dom v6
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });
    }, [pathname]);

    return null;
}