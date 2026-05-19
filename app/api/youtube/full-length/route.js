export const dynamic = "force-dynamic";

async function getPlaylistItems(playlistId, apiKey, pageToken = "") {
  const url = new URL("https://youtube.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("part", "snippet,contentDetails");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("maxResults", "50");
  url.searchParams.set("key", apiKey);
  if (pageToken) {
    url.searchParams.set("pageToken", pageToken);
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    console.log("Failed to fetch playlist items:", res.status, await res.text());
    throw new Error(`Failed to fetch playlist items: ${res.status}`);
  }

  return await res.json();
}

export async function GET() {
  const channelId = process.env.CRANTONOMO_YOUTUBE_CHANNEL_ID || "";
  const offset = Math.max(0, Number.parseInt("0", 10));
  const requestedLimit = Number.parseInt("8", 10);
  const limit = Number.isNaN(requestedLimit)
    ? 8
    : Math.min(Math.max(requestedLimit, 1), 200);

  const apiKey = process.env.CRANTONOMO_YOUTUBE_AUTH || "";

  if (!channelId) {
    return Response.json(
      { error: "Missing CRANTONOMO_YOUTUBE_CHANNEL_ID environment variable" },
      { status: 500 }
    );
  }

  if (!apiKey) {
    return Response.json(
      { error: "Missing CRANTONOMO_YOUTUBE_AUTH environment variable" },
      { status: 500 }
    );
  }

  try {
    const uploadsPlaylistId = 'PLI7RpNPA5bNAzXGlULb5RU4WFU_KYXWy3';

    const videos = [];
    let pageToken = "";
    let totalProcessed = 0;

    while (videos.length < offset + limit) {
      const data = await getPlaylistItems(uploadsPlaylistId, apiKey, pageToken);
      const items = data.items || [];

      if (items.length === 0) {
        break;
      }

      for (const item of items) {
        const videoId = item.snippet.resourceId.videoId;

          videos.push({
            id: videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail:
              item.snippet.thumbnails?.high?.url ||
              item.snippet.thumbnails?.default?.url ||
              "",
            publishedAt: item.contentDetails.videoPublishedAt,
            url: `https://www.youtube.com/watch?v=${videoId}`,
          });
        
      }

      totalProcessed += items.length;

      // If we have enough videos or no more pages, break
      if (!data.nextPageToken) {
        break;
      }

      pageToken = data.nextPageToken;

      // Safeguard to avoid excessive processing
      if (totalProcessed > 500) {
        break;
      }
    }

    const paginatedVideos = videos.slice(offset, offset + limit);

    return Response.json({
      videos: paginatedVideos,
      hasMore: videos.length > offset + limit,
      nextOffset: videos.length > offset + limit ? offset + limit : null,
      totalAvailable: videos.length,
    });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unexpected error while fetching videos" },
      { status: 500 }
    );
  }
}
