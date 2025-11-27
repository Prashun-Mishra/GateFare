import { NextResponse } from 'next/server';
import amadeus from '@/lib/amadeus';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { flightOffer } = body;

        if (!flightOffer) {
            return NextResponse.json(
                { error: "Missing flight offer data" },
                { status: 400 }
            );
        }

        // Call Amadeus SeatMap Display API
        console.log("Fetching seat map for flight offer:", flightOffer.id);
        const payload = {
            data: [flightOffer]
        };
        // console.log("SeatMap Payload:", JSON.stringify(payload, null, 2));

        const response = await amadeus.shopping.seatmaps.post(JSON.stringify(payload));

        return NextResponse.json({ seatMaps: response.data });
    } catch (error) {
        console.error("Amadeus SeatMap Error:", error);
        const amadeusError = error as any;

        // If Amadeus returns error code 141 (SYSTEM ERROR), it typically means
        // seat map data is not available for this flight in the test environment
        const isSystemError = amadeusError?.description?.some((d: any) => d.code === 141);

        if (isSystemError) {
            return NextResponse.json(
                {
                    error: "Seat map not available",
                    message: "Seat selection is not available for this flight. This may occur with test flights in the Amadeus test API.",
                    unavailable: true
                },
                { status: 200 } // Return 200 so frontend can handle gracefully
            );
        }

        return NextResponse.json(
            {
                error: "Failed to fetch seat map",
                details: amadeusError.description ? amadeusError.description.map((d: any) => d.detail).join(', ') : (error instanceof Error ? error.message : String(error))
            },
            { status: 500 }
        );
    }
}
