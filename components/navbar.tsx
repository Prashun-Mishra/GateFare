"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Plane, Phone, Info, HelpCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function Navbar() {
    const pathname = usePathname()

    const links = [
        { href: "/", label: "Flights", icon: Plane },
        { href: "/enquiry", label: "Enquiry", icon: Mail },
        { href: "/about", label: "About", icon: Info },
        { href: "/contact", label: "Contact", icon: Phone },
        { href: "/faq", label: "FAQ", icon: HelpCircle },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <img src="/logo.png" alt="Gatefare" className="h-24 w-auto" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-blue-600",
                                pathname === link.href
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-slate-600"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-slate-600">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <div className="flex flex-col gap-8 py-8">
                                <div className="flex items-center">
                                    <img src="/logo.png" alt="Gatefare" className="h-24 w-auto" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    {links.map((link) => (
                                        <SheetClose key={link.href} asChild>
                                            <Link
                                                href={link.href}
                                                className={cn(
                                                    "flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                                                    pathname === link.href
                                                        ? "bg-blue-50 text-blue-600"
                                                        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                                                )}
                                            >
                                                <link.icon className="w-5 h-5" />
                                                {link.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>

                                <div className="mt-auto pt-8 border-t border-slate-100">
                                    <div className="flex flex-col gap-4 text-sm text-slate-500 px-4">
                                        <p>Need help? Call us at</p>
                                        <a href="tel:+15551234567" className="text-blue-600 font-semibold text-lg">
                                            +1 (555) 123-4567
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}
