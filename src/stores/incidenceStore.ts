import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Incidence {
  category: string;
  subcategory: string;
  notes: string;
  count: number;
  latitude: number;
  longitude: number;
  createdAt: string;
}

interface IncidenceStore {
  incidences: Incidence[];
  addIncidence: (incidence: Incidence) => void;
  clearIncidences: () => void;
}

export const useIncidenceStore = create<IncidenceStore>()(
  devtools((set) => ({
    incidences: [],
    addIncidence: (incidence) => set((state) => ({ incidences: [...state.incidences, incidence] })),
    clearIncidences: () => set({ incidences: [] }),
  }))
);