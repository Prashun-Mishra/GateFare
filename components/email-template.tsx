import * as React from 'react';

interface EmailTemplateProps {
    name: string
    email: string
    phone: string
    message?: string
    flightDetails: {
        airline: string
        flightNumber: string
        from: string
        to: string
        date: string
        price: number
    }
    type?: "enquiry" | "booking"
    passenger?: {
        firstName: string
        lastName: string
        passport: string
        baggage: string
        gender: string
        dobDay: string
        dobMonth: string
        dobYear: string
    }
    seats?: {
        seatNumber: string | null
        price: number
    }
    addons?: {
        cancellation: string
        premiumService: boolean
    }
}

export const EnquiryEmail: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    email,
    phone,
    message,
    flightDetails,
    type = "enquiry",
    passenger,
    seats,
    addons
}) => (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
        <h2 style={{ color: '#059669' }}>
            {type === "booking" ? "New Flight Booking Request" : "New Flight Enquiry"}
        </h2>

        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ marginTop: 0 }}>Flight Details</h3>
            <p><strong>Airline:</strong> {flightDetails.airline}</p>
            <p><strong>Flight:</strong> {flightDetails.flightNumber}</p>
            <p><strong>Route:</strong> {flightDetails.from} to {flightDetails.to}</p>
            <p><strong>Date:</strong> {flightDetails.date}</p>
            <p><strong>Base Price:</strong> ${flightDetails.price}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
            <h3>Customer Contact</h3>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            {message && <p><strong>Message:</strong> {message}</p>}
        </div>

        {type === "booking" && passenger && (
            <div style={{ background: '#f0fdf4', padding: '15px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <h3 style={{ marginTop: 0, color: '#166534' }}>Booking Details</h3>

                <p><strong>Passenger:</strong> {passenger.firstName} {passenger.lastName} ({passenger.gender})</p>
                <p><strong>Date of Birth:</strong> {passenger.dobDay} {passenger.dobMonth} {passenger.dobYear}</p>
                <p><strong>Passport:</strong> {passenger.passport || "Not provided"}</p>
                <p><strong>Baggage:</strong> {passenger.baggage === "add" ? "Checked Bag (+23kg)" : "Carry-on Only"}</p>

                <hr style={{ borderColor: '#bbf7d0', margin: '10px 0' }} />

                <p><strong>Seat Selection:</strong> {seats?.seatNumber || "Random"} ({seats?.price ? `$${seats.price}` : "Free"})</p>

                <p><strong>Add-ons:</strong></p>
                <ul>
                    <li>Cancellation: {addons?.cancellation}</li>
                    <li>Premium Service: {addons?.premiumService ? "Yes" : "No"}</li>
                </ul>
            </div>
        )}

        <hr style={{ margin: '20px 0', borderColor: '#eee' }} />
        <p style={{ fontSize: '12px', color: '#666' }}>
            This enquiry was sent from the Gatefare website.
        </p>
    </div>
)
