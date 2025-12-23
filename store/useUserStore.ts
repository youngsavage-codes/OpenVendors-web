import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string | null;
  role: string;
  emailVerified: boolean;
  isActive: boolean;
  bio: string | null;
  dateOfBirth: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface UserState {
  user: User | null;
  hasHydrated: boolean;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,

      setUser: (user) => set({ user }),
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-store",
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.hasHydrated = true;
          }
        };
      },
    }
  )
);
