/* eslint-disable @typescript-eslint/no-explicit-any */
export const CustomTooltip = ({active, payload, label}: any) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload

    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg font-coral-reef">
        <p className="font-bold text-lg">{label}</p>

        {/* Net Profit */}
        <div className="flex flex-col gap-2 text-sm min-w-[200px]">
          <div className="flex items-center gap-1.5 border-b pb-2 mb-2">
            <p className="text-green-600 font-bold text-base">
              Net Profit: {data.netProfit?.toLocaleString()}
            </p>
            <img
              src="/images/crops/in-game-coin.png"
              alt="in-game-coin"
              className="h-5 w-5"
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-gray-800 font-semibold mb-1">Farming Stats</p>
            <p className="text-gray-600">
              Available Season(s): {data.crop.seasons.join(", ")}
            </p>
            {/* Growth Time */}
            <p className="text-gray-600">Growth Time: {data.growthTime} days</p>

            {/* Max Harvest */}
            <p className="text-gray-600">
              Max Harvests: {data.possibleHarvestCount} times
            </p>

            {/* Regrowth Time */}
            <p className="text-gray-600">
              Regrowth Time: {data.crop.regrowthTimeDay} days
            </p>
          </div>

          {/*(Costs & Prices) */}
          <div className="flex flex-col gap-1 border-t pt-2">
            <p className="text-gray-800 font-semibold mb-1">Costs</p>
            <div className="flex items-center gap-1.5">
              <p className="text-gray-600">Seed Price: {data.seedCostTotal}</p>
              <img
                src="/images/crops/in-game-coin.png"
                alt="in-game-coin"
                className="h-3 w-3"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 border-t pt-2">
            <p className="text-gray-800 font-semibold mb-1">Sell Prices</p>
            <div className="flex items-center gap-1.5">
              <p className="text-gray-600">
                Base Price: {data.priceBase}
              </p>
              <img
                src="/images/crops/in-game-coin.png"
                alt="in-game-coin"
                className="h-3 w-3"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <p className="text-amber-700">
                Bronze: {data.priceBronze}
              </p>
              <img
                src="/images/crops/in-game-coin.png"
                alt="in-game-coin"
                className="h-3 w-3"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <p className="text-slate-400">
                Silver: {data.priceSilver}
              </p>
              <img
                src="/images/crops/in-game-coin.png"
                alt="in-game-coin"
                className="h-3 w-3"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <p className="text-yellow-500">Gold: {data.priceGold}</p>
              <img
                src="/images/crops/in-game-coin.png"
                alt="in-game-coin"
                className="h-3 w-3"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <p className="text-purple-500 font-medium">
                Osmium: {data.priceOsmium}
              </p>
              <img
                src="/images/crops/in-game-coin.png"
                alt="in-game-coin"
                className="h-3 w-3"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
