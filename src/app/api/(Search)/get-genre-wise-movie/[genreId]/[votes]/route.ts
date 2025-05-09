import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const responseHeaders = {
        'Access-Control-Allow-Origin': '*', // or specify your frontend URL instead of *
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    if (request.method === 'OPTIONS') {
        // Handle preflight
        return new NextResponse(null, { status: 204, headers: responseHeaders });
    }

    try {
        const { pathname } = new URL(request.url);
        const parts = pathname.split('/');
        const genreId = parts[parts.length - 2]; // gets the [genreId] from /api/get-genre-wise-movie/[genreId]
        const votes = parts[parts.length - 1]; // gets the [genreId] from /api/get-genre-wise-movie/[genreId]

        const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}&vote_average.gte=${votes}`,
            {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.TMDB_KEY}`,
                },
                cache: 'no-store',
            }
        );

        if (!res.ok) throw new Error('Failed to fetch TMDB data');

        const data = await res.json();
        return new NextResponse(JSON.stringify(data), {
            status: 200,
            headers: responseHeaders,
        });
    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: 'Unable to fetch data' }, { status: 500, headers: responseHeaders });
    }
}
