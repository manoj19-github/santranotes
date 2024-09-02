import { create } from "zustand";

type SearchStore = {
  search: string;
  setSearch: (search: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

export const useSearch = create<SearchStore>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
