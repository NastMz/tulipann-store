import {BsArrowRightShort} from "react-icons/all";
import {CategoryCard} from "./CategoryCard";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCategories} from "../redux/selector";
import {routes} from "../routes/routes";


export const CategoryPreview = () => {
    const categories = useSelector(selectCategories);
    return (
        <section className={"px-8 h-96 mt-8 md:h-[80vh] md:mt-28 mb-48 md:mb-36"} id={"category"}>
            <div className={"flex py-4 md:py-2 flex-col md:flex-row justify-between items-center gap-3"}>
                <h3 className={"font-bold"}>Explora las categorias</h3>
                <Link to={`${routes.catalog.path}`}
                      className={"font-medium text-sm text-red-600 flex justify-end items-center"}>
                    <span>Ver todas las categorias</span> <BsArrowRightShort size={20}/>
                </Link>
            </div>
            <div className={"grid grid-cols-2 grid-rows-2 gap-4 h-full"}>
                <CategoryCard
                    img={categories[1].img}
                    title={categories[1].name}
                    className={"col-span-2 md:col-span-1 md:row-span-2"}
                    to={`${routes.catalog.path}/${categories[1].id}`}
                />
                <CategoryCard
                    img={categories[2].img}
                    title={categories[2].name}
                    to={`${routes.catalog.path}/${categories[2].id}`}
                />
                <CategoryCard
                    img={categories[3].img}
                    title={categories[3].name}
                    to={`${routes.catalog.path}/${categories[3].id}`}
                />
            </div>
        </section>
    )
}
