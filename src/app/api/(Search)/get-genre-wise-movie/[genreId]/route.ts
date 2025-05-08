import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { pathname } = new URL(request.url);
        const parts = pathname.split('/');
        const genreId = parts[parts.length - 1]; // gets the [genreId] from /api/get-genre-wise-movie/[genreId]

        const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
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
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json({ error: 'Unable to fetch data' }, { status: 500 });
    }
}
