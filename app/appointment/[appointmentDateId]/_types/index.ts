export type Slot = {
    id: number;
    start_time: string;
    end_time: string;
    is_booked: boolean;
    name: string | null;
    contact_number: string | null;
    deposit_screenshot: string | null;
    appointment_id: number;
};
