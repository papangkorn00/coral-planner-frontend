import { type CalculatorInput, type CalculatorOutput, type Crop, type CropQuality, type CropQualityValues } from "@/types/crop";

export const getRemainingDays = (currentDay: number, seasonLength: number = 28) => {
    return seasonLength - currentDay
}

export const calculateHarvestCount = (growthTime: number, regrowthTime: number, remainingDays: number) => {
    // ปลูกพืชนั้นไม่ได้เพราะว่า วันใน Season นั้นไม่พอ
    if (remainingDays < growthTime) return 0;
    // ปลูกได้ 1 ครั้ง
    if (regrowthTime === 0) return 1
    // ปลูกได้มากกว่า 1 ครั้ง
    const daysAfterFirstHarvest = remainingDays - growthTime
    const regrowthResult = 1 + Math.floor(daysAfterFirstHarvest / regrowthTime)

    return regrowthResult
}

// Total Cost of seedPrice * farmSize
export const calculateTotalCost = (seedPrice: number, farmSize: number) => {
    return seedPrice * farmSize
}

export const calculateRevenue = (pricePerItem: CropQualityValues, harvestCount: number, farmSize: number, yieldPerHarvest: number = 1) => {
    // return pricePerItem * harvestCount * farmSize * yieldPerHarvest;
    const totalItems = harvestCount * farmSize * yieldPerHarvest;
    return {
        base: pricePerItem.base * totalItems,
        bronze: pricePerItem.bronze * totalItems,
        silver: pricePerItem.silver * totalItems,
        gold: pricePerItem.gold * totalItems,
        osmium: pricePerItem.osmium * totalItems,
    };
}

export const calculateProfit = (revenue: number, cost: number): number => {
    return revenue - cost;
}

export const helperGetPriceByQuality = (crop: Crop, quality: CropQuality) => {
    switch (quality) {
        case "Bronze":
            return crop.sellPriceBronze;
        case "Silver":
            return crop.sellPriceSilver;
        case "Gold":
            return crop.sellPriceGold;
        case "Osmium":
            return crop.sellPriceOsmium;
        case "Base":
        default:
            return crop.sellPriceBase;
    }
}

// Main Calculate
export const calculateCrop = (crop: Crop, input: CalculatorInput): CalculatorOutput => {
    const { currentDay, farmSize } = input;
    const remainingDays = getRemainingDays(currentDay)
    const possibleHarvestCount = calculateHarvestCount(crop.growthTimeDay, crop.regrowthTimeDay, remainingDays)

    // Seed Cost
    const seedCostTotal = calculateTotalCost(crop.seedPrice, farmSize)
    // Sell Price Per Item
    const sellPrices = {
        base: helperGetPriceByQuality(crop, "Base"),
        bronze: helperGetPriceByQuality(crop, "Bronze"),
        silver: helperGetPriceByQuality(crop, "Silver"),
        gold: helperGetPriceByQuality(crop, "Gold"),
        osmium: helperGetPriceByQuality(crop, "Osmium"),
    };
    // Total Revenue
    const totalRevenues = calculateRevenue(sellPrices, possibleHarvestCount, farmSize)
    // Profits
    const netProfits = {
        base: totalRevenues.base - seedCostTotal,
        bronze: totalRevenues.bronze - seedCostTotal,
        silver: totalRevenues.silver - seedCostTotal,
        gold: totalRevenues.gold - seedCostTotal,
        osmium: totalRevenues.osmium - seedCostTotal,
    };

    return {
        crop,
        // plantCount: farmSize,
        seedCostTotal,
        growthTime: crop.growthTimeDay,
        possibleHarvestCount,
        remainingDays,
        // revenuePerHarvest: sellPricePerItem * farmSize, // รายได้ต่อการเก็บ 1 รอบ
        // totalRevenue,
        priceBase: sellPrices.base * farmSize,
        priceBronze: sellPrices.bronze * farmSize,
        priceSilver: sellPrices.silver * farmSize,
        priceGold: sellPrices.gold * farmSize,
        priceOsmium: sellPrices.osmium * farmSize,
        netProfit: netProfits.base,
        netProfitBronze: netProfits.bronze,
        netProfitSilver: netProfits.silver,
        netProfitGold: netProfits.gold,
        netProfitOsmium: netProfits.osmium,
    }
}
