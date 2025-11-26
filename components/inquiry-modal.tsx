
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Flight } from "@/lib/mock-data"
import { BookingWizard } from "@/components/booking/booking-wizard"

interface InquiryModalProps {
    isOpen: boolean
    onClose: () => void
    flight: Flight | null
}

export function InquiryModal({ isOpen, onClose, flight }: InquiryModalProps) {
    if (!flight) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] h-[90vh] sm:h-[600px] p-0 flex flex-col overflow-hidden">
                <DialogHeader className="px-6 pt-6 pb-2">
                    <DialogTitle>Book Your Flight</DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-hidden">
                    <BookingWizard flight={flight} onClose={onClose} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
