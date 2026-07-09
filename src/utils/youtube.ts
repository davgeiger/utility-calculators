import { durationToSeconds } from "./time"

function getVideoId(url: string) {
  try {
    const parsedUrl = new URL(url.trim())

    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1)
    }

    return parsedUrl.searchParams.get("v")
  } catch {
    return null
  }
}

export async function getVideoDuration(videoUrl: string): Promise<number> {
  if (!videoUrl) return 0

  const cleanedUrl = videoUrl.trim()
  const videoId = getVideoId(cleanedUrl)

  if (!videoId) {
    throw new Error("Ungültige YouTube-URL")
  }

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${apiKey}`
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error?.message ?? "API-Anfrage fehlgeschlagen")
  }

  if (!data.items?.length) {
    throw new Error("Video nicht gefunden.")
  }

  return durationToSeconds(data.items[0].contentDetails.duration)
}
