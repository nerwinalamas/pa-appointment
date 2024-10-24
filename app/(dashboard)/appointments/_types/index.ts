export type AppointmentProps = {
    id: string;
    date: string;
    time_slots: string;
    name: string;
    contact_number: string;
    deposit_screenshots: string;
    created_at: string;
    updated_at: string;
};

export type TimeSlot = {
    id: string;
    start_time: string;
    end_time: string;
};

export type ErrorMessage = {
    date?: Date | string;
    timeSlots?: string;
    name?: string;
    contactNumber?: string;
};

export type AvailableTimeSlots = {
    id: string;
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
};
