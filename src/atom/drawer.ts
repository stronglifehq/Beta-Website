import { atom } from "recoil";

export const isDrawer = atom<boolean>({
  key: "drawer", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
