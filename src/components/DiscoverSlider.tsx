import {useSelector} from "react-redux";
import {selectArticles} from "../redux/selector";
import {DiscoverCard} from "./utils/DiscoverCard";
import {SortUtil} from "../utils";
import {useEffect, useRef, useState} from "react";
import {BsArrowLeftCircle, BsArrowRightCircle, BsFillCircleFill} from "react-icons/all";

let count = 0;
let slideInterval: number | undefined;

export const DiscoverSlider = (props: { articlesToDisplay: number }) => {
    // Get articles from global redux state
    const articles = useSelector(selectArticles);

    // Sort articles by date
    let showArticles = [...articles];
    SortUtil.sortByProperty(showArticles, "date", "DESC");

    // Get only the number of articles that want to display in the slider
    if (showArticles.length > props.articlesToDisplay) {
        showArticles = showArticles.slice(0, props.articlesToDisplay);
    }

    // Ref for the slider and card to control the animation
    const discoverCardRef = useRef<any>(null);
    const sliderRef = useRef<any>(null);

    // State for the current showing card
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Add the event listener to the component for animation control
    useEffect(() => {
        startSlider();
        discoverCardRef.current.addEventListener("animationend", removeAnimation);
        sliderRef.current.addEventListener("mouseenter", pauseSlider);
        sliderRef.current.addEventListener("mouseleave", startSlider);

        return () => {
            clearInterval(slideInterval);
        };

    }, []);

    // Function for autostart the slider animation
    const startSlider = () => {
        slideInterval = setInterval(() => {
            handleOnNextClick();
        }, 3000);
    };

    // Function to stop the slider animation
    const pauseSlider = () => {
        clearInterval(slideInterval);
    };

    // Function to change the slider animation
    const removeAnimation = () => {
        if (discoverCardRef.current.classList.contains("animate-slideOutLeft")) {
            discoverCardRef.current.classList.remove("animate-slideOutLeft");
            discoverCardRef.current.classList.add("animate-slideInRight");
            setTimeout(() => discoverCardRef.current.classList.remove("animate-slideInRight"), 400);
        } else if (discoverCardRef.current.classList.contains("animate-slideOutRight")) {
            discoverCardRef.current.classList.remove("animate-slideOutRight");
            discoverCardRef.current.classList.add("animate-slideInLeft");
            setTimeout(() => discoverCardRef.current.classList.remove("animate-slideInLeft"), 400);
        }
    };

    // Functions for buttons that change to next or previous card in the slider

    const length = showArticles.length;

    const handleOnNextClick = () => {
        count = (count + 1) % length;
        setCurrentIndex(count);
        discoverCardRef.current.classList.add("animate-slideOutLeft");
    };

    const handleOnPrevClick = () => {
        count = (currentIndex + length - 1) % length;
        setCurrentIndex(count);
        discoverCardRef.current.classList.add("animate-slideOutRight");
    };


    // Array dynamically updated that shows the bottom icon of the actual showing card
    const bottomIcons = showArticles.map((article, index) => (
        <BsFillCircleFill
            size={currentIndex === index
                ? 10
                : 8}
            color={currentIndex === index
                ? "#fff"
                : "#d1d5db"}
            key={Math.random()}
            className={"transition-all ease-in-out duration-200"}
        />
    ));

    return (
        <section
            className={"h-56 md:h-96 my-20 relative overflow-hidden"}
            ref={sliderRef}
        >
            <DiscoverCard
                ref={discoverCardRef}
                id={showArticles[currentIndex].id}
                title={showArticles[currentIndex].title}
                summary={showArticles[currentIndex].summary}
                banner={showArticles[currentIndex].banner}
                date={showArticles[currentIndex].date}
            />
            <div
                className={"absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex items-center justify-between"}>
                <BsArrowLeftCircle
                    color={"#fff"}
                    size={25}
                    className={"cursor-pointer"}
                    onClick={() => handleOnPrevClick()}
                />
                <BsArrowRightCircle
                    color={"#fff"}
                    size={25}
                    className={"cursor-pointer"}
                    onClick={() => handleOnNextClick()}
                />
            </div>
            <div className={"absolute w-full bottom-0 flex gap-2 items-center justify-center pb-3"}>
                {
                    bottomIcons
                }
            </div>
        </section>
    )
}