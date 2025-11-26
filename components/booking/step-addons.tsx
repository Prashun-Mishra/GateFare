"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ShieldCheck, ShieldAlert, Crown, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AddonsSelection {
    flexibleTicket: boolean
    cancellation: "none" | "flexible" | "any_reason"
    premiumService: boolean
}

interface StepAddonsProps {
    selection: AddonsSelection
    onChange: (selection: AddonsSelection) => void
}

export function StepAddons({ selection, onChange }: StepAddonsProps) {
    const updateField = (field: keyof AddonsSelection, value: any) => {
        onChange({ ...selection, [field]: value })
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Enhance your trip</h2>
                <p className="text-slate-500">Personalize your flight now with our special add-ons for that extra peace of mind.</p>
            </div>

            {/* Flexible Ticket */}
            <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <ShieldCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Flexible Ticket</h3>
                        <span className="text-xs font-bold text-blue-600 uppercase">Recommended</span>
                    </div>
                </div>

                <p className="text-sm text-slate-600">
                    Enjoy the freedom to change your flight up to 3 days before departure — no penalties!
                </p>

                <ul className="text-sm text-slate-600 space-y-2 bg-slate-50 p-4 rounded-lg">
                    <li className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        Change to another flight with the same airline for free (subject to availability)
                    </li>
                    <li className="flex gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        You only pay the difference if the new flight is more expensive
                    </li>
                </ul>

                <RadioGroup
                    value={selection.flexibleTicket ? "flexible" : "restricted"}
                    onValueChange={(v) => updateField("flexibleTicket", v === "flexible")}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                >
                    <div className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all relative",
                        !selection.flexibleTicket ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900" : "hover:bg-slate-50"
                    )}>
                        <div className="flex items-start gap-3">
                            <RadioGroupItem value="restricted" id="flex-restricted" className="mt-1" />
                            <div>
                                <Label htmlFor="flex-restricted" className="font-bold cursor-pointer block">Restricted</Label>
                                <p className="text-xs text-slate-500 mt-1">Best if you’re certain you won’t need to change flights.</p>
                            </div>
                        </div>
                    </div>

                    <div className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all relative",
                        selection.flexibleTicket ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" : "hover:bg-slate-50"
                    )}>
                        <div className="flex items-start gap-3">
                            <RadioGroupItem value="flexible" id="flex-flexible" className="mt-1 text-blue-600 border-blue-600" />
                            <div>
                                <div className="flex justify-between items-center w-full gap-2">
                                    <Label htmlFor="flex-flexible" className="font-bold cursor-pointer block text-blue-900">Flexible</Label>
                                    <span className="font-bold text-slate-900">+$45</span>
                                </div>
                                <p className="text-xs text-blue-700 mt-1">Best if you want the freedom to change plans — no penalty fees.</p>
                            </div>
                        </div>
                    </div>
                </RadioGroup>
            </div>

            {/* Cancellation Protection */}
            <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <ShieldAlert className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Cancellation Protection</h3>
                        <p className="text-xs text-slate-500">Receive 100% refund if you cancel for any of the reasons below</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Flight disruption</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Sickness, accident or injury</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Mechanical breakdown</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-600" /> Home emergency</div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 py-2">
                    <div className="flex text-blue-500">★★★★★</div>
                    <span>Refund Protect has a 5 star rating on Trustpilot based on 20,000+ reviews</span>
                </div>

                <RadioGroup
                    value={selection.cancellation}
                    onValueChange={(v) => updateField("cancellation", v)}
                    className="space-y-3"
                >
                    <div className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all",
                        selection.cancellation === "any_reason" ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" : "hover:bg-slate-50"
                    )}>
                        <div className="flex items-start gap-3">
                            <RadioGroupItem value="any_reason" id="cancel-any" className="mt-1 text-blue-600 border-blue-600" />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <Label htmlFor="cancel-any" className="font-bold cursor-pointer text-slate-900">Cancel for any reason</Label>
                                    <span className="font-bold text-slate-900">+$65</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1">
                                    90% back as travel voucher — no proof needed, use it for your next trip.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all",
                        selection.cancellation === "flexible" ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" : "hover:bg-slate-50"
                    )}>
                        <div className="flex items-start gap-3">
                            <RadioGroupItem value="flexible" id="cancel-flex" className="mt-1 text-blue-600 border-blue-600" />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <Label htmlFor="cancel-flex" className="font-bold cursor-pointer text-slate-900">Cancel with a reason</Label>
                                    <span className="font-bold text-slate-900">+$37</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1">
                                    Full cash refund if you can show proof for one of the valid reasons above.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all",
                        selection.cancellation === "none" ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900" : "hover:bg-slate-50"
                    )}>
                        <div className="flex items-start gap-3">
                            <RadioGroupItem value="none" id="cancel-none" className="mt-1" />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <Label htmlFor="cancel-none" className="font-bold cursor-pointer text-slate-900">No protection</Label>
                                    <span className="text-slate-500">Free</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">
                                    I accept my ticket is non-refundable.
                                </p>
                            </div>
                        </div>
                    </div>
                </RadioGroup>
            </div>

            {/* Premium Service */}
            <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-lg">
                        <Crown className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Premium Service</h3>
                </div>

                <RadioGroup
                    value={selection.premiumService ? "premium" : "standard"}
                    onValueChange={(v) => updateField("premiumService", v === "premium")}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <div className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all",
                        !selection.premiumService ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900" : "hover:bg-slate-50"
                    )}>
                        <div className="flex items-start gap-3">
                            <RadioGroupItem value="standard" id="prem-std" className="mt-1" />
                            <div>
                                <Label htmlFor="prem-std" className="font-bold cursor-pointer block">No premium benefits</Label>
                                <p className="text-xs text-slate-500 mt-1">Changes follow standard airline rules — expect possible extra costs and slower support.</p>
                            </div>
                        </div>
                    </div>

                    <div className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all",
                        selection.premiumService ? "border-amber-500 bg-amber-50 ring-1 ring-amber-500" : "hover:bg-slate-50"
                    )}>
                        <div className="flex items-start gap-3">
                            <RadioGroupItem value="premium" id="prem-plus" className="mt-1 text-amber-600 border-amber-600" />
                            <div>
                                <div className="flex justify-between items-center w-full gap-2">
                                    <Label htmlFor="prem-plus" className="font-bold cursor-pointer block text-amber-900">Premium Service</Label>
                                    <span className="font-bold text-slate-900">+$12</span>
                                </div>
                                <p className="text-xs text-amber-800 mt-1">Enjoy stress-free changes, priority support, and zero service fees — get the fastest help when you need it most.</p>
                            </div>
                        </div>
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}

import { CheckCircle2 } from "lucide-react"
