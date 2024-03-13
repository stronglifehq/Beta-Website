export function formatPrice(price: number | string) {
  return price.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
}
