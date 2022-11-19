import {Product} from "../models";

export function getTotalCustomerCount(item: Product) {
    return item.feedback.length;
}

function getTotalCustomerCountPerRate(item: Product) {
    let totalOneStar = 0;
    let totalTwoStars = 0;
    let totalThreeStars = 0;
    let totalFourStars = 0;
    let totalFiveStars = 0;

    item.feedback.forEach((rate) => {
        switch (rate.rate) {
            case 1:
                totalOneStar += 1;
                break;
            case 2:
                totalTwoStars += 1;
                break;
            case 3:
                totalThreeStars += 1;
                break;
            case 4:
                totalFourStars += 1;
                break;
            case 5:
                totalFiveStars += 1;
                break;
        }
    });

    return {
        totalOneStar: totalOneStar,
        totalTwoStars: totalTwoStars,
        totalThreeStars: totalThreeStars,
        totalFourStars: totalFourStars,
        totalFiveStars: totalFiveStars
    }
}

export function getRateMean(item: Product) {
    let totalCustomers = getTotalCustomerCount(item);

    let {
        totalOneStar,
        totalTwoStars,
        totalThreeStars,
        totalFourStars,
        totalFiveStars
    } = getTotalCustomerCountPerRate(item);

    let mean = (totalOneStar + totalTwoStars*2 + totalThreeStars*3 + totalFourStars*4 + totalFiveStars*5) / totalCustomers;

    return Math.round(mean);
}

export function getPercentPerRate(item: Product) {
    let totalCustomers = getTotalCustomerCount(item);

    let {
        totalOneStar,
        totalTwoStars,
        totalThreeStars,
        totalFourStars,
        totalFiveStars
    } = getTotalCustomerCountPerRate(item);

    return {
        oneStarPercent: Math.round(((totalOneStar) / totalCustomers)*100),
        twoStarsPercent: Math.round(((totalTwoStars) / totalCustomers)*100),
        threeStarsPercent: Math.round(((totalThreeStars) / totalCustomers)*100),
        fourStarsPercent: Math.round(((totalFourStars) / totalCustomers)*100),
        fiveStarsPercent: Math.round(((totalFiveStars) / totalCustomers)*100),
    }
}