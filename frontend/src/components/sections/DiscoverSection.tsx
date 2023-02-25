import {useSelector} from "react-redux";
import {selectArticles} from "../../redux/selector";
import {DiscoverCard} from "./DiscoverCard";
import {sortByProperty} from "../../utils";
import {NotFoundPlaceholder, TitleBanner} from "../common";

/**
 * DiscoverSection component.
 *
 * This component displays a list of articles in a grid, sorted by date in descending order.
 *
 * @returns {ReactNode} The rendered component.
 */
export const DiscoverSection = () => {
    // Get articles from global redux state
    const articles = useSelector(selectArticles);

    // Sort articles by date in descending order
    let showArticles = [...articles];
    sortByProperty(showArticles, "date", "DESC");

    // Get only the number of articles that want to display in the slider
    showArticles = showArticles.slice(0, 3);

    return (
        <section className={"mb-20 relative pb-12"}>
            <TitleBanner
                title={"Descubre"}
                subtitle={
                    "¡Bienvenido a la sección Descubre de Tulipann Store! Aquí encontrarás una serie de artículos interesantes y educativos sobre nuestros productos y la fabricación de los mismos. Si te interesa conocer más sobre cómo se crean los productos que usamos en nuestro día a día, esta es la sección perfecta para ti. Mantente al tanto de nuestras actualizaciones y no te pierdas ninguna noticia interesante. ¡Ven y descubre con nosotros!"
                }
                className={"pb-16"}
            />
            <div
                className={
                    "h-[450px] flex flex-col md:flex-row gap-16 md:gap-6 lg:gap-8 px-12 md:px-8 lg:px-20 items-center justify-center"
                }
            >
                {
                    // Check if there are articles to display.
                    // If there are, render the DiscoverCard component for each article.
                    // If there aren't, render the NotFoundPlaceholder component.
                    articles.length > 0 ?
                        showArticles.map((article) => (
                            <DiscoverCard
                                id={article.id}
                                title={article.title}
                                summary={article.summary}
                                banner={article.banner}
                                date={article.date}
                                author={article.author}
                                tags={article.tags.map((tag) => tag.name)}
                                key={article.id}
                                className={"w-full lg:w-80"}
                            />
                        ))

                        : <NotFoundPlaceholder message={"Parece que no hay articulos disponibles"}/>
                }
            </div>
        </section>
    );
};

