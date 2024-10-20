import { create } from "zustand";

type TimeSlot = {
    start: string;
    end: string;
};

type ReservationStore = {
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    selectedTimeSlot: TimeSlot | null;
    setSelectedTimeSlot: (slot: TimeSlot | null) => void;
    name: string;
    setName: (name: string) => void;
    contactNumber: string;
    setContactNumber: (contactNumber: string) => void;
    depositScreenshot: File | null;
    setDepositScreenshot: (screenshot: File | null) => void;
    depositScreenshotLink: string;
    setDepositScreenshotLink: (screenshot: string) => void;
};

export const useReservation = create<ReservationStore>((set) => ({
    selectedDate: new Date(),
    setSelectedDate: (date) => set({ selectedDate: date }),
    selectedTimeSlot: null,
    setSelectedTimeSlot: (slot) => set({ selectedTimeSlot: slot }),
    name: "",
    setName: (name) => set({ name }),
    contactNumber: "",
    setContactNumber: (contactNumber) => set({ contactNumber }),
    depositScreenshot: null,
    setDepositScreenshot: (screenshot) =>
        set({ depositScreenshot: screenshot }),
    depositScreenshotLink: "",
    setDepositScreenshotLink: (screenshot) =>
        set({ depositScreenshotLink: screenshot }),
}));
