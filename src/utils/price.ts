export function formatPrice(price: number) {
  return price.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
}
