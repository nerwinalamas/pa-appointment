import { Slot } from "@/app/appointment/[appointmentDateId]/_types";
import { create } from "zustand";

export type ModalType = "createSlot" | "updateSlot" | "deleteSlot";

type ModalStore = {
    type: ModalType | null;
    data?: Slot | string;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: Slot | string) => void;
    onClose: () => void;
};

export const useSlotModal = create<ModalStore>((set) => ({
    type: null,
    dataObject: {},
    isOpen: false,
    onOpen: (type, data) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));
