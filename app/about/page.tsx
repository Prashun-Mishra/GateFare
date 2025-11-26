"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Award, Users, Globe, Zap, Mail, Phone } from "lucide-react"
import { Plane } from "lucide-react"



import { ConcentricCircles } from "@/components/concentric-circles"
import { Navbar } from "@/components/navbar"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-white">
      {/* ... existing navigation ... */}
      <Navbar />

      {/* Hero Section with Half Concentric Circle Animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <ConcentricCircles />

        <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            About <span className="text-blue-600">Gatefare</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto font-light">
            Redefining luxury travel with personalized service and curated experiences across the globe
          </p>
        </div>
      </section>

      {/* ... existing mission section ... */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              Gatefare was founded with a singular vision: to transform the way people experience luxury travel. We
              believe that every journey should be more than just transportation—it should be an unforgettable
              experience tailored to your unique preferences.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our team of dedicated travel experts works tirelessly to curate premium flight options, exclusive
              destinations, and personalized services that exceed expectations. We're not just booking flights; we're
              crafting memories.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-100 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-blue-600/20 text-6xl">✈</div>
          </div>
        </div>
      </section>

      {/* ... existing values section ... */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-600">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: "Excellence",
                description: "We maintain the highest standards in service quality and attention to detail",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Customer Focus",
                description: "Your satisfaction and experience are at the heart of everything we do",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Reach",
                description: "We connect you to the world's most exclusive destinations and experiences",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Innovation",
                description: "We continuously evolve to offer cutting-edge travel solutions",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 border border-blue-100 hover:shadow-lg transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 text-blue-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ... existing team/differentiators section ... */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Gatefare</h2>
          <p className="text-lg text-slate-600">What sets us apart from the rest</p>
        </div>
        <div className="space-y-6">
          {[
            {
              title: "Expert Curation",
              description:
                "Our team of travel experts handpicks every flight and destination to ensure premium quality",
            },
            {
              title: "Personalized Service",
              description:
                "We understand that every traveler is unique. Our team provides bespoke recommendations tailored to your preferences",
            },
            {
              title: "24/7 Support",
              description:
                "Travel with confidence knowing our dedicated support team is always available to assist you",
            },
            {
              title: "Competitive Pricing",
              description:
                "Luxury doesn't have to be expensive. We negotiate the best rates without compromising quality",
            },
            {
              title: "Global Network",
              description:
                "With partnerships across the globe, we offer exclusive access to premium destinations and experiences",
            },
            {
              title: "Transparent Communication",
              description:
                "We believe in complete transparency. No hidden fees, no surprises—just honest, reliable service",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8 border border-blue-100 hover:shadow-lg transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ... existing CTA section ... */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready for Your Next Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let us help you plan the perfect trip with premium flights and personalized service
          </p>
          <Link href="/enquiry" passHref>
            <Button className="bg-white hover:bg-slate-100 text-blue-600 px-8 h-12 font-semibold">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* ... existing footer ... */}
      <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Gatefare</h3>
              <p className="text-slate-400 text-sm">Your premium gateway to world-class travel experiences</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <Link href="/" className="hover:text-blue-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/enquiry" className="hover:text-blue-400 transition-colors">
                    Enquiry
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-400 transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-3 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>info@gatefare.com</span>
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
    </div>
  )
}
