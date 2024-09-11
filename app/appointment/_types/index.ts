export type AppointmentProps = {
    id: string;
    date: string;
    available_slots: number;
    booked_slots: number;
    created_at: string;
    updated_at: string;
    slotCount?: number
};