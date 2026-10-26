export function formatPrice(currency, amount) {
  return `${currency}${amount.toFixed(2)}`;
}
