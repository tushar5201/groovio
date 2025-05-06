import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const parts = pathname.split('/');
    const seriesId = parts[parts.length - 1]; // gets the [movieId] from /api/get-movie-details/[movieId]

    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/videos?language=en-US`,
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
