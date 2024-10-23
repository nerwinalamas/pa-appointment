import { HoursTableRow } from "@/app/(dashboard)/availability/_components/availability-hours-table-row";
import { create } from "zustand";

type ReservationStore = {
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    selectedTimeSlot: HoursTableRow | null;
    setSelectedTimeSlot: (slot: HoursTableRow | null) => void;
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
    selectedDate: null,
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
