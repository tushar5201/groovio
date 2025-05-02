import { NextResponse, type NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { movieId: string } }) {
    try {
        const { movieId } = params;
        
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_KEY}`
            },
            cache: "no-store",
        });

        if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);

        const data = await res.json();
        return NextResponse.json(data);
        
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json(
            { error: "Unable to fetch data" }, 
            { status: 500 }
        );
    }
}