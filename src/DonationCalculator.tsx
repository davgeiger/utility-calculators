import { useState } from "react"
import {
  donationFromSeconds,
  formatDonationDuration,
  parseEuro,
  parseTime,
  secondsFromDonation,
} from "./utils/time"

export default function DonationCalculator() {
  const [minutes, setMinutes] = useState("")
  const [euro, setEuro] = useState("")

  const amount = euro === "" ? 0 : parseEuro(euro)
  const totalSeconds = secondsFromDonation(amount)
  const timeLabel = totalSeconds > 3600 ? "Stunden" : "Minuten"

  return (
    <>
      <div className="flex max-w-2xl flex-col gap-2 p-2 text-black">
        <p>Hinweis: 60 Minuten = 10€</p>
        <div className="flex gap-2">
          {/* Minute input */}
          <input
            className="rounded-md border border-black p-1"
            type="text"
            id="minutes"
            value={minutes}
            onChange={(e) => {
              const value = e.target.value
              setMinutes(value)

              if (value === "") {
                setEuro("")
                return
              }

              const totalSeconds = parseTime(value)

              if (totalSeconds === null) {
                setEuro("")
                return
              }

              setEuro(donationFromSeconds(totalSeconds))
            }}
            placeholder="MM / MM:SS"
          />
          <label htmlFor="minutes">{timeLabel}</label>
        </div>

        <div className="flex gap-2">
          {/* Euro input */}
          <input
            className="rounded-md border border-black p-1"
            type="text"
            id="euro"
            value={euro}
            onChange={(e) => {
              const value = e.target.value.replace(".", ",") // Punkt ebenfalls akzeptieren

              setEuro(value)

              if (value === "") {
                setMinutes("")
                return
              }

              const amount = parseEuro(value)

              if (Number.isNaN(amount)) {
                setMinutes("")
                return
              }

              const totalSeconds = secondsFromDonation(amount)

              setMinutes(formatDonationDuration(totalSeconds))
            }}
            placeholder="10 / 10.5 / 10,5"
          />
          <label htmlFor="euro">€</label>
        </div>
      </div>
    </>
  )
}
