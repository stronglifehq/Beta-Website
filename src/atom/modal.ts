import { atom } from "recoil";

export const modal = atom<{
  title: string;
  children: React.ReactNode;
  open: boolean;
}>({
  key: "modal", // unique ID (with respect to other atoms/selectors)
  default: {
    title: "",
    children: null,
    open: false,
  }, // default value (aka initial value)
});
