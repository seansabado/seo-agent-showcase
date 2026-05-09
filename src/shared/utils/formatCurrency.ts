export const formatCurrency = (
  amount: number,
  currency = "PHP",
  locale = "en-PH",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
