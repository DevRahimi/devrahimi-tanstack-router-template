import { consoleLogger } from "./console-logger";

export const formatCurrency = (amount: number, currency: string): string => {
  // Handle currencies that don't use decimal places
  const minimumFractionDigits = ["JPY", "KRW", "HUF"].includes(currency) ? 0 : 2;
  const maximumFractionDigits = minimumFractionDigits;

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);
  } catch (error: unknown) {
    consoleLogger.error(error);

    // Fallback for unsupported currencies
    return `${currency}${amount.toFixed(minimumFractionDigits)}`;
  }
};
