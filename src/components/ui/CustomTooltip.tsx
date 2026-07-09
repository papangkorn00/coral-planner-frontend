/* eslint-disable @typescript-eslint/no-explicit-any */
export const CustomTooltip = ({active, payload, label}: any) => {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload

    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg font-coral-reef">
        <p className="font-bold text-lg">{label}</p>

        <div className="flex flex-col gap-2 text-sm min-w-[200px]">
          {/* Net Profit */}
          <div className="flex items-center gap-1.5 border-b pb-2 mb-2">
            <p className="text-green-600 font-bold text-base">
              Net Profit: {data.netProfit?.toLocaleString()}
            </p>
            <img
              src="/images/game-images/in-game-coin.png"
              loading="lazy"
              alt=""
              aria-hidden="true"
              className="h-5 w-5"
            />
          </div>

          <ul className="flex flex-col gap-1 list-none p-0 m-0">
            <li className="text-gray-800 font-semibold mb-1">Farming Stats</li>
            <li className="text-gray-600">
              Available Season(s): {data.crop.seasons.join(", ")}
            </li>
            <li className="text-gray-600">
              Growth Time: {data.growthTime} days
            </li>
            <li className="text-gray-600">
              Max Harvests: {data.possibleHarvestCount} times
            </li>
            <li className="text-gray-600">
              Regrowth Time: {data.crop.regrowthTimeDay} days
            </li>
          </ul>

          {/* Costs */}
          <ul className="flex flex-col gap-1 border-t pt-2 list-none p-0 m-0">
            <li className="text-gray-800 font-semibold mb-1">Costs</li>
            <li className="flex items-center gap-1.5 text-gray-600">
              Seed Price: {data.seedCostTotal}
              <img
                src="/images/game-images/in-game-coin.png"
                loading="lazy"
                alt=""
                aria-hidden="true"
                className="h-3 w-3"
              />
            </li>
          </ul>

          {/* Sell Prices */}
          <ul className="flex flex-col gap-1 border-t pt-2 list-none p-0 m-0">
            <li className="text-gray-800 font-semibold mb-1">Sell Prices</li>
            <li className="flex items-center gap-1.5 text-gray-600">
              Base Price: {data.priceBase}
              <img
                src="/images/game-images/in-game-coin.png"
                loading="lazy"
                alt=""
                aria-hidden="true"
                className="h-3 w-3"
              />
            </li>
            <li className="flex items-center gap-1.5 text-amber-700">
              Bronze: {data.priceBronze}
              <img
                src="/images/game-images/in-game-coin.png"
                loading="lazy"
                alt=""
                aria-hidden="true"
                className="h-3 w-3"
              />
            </li>
            <li className="flex items-center gap-1.5 text-slate-400">
              Silver: {data.priceSilver}
              <img
                src="/images/game-images/in-game-coin.png"
                loading="lazy"
                alt=""
                aria-hidden="true"
                className="h-3 w-3"
              />
            </li>
            <li className="flex items-center gap-1.5 text-yellow-500">
              Gold: {data.priceGold}
              <img
                src="/images/game-images/in-game-coin.png"
                loading="lazy"
                alt=""
                aria-hidden="true"
                className="h-3 w-3"
              />
            </li>
            <li className="flex items-center gap-1.5 text-purple-500 font-medium">
              Osmium: {data.priceOsmium}
              <img
                src="/images/game-images/in-game-coin.png"
                loading="lazy"
                alt=""
                aria-hidden="true"
                className="h-3 w-3"
              />
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
