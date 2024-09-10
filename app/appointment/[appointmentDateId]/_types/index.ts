export type Slot = {
    id: string;
    start_time: string;
    end_time: string;
    is_booked: boolean;
    name: string | null;
    contact_number: string | null;
    deposit_screenshot: string | null;
    appointment_id: string;
};
