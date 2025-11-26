"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ChevronRight, Armchair, X } from "lucide-react"
import type { Flight } from "@/lib/mock-data"

export interface SeatSelection {
    seatNumber: string | null
    price: number
    segments?: { [segmentId: string]: string }
}

interface StepSeatsProps {
    selection: SeatSelection
    onChange: (selection: SeatSelection) => void
    flight?: Flight
    passengerName?: string
}

export function StepSeats({ selection, onChange, flight, passengerName = "Passenger" }: StepSeatsProps) {
    const [activeSegment, setActiveSegment] = useState<string | null>(null)

    // Generate segments based on flight data
    const segments = useMemo(() => {
        if (!flight) return []

        const segs = []
        // Outbound Leg 1
        segs.push({
            id: "out-1",
            from: flight.departure.city,
            to: flight.stops > 0 ? "Istanbul" : flight.arrival.city, // Mock stop for demo if stops > 0
            airline: flight.airline,
            duration: flight.stops > 0 ? "3h 50m" : flight.duration,
            type: "Outbound"
        })

        // Outbound Leg 2 (if stops)
        if (flight.stops > 0) {
            segs.push({
                id: "out-2",
                from: "Istanbul",
                to: flight.arrival.city,
                airline: flight.airline,
                duration: "4h 30m",
                type: "Outbound"
            })
        }

        return segs
    }, [flight])

    // Mock seat map generation
    const rows = 20
    const seatsCols = ["A", "B", "C", "D", "E", "F"]
    const occupied = ["1A", "2C", "3D", "4F", "5B", "10A", "12E", "15C", "18D"]

    const handleSeatClick = (seatId: string, isOccupied: boolean) => {
        if (isOccupied || !activeSegment) return

        const currentSegments = selection.segments || {}
        const isSelected = currentSegments[activeSegment] === seatId

        const newSegments = {
            ...currentSegments,
            [activeSegment]: isSelected ? null : seatId
        }

        // Calculate total price
        // Simple logic: $30 per seat
        const seatCount = Object.values(newSegments).filter(Boolean).length
        const newPrice = seatCount * 30

        // Generate summary string
        const seatSummary = Object.values(newSegments).filter(Boolean).join(", ")

        onChange({
            seatNumber: seatSummary || null,
            price: newPrice,
            segments: newSegments as any
        })
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Pick your perfect seat!</h2>
                <p className="text-slate-500 max-w-md mx-auto">
                    Enjoy your flight by booking the most convenient seats. In case when the seats are not selected the airline will randomly allocate your seats.
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Select seats</h3>

                {segments.map((segment, index) => (
                    <div key={segment.id}>
                        {index === 0 && <div className="text-sm font-bold text-slate-500 mb-2 uppercase">{segment.type}</div>}

                        <div className="bg-white border rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                                    <img
                                        src={`https://placehold.co/100x100/e2e8f0/64748b?text=${segment.airline.charAt(0)}`}
                                        alt={segment.airline}
                                        className="w-8 h-8 object-contain opacity-50"
                                    />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 flex items-center gap-2">
                                        {segment.from} <ChevronRight className="w-4 h-4 text-slate-400" /> {segment.to}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {segment.airline} • {segment.duration}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right hidden sm:block">
                                    <div className="text-sm font-medium text-slate-900">{passengerName}</div>
                                    <div className="text-xs text-slate-500">
                                        {selection.segments?.[segment.id] || "Random seat"}
                                    </div>
                                </div>

                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="border-blue-600 text-blue-600 hover:bg-blue-50"
                                            onClick={() => setActiveSegment(segment.id)}
                                        >
                                            Edit Seats
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent
                                        side="right"
                                        className="w-full sm:max-w-md overflow-y-auto overscroll-contain"
                                        data-lenis-prevent="true"
                                    >
                                        <SheetHeader className="mb-6">
                                            <SheetTitle>Select Seat for {segment.from} to {segment.to}</SheetTitle>
                                        </SheetHeader>

                                        <div className="flex justify-center gap-4 text-sm mb-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded border bg-white" />
                                                <span>Available</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded bg-blue-600" />
                                                <span>Selected</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded bg-slate-200" />
                                                <span>Occupied</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-center mb-8">
                                            <div className="w-48 h-16 bg-slate-100 rounded-t-[50%] border-t-4 border-slate-200 flex items-end justify-center pb-2 text-slate-400 text-xs uppercase tracking-widest">
                                                Cockpit
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center gap-3 pb-20">
                                            {Array.from({ length: rows }).map((_, rowIndex) => {
                                                const rowNum = rowIndex + 1
                                                return (
                                                    <div key={rowNum} className="flex items-center gap-6">
                                                        <div className="flex gap-1">
                                                            {seatsCols.slice(0, 3).map(col => {
                                                                const seatId = `${rowNum}${col}`
                                                                const isOccupied = occupied.includes(seatId)
                                                                const isSelected = selection.segments?.[segment.id] === seatId

                                                                return (
                                                                    <button
                                                                        key={seatId}
                                                                        disabled={isOccupied}
                                                                        onClick={() => handleSeatClick(seatId, isOccupied)}
                                                                        className={cn(
                                                                            "w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg border transition-all flex items-center justify-center text-xs font-medium relative group",
                                                                            isOccupied
                                                                                ? "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed"
                                                                                : isSelected
                                                                                    ? "bg-blue-600 border-blue-600 text-white shadow-md -mt-1"
                                                                                    : "bg-white border-slate-300 hover:border-blue-400 hover:bg-blue-50 text-slate-600"
                                                                        )}
                                                                    >
                                                                        {col}
                                                                        {isSelected && <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[8px] px-1 rounded-full">✓</div>}
                                                                    </button>
                                                                )
                                                            })}
                                                        </div>

                                                        <div className="w-4 text-center text-xs text-slate-300 font-mono">
                                                            {rowNum}
                                                        </div>

                                                        <div className="flex gap-1">
                                                            {seatsCols.slice(3).map(col => {
                                                                const seatId = `${rowNum}${col}`
                                                                const isOccupied = occupied.includes(seatId)
                                                                const isSelected = selection.segments?.[segment.id] === seatId

                                                                return (
                                                                    <button
                                                                        key={seatId}
                                                                        disabled={isOccupied}
                                                                        onClick={() => handleSeatClick(seatId, isOccupied)}
                                                                        className={cn(
                                                                            "w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg border transition-all flex items-center justify-center text-xs font-medium relative group",
                                                                            isOccupied
                                                                                ? "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed"
                                                                                : isSelected
                                                                                    ? "bg-blue-600 border-blue-600 text-white shadow-md -mt-1"
                                                                                    : "bg-white border-slate-300 hover:border-blue-400 hover:bg-blue-50 text-slate-600"
                                                                        )}
                                                                    >
                                                                        {col}
                                                                        {isSelected && <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[8px] px-1 rounded-full">✓</div>}
                                                                    </button>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-sm text-amber-800">
                <div className="mt-0.5">⚠️</div>
                <p>
                    Free random seats will be assigned, but you could be split up or stuck in less comfortable spots.
                    <strong> Reserve now as the best seats may be gone soon.</strong>
                </p>
            </div>
        </div>
    )
}
