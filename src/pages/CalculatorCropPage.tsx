import Title from "@/components/layouts/Title"
import ChartResult from "@/components/features/ChartResult"
import InputCrop from "@/components/features/InputCrop"
import {useEffect, useState, useMemo} from "react"
import {TOWN_RANKS, type CalculatorInput, type Crop} from "@/types/crop"
import {getCrops} from "@/api/api"
import {calculateCrop} from "@/utils/calculateCrop"

const CalculatorCropPage = () => {
  const [crops, setCrops] = useState<Crop[]>([])
  const [inputs, setInputs] = useState<CalculatorInput>({
    townRank: "F",
    season: "Spring",
    currentDay: 1,
    farmSize: 5,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCrops()
        setCrops(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const chartDataCalculate = useMemo(() => {
    return crops
      .filter((season) => season.seasons.includes(inputs.season))
      .filter((rank) => {
        const inputRank = TOWN_RANKS.findIndex(
          (i) => i.value === inputs.townRank,
        )
        const cropRank = TOWN_RANKS.findIndex((i) => i.value === rank.townRank)
        return inputRank >= cropRank
      })
      .map((crop) => calculateCrop(crop, inputs))
      .filter((count) => count.harvestCount > 0)
      .sort((a, b) => b.netProfit - a.netProfit)
  }, [crops, inputs])

  const handleInputs = (
    key: keyof CalculatorInput,
    value: CalculatorInput[keyof CalculatorInput],
  ) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  console.log(inputs)

  const clearInputFields = () =>{
    setInputs(() => ({
      townRank: "F",
      season: "Spring",
      currentDay: 1,
      farmSize: 5,
    }))
  }



  return (
    <div className="relative min-h-screen bg-island-main bg-cover bg-center bg-fixed bg-no-repeat">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-lg backdrop-brightness-75"></div>
      <div className="grid grid-cols-12">
        <Title />

        <ChartResult chartData={chartDataCalculate} />
        <InputCrop onClearInputFields={clearInputFields} inputData={inputs} onUpdateInput={handleInputs} />
      </div>
    </div>
  )
}

export default CalculatorCropPage
