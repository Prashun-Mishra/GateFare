"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { StepPassenger, type PassengerDetails } from "./step-passenger"
import { StepSeats, type SeatSelection } from "./step-seats"
import { StepAddons, type AddonsSelection } from "./step-addons"
import Turnstile from "react-turnstile"
import type { Flight } from "@/lib/mock-data"

interface BookingWizardProps {
    flight: Flight
    passengerCount?: number
    onClose: () => void
}

export function BookingWizard({ flight, passengerCount = 1, onClose }: BookingWizardProps) {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [token, setToken] = useState("")
    const [error, setError] = useState("")

    // Initialize passengers array
    const [passengers, setPassengers] = useState<PassengerDetails[]>(
        Array(passengerCount).fill(null).map(() => ({
            gender: "male",
            firstName: "",
            lastName: "",
            dobDay: "",
            dobMonth: "",
            dobYear: "",
            passport: "",
            email: "",
            countryCode: "+91",
            phone: "",
            baggage: "none",
            ticketExchange: false,
            smsUpdates: false
        }))
    )

    const updatePassenger = (index: number, details: PassengerDetails) => {
        const newPassengers = [...passengers]
        newPassengers[index] = details
        setPassengers(newPassengers)
    }

    const [seats, setSeats] = useState<SeatSelection>({
        seatNumber: null,
        price: 0,
        segments: {}
    })

    const [addons, setAddons] = useState<AddonsSelection>({
        flexibleTicket: false,
        cancellation: "none",
        premiumService: false
    })

    // Calculate Total Price
    const calculateTotal = () => {
        let total = flight.price * passengers.length // Base fare for all passengers

        passengers.forEach(p => {
            if (p.baggage === "add") total += 50
            if (p.ticketExchange) total += 54
            if (p.smsUpdates) total += 6
        })

        total += seats.price // Seat selection is usually per seat, assuming logic handles total seat cost
        if (addons.flexibleTicket) total += 45 * passengers.length
        if (addons.cancellation === "any_reason") total += 65 * passengers.length
        if (addons.cancellation === "flexible") total += 37 * passengers.length
        if (addons.premiumService) total += 12 * passengers.length
        return total
    }

    const handleNext = () => {
        if (step === 1) {
            // Validate all passengers
            const isValid = passengers.every(p => p.firstName && p.lastName) && passengers[0].email
            if (!isValid) {
                setError("Please fill in all required fields for all passengers")
                return
            }
        }
        setError("")
        setStep(step + 1)
    }

    const handleSubmit = async () => {
        if (!token) {
            setError("Please complete the security check")
            return
        }

        setLoading(true)
        try {
            const response = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "booking",
                    flightDetails: {
                        airline: flight.airline,
                        flightNumber: flight.flightNumber,
                        from: flight.departure.city,
                        to: flight.arrival.city,
                        date: new Date().toISOString().split('T')[0],
                        basePrice: flight.price,
                        totalPrice: calculateTotal()
                    },
                    passengers,
                    seats,
                    addons,
                    token
                }),
            })

            if (response.ok) {
                setSuccess(true)
            } else {
                setError("Failed to submit booking. Please try again.")
            }
        } catch (error) {
            console.error("Error submitting booking:", error)
            setError("An unexpected error occurred.")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-500">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
                <p className="text-slate-600 mb-8 max-w-md">
                    Your trip to {flight.arrival.city} is secured. We've sent a confirmation email to {passengers[0].email}.
                </p>
                <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 min-w-[200px]">
                    Done
                </Button>
            </div>
        )
    }

    return (
        <div className="flex h-full">
            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full px-6 pb-6 overflow-hidden">
                {/* Header / Progress */}
                <div className="flex items-center justify-between mb-4 border-b pb-4 shrink-0 pt-6">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500 overflow-x-auto no-scrollbar">
                        <span className={`whitespace-nowrap ${step >= 1 ? "text-blue-600" : ""}`}>Passenger</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                        <span className={`whitespace-nowrap ${step >= 2 ? "text-blue-600" : ""}`}>Seats</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                        <span className={`whitespace-nowrap ${step >= 3 ? "text-blue-600" : ""}`}>Add-ons</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                        <span className={`whitespace-nowrap ${step >= 4 ? "text-blue-600" : ""}`}>Review</span>
                    </div>
                    <div className="lg:hidden text-right ml-4 shrink-0">
                        <p className="text-xs text-slate-500">Total Price</p>
                        <p className="text-xl font-bold text-blue-600">${calculateTotal()}</p>
                    </div>
                </div>

                {/* Content Area */}
                <div
                    className="flex-1 overflow-y-auto overscroll-contain px-1 -mx-1 py-1"
                    data-lenis-prevent="true"
                >
                    {step === 1 && <StepPassenger passengers={passengers} onChange={updatePassenger} />}
                    {step === 2 && <StepSeats selection={seats} onChange={setSeats} flight={flight} passengerName={`${passengers[0].firstName} ${passengers[0].lastName}`} />}
                    {step === 3 && <StepAddons selection={addons} onChange={setAddons} />}

                    {step === 4 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-slate-900">Review Your Trip</h3>
                                <p className="text-slate-500 text-sm mt-1">Please double-check your details before confirming.</p>
                            </div>

                            {/* Flight Summary Card */}
                            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                                <div className="bg-slate-50 px-4 py-3 border-b flex justify-between items-center">
                                    <span className="font-semibold text-slate-700 flex items-center gap-2">
                                        <span className="bg-blue-100 text-blue-600 p-1 rounded-md text-xs font-bold">{flight.airlineCode}</span>
                                        {flight.airline}
                                    </span>
                                    <span className="text-xs text-slate-500 font-mono">{flight.flightNumber}</span>
                                </div>
                                <div className="p-4 grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900">{flight.departure.time}</div>
                                        <div className="text-sm text-slate-500">{flight.departure.city}</div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="text-xs text-slate-400 mb-1">{flight.duration}</div>
                                        <div className="w-24 h-[1px] bg-slate-300 relative">
                                            <div className="absolute -top-1 right-0 w-2 h-2 border-t border-r border-slate-300 rotate-45"></div>
                                        </div>
                                        <div className="text-xs text-blue-600 font-medium mt-1">{flight.stops === 0 ? "Direct" : `${flight.stops} Stop(s)`}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-slate-900">{flight.arrival.time}</div>
                                        <div className="text-sm text-slate-500">{flight.arrival.city}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Passenger & Services Grid */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Passenger Details */}
                                <div className="bg-white border rounded-xl p-4 shadow-sm">
                                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                                        Traveler Details
                                    </h4>
                                    <div className="space-y-3 text-sm">
                                        {passengers.map((p, i) => (
                                            <div key={i} className="border-b pb-2 last:border-0 last:pb-0">
                                                <div className="font-medium text-slate-900">Passenger {i + 1}</div>
                                                <div className="text-slate-600">{p.firstName} {p.lastName}</div>
                                            </div>
                                        ))}
                                        <div>
                                            <span className="text-slate-500 text-xs block">Contact Info</span>
                                            <div className="font-medium text-slate-900 truncate">{passengers[0].email}</div>
                                            <div className="font-medium text-slate-900">{passengers[0].phone}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Selected Services */}
                                <div className="bg-white border rounded-xl p-4 shadow-sm">
                                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                        <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                                        Selected Services
                                    </h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between items-center border-b border-dashed pb-2">
                                            <span className="text-slate-600">Seat Selection</span>
                                            <span className="font-medium text-slate-900">{seats.seatNumber || "Random"}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-dashed pb-2">
                                            <span className="text-slate-600">Baggage</span>
                                            <span className="font-medium text-slate-900 text-right">
                                                {passengers.filter(p => p.baggage === "add").length} Checked (+23kg)
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-dashed pb-2">
                                            <span className="text-slate-600">Flexible Ticket</span>
                                            <span className="font-medium text-slate-900">{addons.flexibleTicket ? "Yes" : "No"}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-dashed pb-2">
                                            <span className="text-slate-600">Cancellation</span>
                                            <span className="font-medium text-slate-900 capitalize">{addons.cancellation.replace("_", " ")}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600">Premium Service</span>
                                            <span className="font-medium text-slate-900">{addons.premiumService ? "Included" : "Not Selected"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Important Info / Disclaimer */}
                            <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg flex gap-2 items-start">
                                <div className="mt-0.5 min-w-[16px]">ℹ️</div>
                                <p>
                                    By clicking "Confirm & Submit", you agree to the airline's Fare Rules and our Terms & Conditions.
                                    Please ensure your passport is valid for at least 6 months beyond your travel date.
                                    Visa requirements are the passenger's responsibility.
                                </p>
                            </div>

                            <div className="flex justify-center py-2">
                                <Turnstile
                                    sitekey="3x00000000000000000000FF"
                                    onVerify={(token) => setToken(token)}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg mt-4 text-center">
                        {error}
                    </div>
                )}

                {/* Footer / Actions */}
                <div className="mt-4 pt-4 border-t flex justify-between shrink-0">
                    {step > 1 ? (
                        <Button variant="outline" onClick={() => setStep(step - 1)}>
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                    ) : (
                        <div /> // Spacer
                    )}

                    {step < 4 ? (
                        <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                            Continue <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 min-w-[150px]"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                                </>
                            ) : (
                                "Confirm & Submit"
                            )}
                        </Button>
                    )}
                </div>
            </div>

            {/* Sidebar (Desktop Only) */}
            <div
                className="hidden lg:flex w-80 bg-slate-50 border-l flex-col h-full overflow-y-auto overscroll-contain"
                data-lenis-prevent="true"
            >
                <div className="p-6 space-y-6">
                    <div className="bg-blue-100 text-blue-800 p-4 rounded-xl text-center">
                        <div className="text-2xl mb-1">🎉</div>
                        <h3 className="font-bold text-lg">You've struck gold!</h3>
                        <p className="text-xs mt-1">Cabin and fare confirmed.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-3">Trip details</h3>
                        <div className="space-y-4">
                            <div className="bg-white p-3 rounded-lg border shadow-sm">
                                <div className="text-xs font-bold text-slate-500 uppercase mb-2">Outbound</div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-bold text-slate-900">{flight.departure.city}</div>
                                        <div className="text-xs text-slate-500">{flight.departure.time}</div>
                                    </div>
                                    <div className="text-slate-300">→</div>
                                    <div className="text-right">
                                        <div className="font-bold text-slate-900">{flight.arrival.city}</div>
                                        <div className="text-xs text-slate-500">{flight.arrival.time}</div>
                                    </div>
                                </div>
                                <div className="mt-2 pt-2 border-t border-dashed flex justify-between text-xs text-slate-500">
                                    <span>{flight.airline}</span>
                                    <span>{flight.duration}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-3">Passengers</h3>
                        <div className="bg-white p-3 rounded-lg border shadow-sm flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                                👤
                            </div>
                            <div>
                                <div className="font-medium text-sm text-slate-900">
                                    {passengers.length} Passenger{passengers.length > 1 ? 's' : ''}
                                </div>
                                <div className="text-xs text-slate-500">Adult</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-3">Price Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-slate-600">
                                <span>Base Fare x {passengers.length}</span>
                                <span>${flight.price * passengers.length}</span>
                            </div>
                            {passengers.some(p => p.baggage === "add") && (
                                <div className="flex justify-between text-slate-600">
                                    <span>Baggage</span>
                                    <span>+${passengers.filter(p => p.baggage === "add").length * 50}</span>
                                </div>
                            )}
                            {passengers.some(p => p.ticketExchange) && (
                                <div className="flex justify-between text-slate-600">
                                    <span>Ticket Exchange</span>
                                    <span>+${passengers.filter(p => p.ticketExchange).length * 54}</span>
                                </div>
                            )}
                            {passengers.some(p => p.smsUpdates) && (
                                <div className="flex justify-between text-slate-600">
                                    <span>SMS Updates</span>
                                    <span>+${passengers.filter(p => p.smsUpdates).length * 6}</span>
                                </div>
                            )}
                            {seats.price > 0 && (
                                <div className="flex justify-between text-slate-600">
                                    <span>Seat Selection</span>
                                    <span>+${seats.price}</span>
                                </div>
                            )}
                            {addons.flexibleTicket && (
                                <div className="flex justify-between text-slate-600">
                                    <span>Flexible Ticket</span>
                                    <span>+${45 * passengers.length}</span>
                                </div>
                            )}
                            {addons.cancellation !== "none" && (
                                <div className="flex justify-between text-slate-600">
                                    <span>Cancellation</span>
                                    <span>+${(addons.cancellation === "any_reason" ? 65 : 37) * passengers.length}</span>
                                </div>
                            )}
                            {addons.premiumService && (
                                <div className="flex justify-between text-slate-600">
                                    <span>Premium Service</span>
                                    <span>+${12 * passengers.length}</span>
                                </div>
                            )}
                            <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg text-slate-900">
                                <span>Total</span>
                                <span className="text-blue-600">${calculateTotal()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
