const timeRegex = /^\d{1,2}:\d{2}$/

export function durationToSeconds(duration: string) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)

  if (!match) return 0

  const [, hours, minutes, seconds] = match

  return (
    Number(hours ?? 0) * 3600 + Number(minutes ?? 0) * 60 + Number(seconds ?? 0)
  )
}

export function parseTime(input: string): number | null {
  if (!timeRegex.test(input)) return null

  const [minutes, seconds] = input.split(":").map(Number)

  return minutes * 60 + seconds
}

export function calculateDuration(totalSeconds: number, speed: number): number {
  return Math.round(totalSeconds / speed)
}

export function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}
