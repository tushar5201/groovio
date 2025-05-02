import { NextResponse } from "next/server";

export async function GET(context: { params: { movieId: string } }) {
    try {
        const { params } = context;
        const movieId = await params.movieId;
        console.log(movieId);

        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
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
