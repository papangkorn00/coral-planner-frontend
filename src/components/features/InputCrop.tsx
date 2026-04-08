import {Button} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {SEASON, TOWN_RANKS, type CalculatorInput, } from "@/types/crop"
import {ChevronDown} from "lucide-react"
import {Input} from "@/components/ui/input"
import {FieldLabel, Field} from "@/components/ui/field"
import {RotateCcw } from "lucide-react";

type InputCropProps = {
  onClearInputFields: () => void
  inputData: CalculatorInput
  onUpdateInput: (
    key: keyof CalculatorInput,
    value: CalculatorInput[keyof CalculatorInput],
  ) => void
}

const InputCrop = ({onClearInputFields ,inputData, onUpdateInput}: InputCropProps) => {
  const currentRank = TOWN_RANKS.find((rank) => rank.value === inputData.townRank,)
  const currentSeason = SEASON.find((season) => season.value === inputData.season,)

  return (
    <div className="col-span-6 col-start-4 z-10 mt-10">
      <div className="flex justify-center-safe items-center-safe tracking-wide gap-x-16 bg-(--bg-section) rounded-4xl p-6">
        {/* Town Ranks */}
        <Field className="gap-2">
          <FieldLabel htmlFor="input-town-rank" className="font-coral-reef">
            Town Rank
          </FieldLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex justify-between w-[100px]"
              >
                {currentRank?.value}
                <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent id="input-town-rank" className="w-[100px]">
              {TOWN_RANKS.map((rank) => (
                <DropdownMenuItem
                  key={rank.value}
                  onSelect={() => onUpdateInput("townRank", rank.value)}
                >
                  {rank.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </Field>
        {/* Season */}
        <Field className="gap-2">
          <FieldLabel htmlFor="input-current-day" className="font-coral-reef">
            Season
          </FieldLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex justify-between w-[100px]"
              >
                {currentSeason?.value}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent id="input-current-day" className="w-[100px]">
              {SEASON.map((season) => (
                <DropdownMenuItem
                  key={season.value}
                  onSelect={() => onUpdateInput("season", season.label)}
                >
                  {season.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </Field>
        {/* Current Day */}
        <Field className="gap-2">
          <FieldLabel htmlFor="input-current-day" className="font-coral-reef">
            Current Day
          </FieldLabel>
          <Input
            className="w-[100px] bg-white"
            id="input-current-day"
            type="number"
            defaultValue={1}
            min={1}
            max={28}
            value={inputData.currentDay}
            onChange={(e) =>
              onUpdateInput("currentDay", parseInt(e.target.value) || 1)
            }
          ></Input>
        </Field>
        {/* Farm size */}
        <Field className="gap-2">
          <FieldLabel htmlFor="input-farm-size" className="font-coral-reef">
            Farm Size
          </FieldLabel>
          <Input
            className="w-[100px] bg-white"
            id="input-farm-size"
            type="number"
            defaultValue={1}
            min={1}
            value={inputData.farmSize}
            onChange={(e) => onUpdateInput("farmSize", parseInt(e.target.value) || 1)}
          ></Input>
        </Field>
        
        <Button className="cursor-pointer" size="icon" variant="destructive" onClick={onClearInputFields}>
          <RotateCcw />
        </Button>
      </div>
    </div>
  )
}

export default InputCrop
