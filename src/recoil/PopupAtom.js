import { atom } from "recoil";

export const PopupAtom = atom({
  key: "PopupAtom",
  default: {
    popupType: "",
    isOpen: false,
    popupData: {},
  },
});
