import { format, subMonths } from "date-fns";

export type Reservation = {
    id: string;
    created_at: string;
    updated_at: string;
    date: string;
    time_slots: string;
    name: string;
    contact_number: string;
    deposit_screenshots: string;
};

export const processReservationsData = (reservations: Reservation[]) => {
    const chartData = Array.from({ length: 6 }, (_, index) => {
        const monthDate = subMonths(new Date(), index);
        const monthName = format(monthDate, "MMMM");

        const monthReservations = reservations.filter((reservation) => {
            const reservationDate = new Date(reservation.date);
            return (
                reservationDate.getFullYear() === monthDate.getFullYear() &&
                reservationDate.getMonth() === monthDate.getMonth()
            );
        });

        const bookings = monthReservations.length;

        return {
            month: monthName,
            booking: bookings,
        };
    });

    return chartData.reverse();
};
