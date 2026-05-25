
export const TOWN_RANKS = [
    { label: "F", value: "F" },
    { label: "E", value: "E" },
    { label: "D", value: "D" },
    { label: "C", value: "C" },
    { label: "B", value: "B" },
    { label: "A", value: "A" },
    { label: "S", value: "S" },
]

export const SEASON = [
    { label: "Spring", value: "Spring" },
    { label: "Summer", value: "Summer" },
    { label: "Fall", value: "Fall" },
    { label: "Winter", value: "Winter" },
]

export type TownRankValue = (typeof TOWN_RANKS)[number]["value"];
export type SeasonValue = (typeof SEASON)[number]["value"]
export type Seasons = "Spring" | "Summer" | "Fall" | "Winter";


export interface Crop {
    id: number;
    name: string;
    seasons: Seasons;
    townRank: TownRankValue;
    growthTimeDay: number;
    regrowthTimeDay: number;
    possibleMaxHarvestDay: number;
    imageURL: string;
    sellPriceBase: number;
    sellPriceBronze: number;
    sellPriceSilver: number;
    sellPriceGold: number;
    sellPriceOsmium: number;
    seedPrice: number;
}

export interface CalculatorInput {
    townRank: TownRankValue;
    season: SeasonValue;
    currentDay: number;
    farmSize: number;
}

export type CropQuality = "Base" | "Bronze" | "Silver" | "Gold" | "Osmium";
export interface CropQualityValues {
    base: number;
    bronze: number;
    silver: number;
    gold: number;
    osmium: number;
}

export interface CalculatorOutput {
    crop: Crop
    seedCostTotal: number;
    growthTime: number;
    possibleHarvestCount: number;
    remainingDays: number;
    revenuePerHarvest?: number;
    totalRevenue?: number;
    priceBase: number,
    priceBronze: number,
    priceSilver: number,
    priceGold: number,
    priceOsmium: number,
    netProfit: number,
    netProfitBronze: number,
    netProfitSilver: number,
    netProfitGold: number,
    netProfitOsmium: number,
}

