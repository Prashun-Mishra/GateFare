
import { Plane, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Flight } from "@/lib/mock-data"

interface FlightCardProps {
    flight: Flight
    onBook: (flight: Flight) => void
}

export function FlightCard({ flight, onBook }: FlightCardProps) {
    return (
        <div className="bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all p-6 mb-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Airline Info */}
                <div className="flex items-center gap-4 w-full md:w-1/4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                        {flight.airlineCode}
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900">{flight.airline}</h3>
                        <p className="text-xs text-slate-500">{flight.flightNumber}</p>
                    </div>
                </div>

                {/* Flight Times */}
                <div className="flex items-center justify-center gap-8 w-full md:w-2/4">
                    <div className="text-center">
                        <div className="text-xl font-bold text-slate-900">{flight.departure.time}</div>
                        <div className="text-sm text-slate-500">{flight.departure.code}</div>
                    </div>

                    <div className="flex flex-col items-center w-full max-w-[120px]">
                        <div className="text-xs text-slate-400 mb-1">{flight.duration}</div>
                        <div className="relative w-full h-[2px] bg-blue-200">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1">
                                <Plane className="w-4 h-4 text-blue-500 rotate-90" />
                            </div>
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500" />
                        </div>
                        <div className="text-xs text-blue-600 mt-1 font-medium">Direct</div>
                    </div>

                    <div className="text-center">
                        <div className="text-xl font-bold text-slate-900">{flight.arrival.time}</div>
                        <div className="text-sm text-slate-500">{flight.arrival.code}</div>
                    </div>
                </div>

                {/* Price & Action */}
                <div className="flex flex-col items-end gap-3 w-full md:w-1/4 border-t md:border-t-0 md:border-l border-blue-50 pt-4 md:pt-0 md:pl-6">
                    <div className="text-right">
                        <span className="text-sm text-slate-500">from</span>
                        <div className="text-2xl font-bold text-blue-600">
                            ${flight.price.toLocaleString()}
                        </div>
                    </div>
                    <Button
                        onClick={() => onBook(flight)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                        Book Now
                    </Button>
                </div>
            </div>
        </div>
    )
}
