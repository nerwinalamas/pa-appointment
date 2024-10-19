import { User } from "@/app/(dashboard)/account/_types";
import { create } from "zustand";

export type ModalType = "deleteAccount";

type ModalStore = {
    type: ModalType | null;
    data?: User;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: User) => void;
    onClose: () => void;
};

export const useAccountModal = create<ModalStore>((set) => ({
    type: null,
    data: undefined,
    isOpen: false,
    onOpen: (type, data?: User) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, data: undefined, isOpen: false }),
}));
