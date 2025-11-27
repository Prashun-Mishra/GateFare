"use client"

import Link from "next/link"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ConcentricCircles } from "@/components/concentric-circles"
import { Navbar } from "@/components/navbar"
import { Mail, Phone, MapPin } from "lucide-react"

export default function FAQPage() {
    const faqs = [
        {
            category: "Booking & Reservations",
            items: [
                {
                    question: "How do I book a flight?",
                    answer: "You can book a flight by using our search widget on the homepage. Enter your departure and destination cities, select your travel dates, and click 'Search Flights'. Choose your preferred flight and click 'Book Now' to submit an enquiry.",
                },
                {
                    question: "Can I change my booking after confirmation?",
                    answer: "Yes, changes can be made subject to airline policies and fare rules. Please contact our support team with your booking reference number for assistance.",
                },
                {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards, bank transfers, and select digital wallets. Payment details will be provided once your booking enquiry is confirmed.",
                },
            ],
        },
        {
            category: "Travel & Baggage",
            items: [
                {
                    question: "What is the baggage allowance?",
                    answer: "Baggage allowance varies by airline and class of service. Generally, Economy class includes 23kg checked baggage, while Business and First class offer higher allowances. Specific details will be provided with your ticket.",
                },
                {
                    question: "Do I need a visa for my destination?",
                    answer: "Visa requirements depend on your nationality and destination. We recommend checking with the respective embassy or consulate before traveling. Our team can provide general guidance but cannot process visas.",
                },
            ],
        },
        {
            category: "Support & Services",
            items: [
                {
                    question: "How can I contact customer support?",
                    answer: "Our support team is available 24/7. You can reach us via email at support@gatefare.com, call us at +1 (555) 123-4567, or use the contact form on our website.",
                },
                {
                    question: "Do you offer travel insurance?",
                    answer: "Yes, we can arrange comprehensive travel insurance for your trip. Please mention this in your enquiry or ask our travel consultant during the booking process.",
                },
            ],
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-white">
            <Navbar />

            <section className="relative min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-50">
                    <ConcentricCircles />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
                        <p className="text-lg text-slate-600">Find answers to common questions about your journey with Gatefare</p>
                    </div>

                    <div className="space-y-12">
                        {faqs.map((section, idx) => (
                            <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 pl-2 border-l-4 border-blue-500">
                                    {section.category}
                                </h2>
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                                    <Accordion type="single" collapsible className="w-full">
                                        {section.items.map((item, itemIdx) => (
                                            <AccordionItem key={itemIdx} value={`${idx}-${itemIdx}`} className="px-6 border-blue-100">
                                                <AccordionTrigger className="text-left text-slate-900 font-medium hover:text-blue-600 hover:no-underline py-4">
                                                    {item.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-slate-600 leading-relaxed pb-4">
                                                    {item.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                        <p className="text-slate-600 mb-6">Still have questions? We're here to help.</p>
                        <div className="flex justify-center gap-4">
                            <Link href="/contact">
                                <div className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block">
                                    Contact Support
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section >

            <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <h3 className="text-2xl font-bold text-blue-400 mb-4">Gatefare</h3>
                            <p className="text-slate-400 text-sm">Your premium gateway to world-class travel experiences</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                                <li><Link href="/enquiry" className="hover:text-blue-400 transition-colors">Enquiry</Link></li>
                                <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                                <li><Link href="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Support</h4>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
                                <li><Link href="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Contact</h4>
                            <div className="space-y-3 text-slate-400 text-sm">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-blue-400" />
                                    <span>support@gatefare.com</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-blue-400" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-800 pt-8">
                        <p className="text-center text-slate-400 text-sm">© 2025 Gatefare. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div >
    )
}
