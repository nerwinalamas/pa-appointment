import { Card } from "@/components/ui/card";
import ReservationNavbar from "./_components/reservation-navbar";
import ReservationContent from "./_components/reservation-content";

export default function ReservationForm() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-2xl mx-auto">
                <ReservationNavbar />
                <ReservationContent />
            </Card>
        </div>
    );
}
