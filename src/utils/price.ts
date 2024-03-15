import { ItemInfo } from "types/item";

export function formatPrice(price: number | string) {
  return price.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
}

export function getPrice(item: ItemInfo): number {
  return item.options.attributes[item.selected_option].price as number;
}

export function getTotalPrice(
  wishlist: { item: ItemInfo; quantity: number }[]
) {
  return wishlist.reduce((acc, { item, quantity }) => {
    return acc + getPrice(item) * quantity;
  }, 0);
}
