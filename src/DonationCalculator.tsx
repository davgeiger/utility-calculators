import { useState } from "react"

export default function DonationCalculator() {
  const [minutes, setMinutes] = useState("")

  function calculateDonation() {
    if (minutes.trim() === "") return ""

    const euro = Number(minutes) / 6
    return euro.toFixed(2)
  }

  return (
    <>
      <div className="mx-auto flex max-w-2xl flex-col gap-2 p-2 text-black">
        <p>Hinweis: 60 Minuten = 10€</p>
        <div className="flex gap-2">
          <input
            className="rounded-md border border-black p-1"
            type="text"
            id="minutes"
            value={minutes}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "")
              setMinutes(value)
            }}
          />
          <label htmlFor="minutes">Minuten</label>
        </div>
        <p>entsprechen</p>
        <div className="flex gap-2">
          <p>{minutes === "" ? "00,00" : calculateDonation()}</p>
          <span>€</span>
        </div>
      </div>
    </>
  )
}
