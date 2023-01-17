import { AiFillStar } from "react-icons/ai";

/**
 * Interface for ChartBar component props
 *
 * @interface ChartBarProps
 * @property {1|2|3|4|5} stars - The number of stars to display.
 * @property {number} percent - The percentage to fill the bar.
 */
interface ChartBarProps {
  stars: 1 | 2 | 3 | 4 | 5;
  percent: number;
}

/**
* ChartBar component.
*
* This component displays a bar chart with the given number of stars and percentage fill.
*
* @param {ChartBarProps} props - Props for the component.
* @returns {JSX.Element} The rendered component.
*/
export const ChartBar = (props: ChartBarProps): JSX.Element => {
  return (
    <div className="flex gap-2 items-center text-sm w-full">
      {/* Display the number of stars */}
      <span className={"font-medium"}>{props.stars}</span>
      <AiFillStar color={"#fbbf24"} size={18} />
      {/* The bar chart */}
      <div className="flex-grow h-3 bg-gray-100 rounded-lg content-[' ']">
        <div
          className={`h-3 rounded-lg content-[' '] bg-yellow-400`}
          style={{
            width: `${props.percent}%`,
          }}
        />
      </div>
      {/* Display the percentage */}
      <span className={'text-gray-400 whitespace-pre-wrap'}>
        {/* Add extra whitespace for single-digit percentages to align them with the bar */}
        {props.percent < 10 ? "  " + props.percent : props.percent}%
      </span>
    </div>
  );
};
