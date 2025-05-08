// app/video/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Video Player',
    description: 'Watch the embedded video content',
}

export default async function VideoPage({ params }: { params: Promise<{ seriesId: string, season: string, episode: string }> }) {
    const { seriesId, season, episode } = await params;
    return (
        <div className="w-full max-h-screen bg-gray-900 p-4">

            {/* <div className="aspect-video w-full overflow-hidden rounded-lg shadow-2xl"> */}
            <iframe
                src={`https://www.2embed.cc/embedtv/${seriesId}&s=${season}&e=${episode}`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                className="w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Embedded Video"
            />
            {/* </div> */}

        </div>
    )
}