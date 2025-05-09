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
        const query = parts[parts.length - 1];

        const res = await fetch(
            `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-US&page=1`,
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
