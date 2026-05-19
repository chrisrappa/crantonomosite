export const dynamic = "force-dynamic";

async function getLatestShorts(channelId, apiKey, maxResults) {
	const url = new URL("https://youtube.googleapis.com/youtube/v3/search");
	url.searchParams.set("part", "snippet");
	url.searchParams.set("channelId", channelId);
	url.searchParams.set("type", "video");
	url.searchParams.set("videoDuration", "short");
	url.searchParams.set("order", "date");
	url.searchParams.set("maxResults", String(maxResults));
	url.searchParams.set("key", apiKey);

	const res = await fetch(url, { cache: "no-store" });

	if (!res.ok) {
		throw new Error(`Failed to fetch shorts: ${res.status}`);
	}

	const data = await res.json();

	return {
		videos: (data.items || []).map((item) => ({
			id: item.id.videoId,
			videoId: item.id.videoId,
			title: item.snippet.title,
			description: item.snippet.description,
			thumbnail:
				item.snippet.thumbnails?.medium?.url ||
				item.snippet.thumbnails?.default?.url ||
				"",
			url: `https://www.youtube.com/shorts/${item.id.videoId}`,
			publishedAt: item.snippet.publishedAt,
		})),
		nextPageToken: data.nextPageToken || null,
		totalAvailable: data.pageInfo?.totalResults || 0,
	};
}

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	void searchParams;
	const limit = 12;

	const channelId = process.env.CRANTONOMO_YOUTUBE_CHANNEL_ID || "";
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
		const result = await getLatestShorts(channelId, apiKey, limit);

		return Response.json({
			videos: result.videos,
			hasMore: Boolean(result.nextPageToken),
			nextPageToken: result.nextPageToken,
			totalAvailable: result.totalAvailable,
		});
	} catch (error) {
		return Response.json(
			{ error: error.message || "Unexpected error while fetching shorts" },
			{ status: 500 }
		);
	}
}
