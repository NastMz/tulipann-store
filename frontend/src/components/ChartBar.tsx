import {AiFillStar} from "react-icons/all";

interface ChartBarProps {
    stars: 1 | 2 | 3 | 4 | 5,
    percent: number
}

export const ChartBar = (props: ChartBarProps) => {

    return (
        <div className="flex gap-2 items-center text-sm w-full">
            <span className={"font-medium"}>{props.stars}</span>
            <AiFillStar
                color={"#fbbf24"}
                key={Math.random()}
                size={18}
            />
            <div className="flex-grow h-3 bg-gray-100 rounded-lg content-[' ']">
                <div
                    className={`h-3 rounded-lg content-[' '] bg-yellow-400`}
                    style={{
                        width: props.percent + "%"
                    }}
                />
            </div>
            <span
                className={'text-gray-400 whitespace-pre-wrap'}>{props.percent < 10 ? '  ' + props.percent : props.percent}%</span>
        </div>
    )
}