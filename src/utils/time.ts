const timeRegex = /^\d+:[0-5]\d$/
const minutesRegex = /^\d+$/
const ytRegex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/

export function durationToSeconds(duration: string) {
  const match = duration.match(ytRegex)

  if (!match) return 0

  const [, hours, minutes, seconds] = match

  return (
    Number(hours ?? 0) * 3600 + Number(minutes ?? 0) * 60 + Number(seconds ?? 0)
  )
}

export function parseTime(input: string): number | null {
  input = input.trim()

  // Eingabe wie "10"
  if (minutesRegex.test(input)) {
    return Number(input) * 60
  }

  // Eingabe wie "05:30"
  if (timeRegex.test(input)) {
    const [minutes, seconds] = input.split(":").map(Number)
    return minutes * 60 + seconds
  }

  return null
}

export function calculateDuration(totalSeconds: number, speed: number): number {
  return Math.round(totalSeconds / speed)
}

export function formatVideoDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

export function formatDonationDuration(totalSeconds: number) {
  totalSeconds = Math.round(totalSeconds)
  const totalMinutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  // Bis einschließlich 60 Minuten: MM:SS
  if (totalMinutes <= 60) {
    return `${totalMinutes}:${String(seconds).padStart(2, "0")}`
  }

  // Ab 61 Minuten: HH:MM:SS
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

export function minutesToSeconds(minutes: number) {
  return minutes * 60
}

export function secondsToMinutes(seconds: number) {
  return seconds / 60
}

export function donationFromSeconds(seconds: number) {
  return (seconds / 60 / 6).toFixed(2)
}

export function secondsFromDonation(euro: number) {
  return Math.round(euro * 6 * 60)
}

export function parseEuro(input: string) {
  return Number(input.replace(",", "."))
}
