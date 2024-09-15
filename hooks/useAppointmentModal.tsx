import { AppointmentProps } from "@/app/appointment/_types";
import { create } from "zustand";

export type ModalType =
    | "createAppointment"
    | "updateAppointment"
    | "deleteAppointment";

type ModalStore = {
    type: ModalType | null;
    data?: AppointmentProps;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: AppointmentProps) => void;
    onClose: () => void;
};

export const useAppointmentModal = create<ModalStore>((set) => ({
    type: null,
    dataObject: {},
    isOpen: false,
    onOpen: (type, data?: AppointmentProps) =>
        set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));
