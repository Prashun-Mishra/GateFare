"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"

export function PromoPopup() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Show popup after 2 seconds
        const timer = setTimeout(() => {
            // Check if already shown in this session (optional, commented out for testing)
            // const hasShown = sessionStorage.getItem("promoPopupShown")
            // if (!hasShown) {
            setIsOpen(true)
            // sessionStorage.setItem("promoPopupShown", "true")
            // }
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden bg-transparent border-none shadow-none">
                <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
                    {/* Close Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </Button>

                    {/* Ad Content */}
                    <div className="flex flex-col md:flex-row min-h-[500px]">
                        {/* Image Section */}
                        <div className="relative w-full h-64 md:h-auto md:w-1/2 bg-blue-900">
                            <Image
                                src="/promo-ad-generated.png"
                                alt="Special Offer"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Text/Action Section */}
                        <div className="p-12 md:w-1/2 flex flex-col justify-center bg-white relative">
                            <div className="absolute top-6 right-6 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                Limited Time
                            </div>

                            <DialogHeader>
                                <DialogTitle className="text-3xl font-bold text-slate-900 mb-2">
                                    Upgrade Your Journey
                                </DialogTitle>
                            </DialogHeader>

                            <p className="text-slate-600 mb-6 text-lg">
                                Experience travel like never before. Unlock exclusive premium benefits for your next flight.
                            </p>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-slate-700">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">✓</div>
                                    <span>Access to Premium Airport Lounges</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-700">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">✓</div>
                                    <span>Priority Boarding & Check-in</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-700">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">✓</div>
                                    <span>Extra Baggage Allowance (23kg)</span>
                                </li>
                            </ul>

                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white w-full h-12 text-lg font-semibold shadow-lg shadow-blue-200"
                                onClick={() => setIsOpen(false)}
                            >
                                Claim Offer Now
                            </Button>

                            <p className="text-xs text-slate-400 mt-4 text-center">
                                *Offer valid until Sunday. Terms and conditions apply.
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
