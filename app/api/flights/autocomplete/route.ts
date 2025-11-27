import { NextResponse } from 'next/server';
import Amadeus from 'amadeus';
import amadeus from '@/lib/amadeus';
import { mapAmadeusLocationToAirport } from '@/lib/amadeus-helpers';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query || query.length < 2) {
        return NextResponse.json({ airports: [] });
    }

    try {
        console.log("[Autocomplete] Searching for:", query);
        const response = await amadeus.referenceData.locations.get({
            keyword: query,
            subType: Amadeus.location.any,
            page: { limit: 10 }
        });

        const airports = response.data.map(mapAmadeusLocationToAirport);
        return NextResponse.json({ airports });
    } catch (error) {
        console.error("Amadeus Autocomplete Error:", error);
        const amadeusError = error as any;
        console.error("Error details:", {
            description: amadeusError.description,
            code: amadeusError.code,
            response: amadeusError.response
        });
        return NextResponse.json(
            { error: "Failed to fetch airports", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
