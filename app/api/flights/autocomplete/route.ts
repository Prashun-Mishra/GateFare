
import { NextResponse } from 'next/server';
import { searchAirports } from '@/lib/mock-data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query || query.length < 2) {
        return NextResponse.json({ airports: [] });
    }

    try {
        const airports = await searchAirports(query);
        return NextResponse.json({ airports });
    } catch (error) {
        console.error("Airport search error:", error);
        return NextResponse.json(
            { error: "Failed to fetch airports" },
            { status: 500 }
        );
    }
}
