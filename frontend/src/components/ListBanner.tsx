interface ListBannerProps {
    title: string,
    subtitle: string,
}

export const ListBanner = (props: ListBannerProps) => {
    return (
        <div className={"pt-16 pb-8 md:pt-28 md:pb-16 px-8 md:px-40 lg:px-80 text-center flex flex-col gap-4"}>
            <h1 className={"text-3xl md:text-5xl font-bold"}>{props.title}</h1>
            <h4 className={"text-sm md:text-base text-gray-400"}>{props.subtitle}</h4>
        </div>
    )
}