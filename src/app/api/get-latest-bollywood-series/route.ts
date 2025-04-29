import { NextResponse } from "next/server";

export async function GET() {
    try {
        const date = new Date();
        const res = await fetch(`https://api.themoviedb.org/3/discover/tv?air_date.lte=${date.toISOString().slice(0, 10)}&include_adult=true&include_null_first_air_dates=false&language=en-US&page=1&sort_by=first_air_date.desc&vote_average.gte=1&with_origin_country=IN&with_original_language=hi`, {
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
