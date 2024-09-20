import { create } from "zustand";

type SettingsStateTypes = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useSettingsHandler = create<SettingsStateTypes>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));
export default useSettingsHandler;
