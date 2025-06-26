import { create } from 'zustand';

interface UIStore {
  resetAutocomplete: boolean;
  triggerReset: () => void;
  acknowledgeReset: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  resetAutocomplete: false,
  triggerReset: () => set({ resetAutocomplete: true }),
  acknowledgeReset: () => set({ resetAutocomplete: false }),
}));
