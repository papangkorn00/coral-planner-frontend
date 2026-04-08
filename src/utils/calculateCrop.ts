import { type CalculatorInput, type CalculatorOutput, type Crop, type CropQuality } from "@/types/crop";

// Remaining Days = 28 - currentDay + 1 รวมวันปัจจุบัน
export const getRemainingDays = (currentDay: number, seasonLength: number = 28) => {
    return seasonLength - currentDay + 1
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

export const calculateRevenue = (pricePerItem: number, harvestCount: number, farmSize: number, yieldPerHarvest: number = 1) => {
    return pricePerItem * harvestCount * farmSize * yieldPerHarvest;
}

export const helperGetPriceByQuality = (crop: Crop, quality: CropQuality) => {
    switch (quality) {
        case "Bronze":
            return crop.buyPriceBronze;
        case "Silver":
            return crop.buyPriceSilver;
        case "Gold":
            return crop.buyPriceGold;
        case "Osmium":
            return crop.buyPriceOsmium;
        case "Base":
        default:
            return crop.buyPriceBase;
    }
}

export const calculateProfit = (revenue: number, cost: number): number => {
    return revenue - cost;
}

// Main Calculate
export const calculateCrop = (crop: Crop, input: CalculatorInput): CalculatorOutput => {
    const { currentDay, farmSize } = input;
    const remainingDays = getRemainingDays(currentDay)
    const harvestCount = calculateHarvestCount(crop.growthTimeDay, crop.regrowthTimeDay, remainingDays)

    // Seed Cost
    const seedCostTotal = calculateTotalCost(crop.seedPrice, farmSize)
    // Sell Price Per Item
    const sellPricePerItem = helperGetPriceByQuality(crop, 'Base')
    // Total
    const totalRevenue = calculateRevenue(sellPricePerItem, harvestCount, farmSize)
    // Profits
    const netProfit = calculateProfit(totalRevenue, seedCostTotal);

    return {
        crop,
        plantCount: farmSize,
        seedCostTotal,
        growthTime: crop.growthTimeDay,
        harvestCount,
        remainingDays,
        revenuePerHarvest: sellPricePerItem * farmSize, // รายได้ต่อการเก็บ 1 รอบ
        totalRevenue,
        netProfit,
    }
}
