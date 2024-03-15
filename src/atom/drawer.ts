import { atom } from "recoil";

export const isDrawer = atom<"menu" | "wishlist" | null>({
  key: "drawer", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
