import { durationToSeconds } from "./time"

function getVideoId(url: string) {
  const parsedUrl = new URL(url)

  // https://youtu.be/abc123
  if (parsedUrl.hostname === "youtu.be") {
    return parsedUrl.pathname.slice(1)
  }

  // https://www.youtube.com/watch?v=abc123
  return parsedUrl.searchParams.get("v")
}

export async function getVideoDuration(videoUrl: string) {
  if (!videoUrl) return ""

  const videoId = getVideoId(videoUrl)

  if (!videoId) {
    throw new Error("Ungültige YouTube-URL")
  }

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${apiKey}`
  )

  const data = await response.json()

  console.log(response.status)
  console.log(data)

  if (!response.ok) {
    throw new Error("API-Anfrage fehlgeschlagen")
  }

  return durationToSeconds(data.items[0].contentDetails.duration)
}
