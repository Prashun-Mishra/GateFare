import { NextResponse } from 'next/server';
import { searchFlights } from '@/lib/mock-data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');

    if (!from || !to || !date) {
        return NextResponse.json(
            { error: "Missing required parameters: from, to, date" },
            { status: 400 }
        );
    }

    try {
        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 1000));

        const flights = await searchFlights(from, to, date);
        return NextResponse.json({ flights });
    } catch (error) {
        console.error("Flight search error:", error);
        return NextResponse.json(
            { error: "Failed to fetch flights" },
            { status: 500 }
        );
    }
}
