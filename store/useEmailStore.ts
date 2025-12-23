// store/useEmailStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmailState {
  email: string;
  hasHydrated: boolean;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

export const useEmailStore = create<EmailState>()(
  persist(
    (set) => ({
      email: "",
      hasHydrated: false,

      setEmail: (email) => set({ email }),
      clearEmail: () => set({ email: "" }),
    }),
    {
      name: "email-store",

      onRehydrateStorage: () => {
        return (state) => {
          // ✅ SAFE: use set via store API
          if (state) {
            state.hasHydrated = true;
          }
        };
      },
    }
  )
);
