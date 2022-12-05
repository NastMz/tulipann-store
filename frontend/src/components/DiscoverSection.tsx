import {useSelector} from "react-redux";
import {selectArticles} from "../redux/selector";
import {DiscoverCard} from "./DiscoverCard";
import {SortUtil} from "../utils";
import {TitleBanner} from "./TitleBanner";

export const DiscoverSection = () => {
    // Get articles from global redux state
    const articles = useSelector(selectArticles);

    // Sort articles by date
    let showArticles = [...articles];
    SortUtil.sortByProperty(showArticles, "date", "DESC");

    // Get only the number of articles that want to display in the slider
    showArticles = showArticles.slice(0, 3);


    return (
        <section
            className={"mb-20 relative pb-12"}
        >
            <TitleBanner
                title={"Descubre"}
                subtitle={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dicta error iure maxime quae, quia sunt. Ea nobis quia saepe."}
                className={"pb-16"}
            />
            <div className={"flex flex-col md:flex-row gap-16 md:gap-6 lg:gap-8 px-12 md:px-8 md:px-20 items-center justify-center"}>
                {
                    showArticles.map((article) => (
                        <DiscoverCard
                            id={article.id}
                            title={article.title}
                            summary={article.summary}
                            banner={article.banner}
                            date={article.date}
                            author={article.author}
                            tags={article.tags}
                            key={article.id}
                            className={"w-full lg:w-80 h-[600px]"}
                        />
                    ))
                }
            </div>
        </section>
    )
}