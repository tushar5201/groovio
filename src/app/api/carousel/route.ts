import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://api.themoviedb.org/3/discover/movie?certification=IN&include_adult=true&include_video=false&language=en-US&page=1&primary_release_year=2025&sort_by=vote_average.desc&with_original_language=hi", {
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
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("API Route Error:", error);
        return new NextResponse(JSON.stringify({ error: "Unable to fetch data" }), { status: 500 });
    }
}
