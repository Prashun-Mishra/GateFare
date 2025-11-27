import { NextResponse } from 'next/server';
import amadeus from '@/lib/amadeus';
import { mapAmadeusFlightToFlight } from '@/lib/amadeus-helpers';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');
    const passengers = searchParams.get('passengers') || '1';

    if (!from || !to || !date) {
        return NextResponse.json(
            { error: "Missing required parameters: from, to, date" },
            { status: 400 }
        );
    }

    // Extract airport code from format "City (CODE)" if necessary
    const originCode = from.includes('(') ? from.match(/\(([^)]+)\)/)?.[1] || from : from;
    const destinationCode = to.includes('(') ? to.match(/\(([^)]+)\)/)?.[1] || to : to;

    try {
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: originCode,
            destinationLocationCode: destinationCode,
            departureDate: date,
            adults: passengers,
            max: 10
        });

        const flights = response.data.map((offer: any) => mapAmadeusFlightToFlight(offer, response.result.dictionaries));
        return NextResponse.json({ flights });
    } catch (error) {
        console.error("Amadeus Flight Search Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch flights" },
            { status: 500 }
        );
    }
}
