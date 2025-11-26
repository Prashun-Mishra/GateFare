import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"
import rateLimit from "@/lib/rate-limit"

const resend = new Resend(process.env.RESEND_API_KEY)

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
})

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(10),
    token: z.string().min(1, "Turnstile token is required"),
})

async function verifyTurnstile(token: string) {
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

export async function POST(req: Request) {
    try {
        // Rate Limiting
        try {
            await limiter.check(NextResponse.next(), 5, "CACHE_TOKEN_CONTACT"); // 5 requests per minute
        } catch {
            return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
        }

        const body = await req.json()
        const validatedData = contactSchema.parse(body)

        // Verify Turnstile
        const isHuman = await verifyTurnstile(validatedData.token);
        if (!isHuman) {
            return NextResponse.json({ error: "Security check failed" }, { status: 400 });
        }

        // If no API key, just log and return success (for dev/demo)
        if (!process.env.RESEND_API_KEY) {
            console.log("Contact Form Submission (Mock):", validatedData)
            return NextResponse.json({ success: true, mock: true })
        }

        const { data, error } = await resend.emails.send({
            from: "Gatefare Contact <onboarding@resend.dev>",
            to: [process.env.ADMIN_EMAIL || "delivered@resend.dev"],
            subject: `New Contact Message: ${validatedData.subject}`,
            html: `
        <h1>New Contact Message</h1>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
        })

        if (error) {
            console.error("Resend Error:", error)
            return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
        }

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error("Contact API Error:", error)
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
