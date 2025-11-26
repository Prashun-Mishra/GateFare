import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EnquiryEmail } from '@/components/email-template';
import { z } from 'zod';
import rateLimit from '@/lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
});

// Flexible schema to handle both simple enquiry and full booking
const enquirySchema = z.object({
    type: z.enum(["enquiry", "booking"]).optional().default("enquiry"),
    token: z.string().min(1, "Turnstile token is required"),

    // Common fields
    flightDetails: z.object({
        airline: z.string(),
        flightNumber: z.string(),
        from: z.string(),
        to: z.string(),
        date: z.string(),
        price: z.number(),
        totalPrice: z.number().optional(),
    }).optional(),

    // Simple Enquiry Fields
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    message: z.string().optional(),

    // Booking Wizard Fields
    passenger: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        phone: z.string(),
        passport: z.string().optional(),
        baggage: z.string(),
        gender: z.string().optional(),
        dobDay: z.string().optional(),
        dobMonth: z.string().optional(),
        dobYear: z.string().optional(),
    }).optional(),

    seats: z.object({
        seatNumber: z.string().nullable(),
        price: z.number(),
    }).optional(),

    addons: z.object({
        cancellation: z.string(),
        premiumService: z.boolean(),
    }).optional(),
});

async function verifyTurnstile(token: string) {
    // Use test secret if not provided
    const secretKey = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            secret: secretKey,
            response: token,
        }),
    });

    const data = await response.json();
    return data.success;
}

export async function POST(request: Request) {
    try {
        // Rate Limiting
        try {
            await limiter.check(NextResponse.next(), 5, "CACHE_TOKEN"); // 5 requests per minute
        } catch {
            return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
        }

        const body = await request.json();

        // Validate input
        const result = enquirySchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid input", details: result.error.errors },
                { status: 400 }
            );
        }

        const data = result.data;

        // Verify Turnstile
        const isHuman = await verifyTurnstile(data.token);
        if (!isHuman) {
            return NextResponse.json({ error: "Security check failed" }, { status: 400 });
        }

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@gatefare.com';

        // Determine email subject and recipient details
        const isBooking = data.type === "booking";
        const subject = isBooking
            ? `New Flight Booking: ${data.flightDetails?.airline} (${data.flightDetails?.from} - ${data.flightDetails?.to})`
            : `New Flight Enquiry: ${data.flightDetails?.airline} (${data.flightDetails?.from} - ${data.flightDetails?.to})`;

        const customerName = isBooking ? `${data.passenger?.firstName} ${data.passenger?.lastName}` : data.name || "Unknown";
        const customerEmail = isBooking ? data.passenger?.email : data.email || "";
        const customerPhone = isBooking ? data.passenger?.phone : data.phone || "";

        // Send email
        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: 'Gatefare Enquiries <onboarding@resend.dev>',
                to: [adminEmail],
                subject: subject,
                react: EnquiryEmail({
                    name: customerName,
                    email: customerEmail!,
                    phone: customerPhone!,
                    message: data.message,
                    flightDetails: data.flightDetails as any,
                    type: data.type,
                    passenger: data.passenger as any,
                    seats: data.seats,
                    addons: data.addons,
                }) as React.ReactElement,
            });
        } else {
            console.log("RESEND_API_KEY not found. Logging enquiry to console instead.");
            console.log("Enquiry Data:", JSON.stringify(data, null, 2));
        }

        return NextResponse.json({ success: true, message: "Enquiry submitted successfully" });
    } catch (error) {
        console.error("Enquiry submission error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
