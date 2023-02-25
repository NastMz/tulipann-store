import {BsArrowRightShort} from "react-icons/bs";
import {CategoryCard} from "./CategoryCard";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCategories} from "../../redux/selector";
import {routes} from "../../config/routes";
import {NotFoundPlaceholder} from "../common";

/**
 * CategoryPreview component.
 *
 * This component displays a preview of categories, including a title and links to individual id pages.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const CategoryPreview = (): JSX.Element => {
    // Select categories from store
    const categories = useSelector(selectCategories);

    // Slice categories array to get first 3 categories
    const categoriesToShow = categories.slice(0, 3);

    return (
        <section
            className={
                "px-8 h-96 mt-0 lg:mt-8 md:h-[80vh] mb-36"
            }
            id={"category"}
        >
            {/* Title and link to catalog */}
            <div className={
                "flex py-4 md:py-2 flex-col md:flex-row justify-between items-center gap-3"
            }>
                <h3 className={"font-bold text-xl"}>
                    Explora las categorias
                </h3>
                <Link
                    to={`${routes.catalog.path}`}
                    className={
                        "font-medium text-sm text-red-600 flex justify-end items-center"
                    }
                >
                    <span>Ver todas las categorias</span>{" "}
                    <BsArrowRightShort size={20}/>
                </Link>
            </div>
            {/* Category cards */}

            {
                // Check if categories are loaded
                categories.length > 0
                    ? (
                        <div className={"grid grid-cols-2 grid-rows-2 gap-4 h-full"}>
                            {
                                categoriesToShow.map((category) => (
                                    <CategoryCard
                                        img={category.image}
                                        title={category.name}
                                        className={
                                            "col-span-2 md:col-span-1 md:row-span-2"
                                        }
                                        to={`${routes.catalog.path}/${category.id}`}
                                    />
                                ))
                            }
                        </div>
                    )
                    : <NotFoundPlaceholder message={"Parece que no hay categorias disponibles"}/>
            }
        </section>
    );
};
