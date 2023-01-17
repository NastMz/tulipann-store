/**
 * Interface for TitleBanner component props.
 *
 * @interface TitleBannerProps
 * @property {string} title - The main title to display.
 * @property {string} subtitle - The subtitle to display.
 * @property {string} [className] - An optional class name to add to the component.
 */
interface TitleBannerProps {
    title: string;
    subtitle: string;
    className?: string;
}


/**
 * TitleBanner component.
 *
 * This component displays a title and subtitle in a banner.
 *
 * @param {TitleBannerProps} props - Props for the component.
 * @returns {ReactNode} The rendered component.
 */
export const TitleBanner = (props: TitleBannerProps) => {
    return (
        <div className={`px-8 md:px-40 lg:px-60 text-center flex flex-col gap-4 ${props.className}`}>
            <h2 className={"text-3xl md:text-5xl font-bold"}>{props.title}</h2>
            <p className={"text-sm md:text-base text-gray-400"}>{props.subtitle}</p>
        </div>
    );
};
