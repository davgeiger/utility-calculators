import { Slider } from "@/components/ui/slider"
import { useEffect, useState } from "react"
import { getVideoDuration } from "./utils/youtube"
import { calculateDuration, formatVideoDuration, parseTime } from "./utils/time"

export default function VideoSpeedCalculator() {
  // Input states
  const [minutes, setMinutes] = useState("")
  const [link, setLink] = useState("")

  // Slider state
  const [speedIndex, setSpeedIndex] = useState(1)

  // Time state
  const [duration, setDuration] = useState<number | null>(null)

  useEffect(() => {
    if (!link.trim()) {
      setDuration(null)
      return
    }

    const timeout = setTimeout(async () => {
      try {
        const result = await getVideoDuration(link)
        setDuration(result || null)
      } catch (error) {
        console.error(error)
        setDuration(null)
      }
    }, 500)

    return () => clearTimeout(timeout)
  }, [link])

  // Either seconds come from minute or yt input
  const totalSeconds = parseTime(minutes) ?? duration

  const calculatedTime =
    totalSeconds !== null
      ? formatVideoDuration(calculateDuration(totalSeconds, speedIndex))
      : ""

  return (
    <div className="m-2 flex flex-col gap-2 text-black">
      <div className="flex flex-col gap-2">
        <div className="grid gap-2">
          <label htmlFor="minutes">Minuten</label>
          <input
            className="rounded-md border border-black p-1 transition-colors disabled:cursor-not-allowed disabled:border-red-400 disabled:bg-gray-500 disabled:text-red-300 disabled:opacity-100"
            type="text"
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            placeholder="NN:NN"
            disabled={link !== ""}
          />
        </div>

        <p>oder</p>

        <div className="grid gap-2">
          <label htmlFor="link">Youtube-Link</label>
          <input
            className="rounded-md border border-black p-1 transition-colors disabled:cursor-not-allowed disabled:border-red-400 disabled:bg-gray-500 disabled:text-red-300 disabled:opacity-100"
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=xyz"
            disabled={minutes !== ""}
          />
        </div>
      </div>

      <Slider
        min={1}
        max={2}
        step={0.25}
        value={speedIndex}
        onValueChange={(value) => setSpeedIndex(value as number)}
      />

      <p className="text-center">{speedIndex}x</p>

      <p>{calculatedTime}</p>
    </div>
  )
}
