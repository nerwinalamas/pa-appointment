import ReservationNavbar from "./_components/reservation-navbar";
import ReservationContent from "./_components/reservation-content";
import { Card } from "@/components/ui/card";

const Reservation = async () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-2xl mx-auto">
                <ReservationNavbar />
                <ReservationContent />
            </Card>
        </div>
    );
};

export default Reservation;
