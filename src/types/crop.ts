
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
    buyPriceBase: number;
    buyPriceBronze: number;
    buyPriceSilver: number;
    buyPriceGold: number;
    buyPriceOsmium: number;
    seedPrice: number;
}

export interface CalculatorInput {
    townRank: TownRankValue;
    season: SeasonValue;
    currentDay: number;
    farmSize: number;
    // targetQuality?: CropQuality;
}

export type CropQuality = "Base" | "Bronze" | "Silver" | "Gold" | "Osmium";

export interface CalculatorOutput {
    crop: Crop

    // Plant
    plantCount: number;
    seedCostTotal: number;

    // Time
    growthTime: number;
    harvestCount: number;
    remainingDays: number;

    // Financial
    revenuePerHarvest: number;
    totalRevenue: number;
    netProfit: number;
}

