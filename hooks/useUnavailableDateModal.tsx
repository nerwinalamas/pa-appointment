import { create } from "zustand";

export type ModalType = "createUnavailableDate";

type UnavailableDate = {
    date: string;
};

type ModalStore = {
    type: ModalType | null;
    data?: UnavailableDate;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: UnavailableDate) => void;
    onClose: () => void;
};

export const useUnavailableDateModal = create<ModalStore>((set) => ({
    type: null,
    data: undefined,
    isOpen: false,
    onOpen: (type, data?: UnavailableDate) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, data: undefined, isOpen: false }),
}));
