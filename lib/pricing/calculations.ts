import type { Money, Publication, UsageRate } from "./types";

export function published<T>(item: Publication<T>): T | null {
  return item.status === "published" ? item.value : null;
}

export function estimateCost(usage: number, rate: Publication<UsageRate>): Money | null {
  const value = published(rate);
  if (!value || !Number.isFinite(usage) || usage < 0 || !Number.isFinite(value.units) || value.units <= 0 || !Number.isFinite(value.price.amount) || value.price.amount < 0) return null;
  return { amount: usage / value.units * value.price.amount, currency: value.price.currency };
}

export function formatMoney(money: Money): string {
  try { return new Intl.NumberFormat("en-US", { style: "currency", currency: money.currency, maximumFractionDigits: 2 }).format(money.amount); }
  catch { return `${money.amount.toFixed(2)} ${money.currency}`; }
}
