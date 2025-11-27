"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ConcentricCircles } from "@/components/concentric-circles"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, CreditCard, Calendar, Plane, Shield, HelpCircle, MessageCircle } from "lucide-react"

export default function HelpCenterPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const categories = [
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: "Booking & Reservations",
            description: "Learn how to search and book flights",
            articles: [
                "How to book a flight",
                "Modifying your booking",
                "Group bookings",
                "Multi-city flights"
            ]
        },
        {
            icon: <CreditCard className="w-6 h-6" />,
            title: "Payments & Pricing",
            description: "Information about payments and refunds",
            articles: [
                "Accepted payment methods",
                "Price guarantees",
                "Refund process",
                "Currency conversion"
            ]
        },
        {
            icon: <Calendar className="w-6 h-6" />,
            title: "Cancellations & Changes",
            description: "Policies for canceling or changing flights",
            articles: [
                "Cancellation policy",
                "Rescheduling flights",
                "Flight exchange options",
                "Refund timelines"
            ]
        },
        {
            icon: <Plane className="w-6 h-6" />,
            title: "Flight Information",
            description: "Everything about your flight experience",
            articles: [
                "Baggage allowance",
                "Seat selection",
                "Check-in process",
                "Flight status updates"
            ]
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Travel Protection",
            description: "Insurance and protection options",
            articles: [
                "Travel insurance",
                "Flexible tickets",
                "Trip cancellation",
                "Medical emergencies"
            ]
        },
        {
            icon: <HelpCircle className="w-6 h-6" />,
            title: "Account & Profile",
            description: "Managing your GateFare account",
            articles: [
                "Creating an account",
                "Password reset",
                "Booking history",
                "Email preferences"
            ]
        }
    ]

    const faqs = [
        {
            question: "What is GateFare?",
            answer: "GateFare is a premium flight inquiry platform that helps you discover and book luxury flights with personalized service. We partner with leading airlines to offer you the best travel experiences."
        },
        {
            question: "How do I book a flight?",
            answer: "Simply enter your departure city, destination, date, and number of passengers on our homepage. Browse available flights, select your preferred option, and complete the booking wizard with passenger details."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, PayPal, and other secure payment methods. All transactions are encrypted and secured."
        },
        {
            question: "Can I cancel or modify my booking?",
            answer: "Yes, you can modify or cancel your booking depending on the airline's fare rules. Flexible ticket options are available for added peace of mind. Contact our support team for assistance."
        },
        {
            question: "How do I select my seat?",
            answer: "During the booking process, you'll have the option to select your preferred seat on the seat selection step. View the aircraft layout and choose from available seats."
        },
        {
            question: "What is your baggage policy?",
            answer: "Baggage allowance varies by airline and ticket type. You can add checked baggage during booking or contact the airline directly for specific policies."
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden pt-16">
                <ConcentricCircles />
                <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto animate-fade-in-up py-12">
                    <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-4">
                        How can we help you?
                    </h1>
                    <p className="text-lg text-slate-600 mb-8">
                        Search our knowledge base or browse categories below
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            type="text"
                            placeholder="Search for help articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-14 text-lg border-blue-200 focus:border-blue-500 shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Browse by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{category.title}</h3>
                            <p className="text-slate-600 text-sm mb-4">{category.description}</p>
                            <ul className="space-y-2">
                                {category.articles.map((article, i) => (
                                    <li key={i} className="text-sm text-slate-600">
                                        • {article}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQs */}
            <section className="bg-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <details
                                key={idx}
                                className="bg-slate-50 rounded-xl border border-blue-100 p-6 group"
                            >
                                <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex items-center justify-between">
                                    {faq.question}
                                    <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="text-slate-600 mt-4 leading-relaxed">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Support */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Our support team is available 24/7 to assist you with any questions or concerns
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                        >
                            Contact Support
                        </a>
                        <a
                            href="mailto:support@gatefare.com"
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                        >
                            Email Us
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
