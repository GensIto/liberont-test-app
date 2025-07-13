import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type GuestCartId = {
  guestCartId: string | null;
  setGuestCartId: (v: string) => void;
  clearGuestCartId: () => void;
};

export const guestCartStore = create<GuestCartId>()(
  persist(
    (set) => ({
      guestCartId: null,
      setGuestCartId: (v) => set({ guestCartId: v }),
      clearGuestCartId: () => set({ guestCartId: null }),
    }),
    {
      name: "guestCartIdStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useGuestCartId = guestCartStore;
