import { Staff } from "@/app/(dashboard)/staff/_types";
import { create } from "zustand";

export type ModalType = "createStaff" | "updateStaff" | "deleteStaff";

type ModalStore = {
    type: ModalType | null;
    data?: Staff | string;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: Staff | string) => void;
    onClose: () => void;
};

export const useStaffModal = create<ModalStore>((set) => ({
    type: null,
    dataObject: {},
    isOpen: false,
    onOpen: (type, data) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));
