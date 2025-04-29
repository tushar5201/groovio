import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch("https://api.themoviedb.org/3/discover/movie?certification=IN&include_adult=true&include_video=false&language=en-US&page=1&primary_release_year=2025&primary_release_date.lte=2025-04-26&region=IN&sort_by=primary_release_date.desc&with_origin_country=IN&with_original_language=hi", {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODI1NDNkMDU5NmMyYmJmYzhiNWY3NzNmMmRjMTgwYiIsIm5iZiI6MTcyOTc0OTU2My4yMjYwMTksInN1YiI6IjY3MTkzNjFhMzRjMGZhYmQ2ODFjNDAwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BBgXdtJ4snsHMWSo1Lq4-oLACC0ELWKKE_XwAvbfO4A`
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
