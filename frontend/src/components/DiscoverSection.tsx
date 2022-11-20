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
    showArticles = showArticles.slice(0, 4);


    return (
        <section
            className={"mb-20 relative pb-12"}
        >
            <TitleBanner
                title={"Descubre"}
                subtitle={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dicta error iure maxime quae, quia sunt. Ea nobis quia saepe."}
                className={"pb-16"}
            />
            <div className={"grid grid-cols-4 gap-8 px-20"}>
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
                        />
                    ))
                }
            </div>
        </section>
    )
}