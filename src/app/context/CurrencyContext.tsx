import { createContext, useContext } from 'react';
import { CURRENCY_PROFILES, CurrencyCode, CurrencyProfile } from '../currency';

export type CurrencyContextValue = {
  code: CurrencyCode;
  profile: CurrencyProfile;
  formatMoney: (value: number, code?: CurrencyCode, options?: Intl.NumberFormatOptions) => string;
  convertMoney: (value: number, code?: CurrencyCode) => number;
};

const fallbackFormat = (value: number, currency: CurrencyCode = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);

export const CurrencyContext = createContext<CurrencyContextValue>({
  code: 'USD',
  profile: CURRENCY_PROFILES.USD,
  formatMoney: fallbackFormat,
  convertMoney: (value: number, code?: CurrencyCode) =>
    code ? value * (CURRENCY_PROFILES[code]?.rate ?? 1) : value,
});

export function useCurrency() {
  return useContext(CurrencyContext);
}
