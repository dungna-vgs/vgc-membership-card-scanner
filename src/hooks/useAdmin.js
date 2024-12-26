import { create } from "zustand";

const useAdmin = create((set) => ({
  admin: null,
  setAdmin: (admin) => set({ admin }),
}));

export default useAdmin;
