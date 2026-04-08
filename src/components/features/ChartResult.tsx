import {
  ChartContainer,
  type ChartConfig,
  // ChartTooltip,
  // ChartTooltipContent,
} from "@/components/ui/chart"
import {Bar, BarChart, XAxis, YAxis, Cell, ReferenceLine} from "recharts"
import {CustomXAxisTick} from "./CustomXAxisTick"
import type { CalculatorOutput } from "@/types/crop"

interface ChartResultProps {
  chartData: CalculatorOutput[]
}

const chartConfig = {
  netProfit: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig

const ChartResult = ({chartData}: ChartResultProps) => {
  const maxValue = Math.max(...chartData.map((d) => d.netProfit), 0)
  const step = 10
  const maxTick = Math.ceil(maxValue / step) * step
  const customTicks = Array.from(
    {length: maxTick / step + 1},
    (_, i) => i * step,
  )  

  console.log(chartData);
  

  return (
    <div className="col-span-10 md:col-span-6 col-start-2 md:col-start-4 z-10">
      <div className="bg-(--bg-section) rounded-4xl h-auto p-14">
        <ChartContainer
          config={chartConfig}
          className="w-full h-[200px] sm:h-[350px] md:h-[500px]"
        >
          <BarChart
            margin={{
              bottom: 20,
            }}
            accessibilityLayer
            data={chartData}
          >
            <XAxis
              dataKey="crop.name"
              tickMargin={5}
              // tickFormatter={(value) => value.slice(0, 3)}
              tickLine={false}
              axisLine={false}
              tick={CustomXAxisTick}
            />
            <YAxis
              dataKey="netProfit"
              domain={["dataMin", "auto"]}
              ticks={customTicks}
              label={{
                value: "Net Profits",
                position: "insideLeft",
                dx: 0,
                dy: 30,
                angle: -90,
              }}
            />

            {/* <ChartTooltip content={<ChartTooltipContent />} /> */}
            <ReferenceLine y={0} stroke="#000" />

            <Bar dataKey="netProfit" radius={4}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.netProfit > 0 ? "#22c55e" : "#ef4444"}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

export default ChartResult
