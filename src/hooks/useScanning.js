import { create } from "zustand";

const useScanning = create((set) => ({
  step: 1,
  cardInfo: null,
  setStep: (step) => set({ step }),
  setCardInfo: (cardInfo) => set({ cardInfo }),
}));

export default useScanning;
