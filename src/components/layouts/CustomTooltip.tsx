/* eslint-disable @typescript-eslint/no-explicit-any */
export const CustomTooltip = ({active, payload, label}: any) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload

    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg font-coral-reef">
        <div className="flex items-center gap-2 mb-2">
          <img
            src="/images/crops/in-game-coin.png"
            alt="in-game-coin"
            className="h-6 w-6"
          />
          <p className="font-bold text-lg">{label}</p>
        </div>

        {/* Net Profit */}
        <div className="flex flex-col gap-3 text-sm min-w-[200px]">
          <p className="text-green-600 font-bold text-base border-b pb-2">
            Net Profit: {data.netProfit?.toLocaleString()} G
          </p>

          <div className="flex flex-col gap-1">
            <p className="text-gray-800 font-semibold mb-1">Farming Stats</p>
            <p className="text-gray-600">Growth Time: {data.growthTime} days</p>

            {/* regrowthTime */}
            {data.regrowthTimeDay > 0 && (
              <p className="text-gray-600">
                Regrowth Time: {data.regrowthTimeDay} days
              </p>
            )}

            <p className="text-gray-600">
              Max Harvests: {data.harvestCount} times
            </p>
          </div>

          {/*(Costs & Prices) */}
          <div className="flex flex-col gap-1 border-t pt-2">
            <p className="text-gray-800 font-semibold mb-1">Costs & Prices</p>
            <p className="text-gray-600">Seed Price: {data.seedPrice} G</p>
            <p className="text-gray-600">Base Price: {data.buyPriceBase} G</p>

            {/* แอบใส่สีให้เข้ากับระดับคุณภาพพืชในเกม */}
            <p className="text-amber-700">Bronze: {data.buyPriceBronze} G</p>
            <p className="text-slate-400">Silver: {data.buyPriceSilver} G</p>
            <p className="text-yellow-500">Gold: {data.buyPriceGold} G</p>
            <p className="text-purple-500 font-medium">
              Osmium: {data.buyPriceOsmium} G
            </p>
          </div>
        </div>
      </div>
    )
  }
}
