import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
  name: string;
  password: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create(
  devtools<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
  }))
);
