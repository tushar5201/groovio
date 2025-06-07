import { NextRequest, NextResponse } from "next/server";

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
        const date = new Date();
        const res = await fetch(`https://api.themoviedb.org/3/discover/movie?certification=IN&include_adult=true&include_video=false&language=en-US&page=1&primary_release_year=${date.getFullYear()}&sort_by=primary_release_date.desc&vote_average.gte=5&with_original_language=hi&year=${date.getFullYear()}`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_KEY}`
            },
            cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch TMDB data");

        const data = await res.json();
        return new NextResponse(JSON.stringify(data), {
            status: 200,
            headers: responseHeaders
        });
    } catch (error) {
        console.error("API Route Error:", error);
        return new NextResponse(JSON.stringify({ error: "Unable to fetch data" }), { status: 500, headers: responseHeaders });
    }
}
