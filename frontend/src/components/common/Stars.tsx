import {AiFillStar} from "react-icons/ai";

/**
 * Interface for Stars component props.
 *
 * @interface StarsProps
 * @property {number} rate - The rating to display, from 0 to 5.
 * @property {number} size - The size of the stars, in pixels.
 */
interface StarsProps {
    rate: number;
    size: number;
}


/**
 * Stars component.
 *
 * This component displays a set of stars with a given rating and size.
 *
 * @param {StarsProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const Stars = (props: StarsProps) => {
    return (
        <div className={"flex items-center"}>
            {[...Array(5)].map((star, index) => {
                return (
                    props.rate > index
                        ? (
                            <AiFillStar
                                color={"#fbbf24"}
                                key={Math.random()}
                                size={props.size}
                            />
                        )
                        : (
                            <AiFillStar
                                color={"#d1d5db"}
                                key={Math.random()}
                                size={props.size}
                            />
                        )
                );
            })}
        </div>
    );
};
