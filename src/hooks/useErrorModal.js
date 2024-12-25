import { create } from "zustand";

const useErrorModal = create((set) => ({
  isOpen: false,
  errorMessage: "",
  title: "",
  openModal: (message, title) =>
    set({ isOpen: true, errorMessage: message, title }),
  closeModal: () => set({ isOpen: false, errorMessage: "" }),
}));

export default useErrorModal;
