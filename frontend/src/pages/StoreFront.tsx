import {CategoryPreview, DiscoverSlider, Hero, PromoSection} from "../components";


export const StoreFront = () => {
    return (
        <>
            <Hero/>
            <CategoryPreview/>
            <DiscoverSlider articlesToDisplay={6}/>
            <PromoSection/>
        </>
    )
}