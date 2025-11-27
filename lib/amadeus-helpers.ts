import { Flight, Airport } from './mock-data';

export interface Seat {
    number: string;
    cabin: string;
    availabilityStatus: string;
    coordinates?: {
        x: number;
        y: number;
    };
    price?: number;
}

export interface Row {
    number: string;
    seats: Seat[];
}

export interface Deck {
    deckType: string;
    rows: Row[];
}

export interface SeatMap {
    id: string;
    flightOfferId: string;
    segmentId: string;
    decks: Deck[];
}

// Helper to format duration from PT2H30M to 2h 30m
export function formatDuration(duration: string): string {
    if (!duration) return "";

    // Remove PT
    let time = duration.replace('PT', '');

    // Parse hours
    let hours = "";
    if (time.includes('H')) {
        const parts = time.split('H');
        hours = parts[0] + "h";
        time = parts[1] || "";
    }

    // Parse minutes
    let minutes = "";
    if (time.includes('M')) {
        minutes = time.replace('M', '') + "m";
    }

    return `${hours} ${minutes}`.trim();
}

export function mapAmadeusLocationToAirport(location: any): Airport {
    return {
        code: location.iataCode,
        city: location.address.cityName,
        name: location.name,
        country: location.address.countryName
    };
}

export function mapAmadeusFlightToFlight(offer: any, dictionaries: any): Flight {
    const itinerary = offer.itineraries[0];
    const segment = itinerary.segments[0];
    const lastSegment = itinerary.segments[itinerary.segments.length - 1];

    const airlineCode = segment.carrierCode;
    const airlineName = dictionaries.carriers[airlineCode] || airlineCode;

    // Calculate total stops (segments - 1)
    const stops = itinerary.segments.length - 1;

    return {
        id: offer.id,
        airline: airlineName,
        airlineCode: airlineCode,
        flightNumber: `${airlineCode}${segment.number}`,
        departure: {
            city: dictionaries.locations[segment.departure.iataCode]?.cityCode || segment.departure.iataCode,
            code: segment.departure.iataCode,
            time: segment.departure.at.split('T')[1].substring(0, 5)
        },
        arrival: {
            city: dictionaries.locations[lastSegment.arrival.iataCode]?.cityCode || lastSegment.arrival.iataCode,
            code: lastSegment.arrival.iataCode,
            time: lastSegment.arrival.at.split('T')[1].substring(0, 5)
        },
        duration: formatDuration(itinerary.duration),
        price: parseFloat(offer.price.total),
        currency: offer.price.currency,
        stops: stops,
        seatsAvailable: offer.numberOfBookableSeats,
        rawOffer: offer
    };
}
