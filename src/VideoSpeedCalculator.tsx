import { Slider } from "@/components/ui/slider"
import { useState } from "react"

const timeRegex = /^\d{1,2}:\d{2}$/

function calculateNewTime(minutes: string, speedIndex: number) {
  if (!timeRegex.test(minutes)) return ""

  const [min, seconds] = minutes.split(":").map(Number)

  const totalSeconds = min * 60 + seconds
  const roundedTotalSeconds = Math.round(totalSeconds / speedIndex)
  const newMinutes = Math.floor(roundedTotalSeconds / 60)
  const newSeconds = roundedTotalSeconds % 60

  const formattedMinutes = String(newMinutes).padStart(2, "0")
  const formattedSeconds = String(newSeconds).padStart(2, "0")

  return `${formattedMinutes}:${formattedSeconds}`
}

export default function VideoSpeedCalculator() {
  const [minutes, setMinutes] = useState("")
  const [speedIndex, setSpeedIndex] = useState(1)

  return (
    <>
      <div className="m-2 flex flex-col gap-2 text-black">
        <div className="flex gap-2">
          <input
            className="rounded-md border border-black p-1"
            type="text"
            id="minutes"
            value={minutes}
            onChange={(e) => {
              setMinutes(e.target.value)
            }}
            placeholder="NN:NN"
          />
          <label htmlFor="minutes">Minuten</label>
        </div>
        <Slider
          min={1}
          max={2}
          step={0.25}
          value={speedIndex}
          onValueChange={(value) => setSpeedIndex(value as number)}
        />
        <p className="text-center">{speedIndex}</p>
        <p>{calculateNewTime(minutes, speedIndex)}</p>
      </div>
    </>
  )
}
