export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF' | 'CNY' | 'PLN';

export type CurrencyProfile = {
  code: CurrencyCode;
  label: string;
  locale: string;
  rate: number;
  symbol: string;
  note: string;
};

// Average FX rates sourced from 2024 IMF and national bank summaries (USD as base)
export const CURRENCY_PROFILES: Record<CurrencyCode, CurrencyProfile> = {
  USD: {
    code: 'USD',
    label: 'US Dollar',
    locale: 'en-US',
    rate: 1,
    symbol: '$',
    note: 'Base currency',
  },
  EUR: {
    code: 'EUR',
    label: 'Euro',
    locale: 'de-DE',
    rate: 0.92,
    symbol: '€',
    note: 'Avg 2024: 1 USD ≈ 0.92 EUR',
  },
  GBP: {
    code: 'GBP',
    label: 'British Pound',
    locale: 'en-GB',
    rate: 0.79,
    symbol: '£',
    note: 'Avg 2024: 1 USD ≈ 0.79 GBP',
  },
  JPY: {
    code: 'JPY',
    label: 'Japanese Yen',
    locale: 'ja-JP',
    rate: 144.8,
    symbol: '¥',
    note: 'Avg 2024: 1 USD ≈ 144.8 JPY',
  },
  CHF: {
    code: 'CHF',
    label: 'Swiss Franc',
    locale: 'de-CH',
    rate: 0.89,
    symbol: 'CHF',
    note: 'Avg 2024: 1 USD ≈ 0.89 CHF',
  },
  CNY: {
    code: 'CNY',
    label: 'Chinese Yuan',
    locale: 'zh-CN',
    rate: 7.17,
    symbol: '¥',
    note: 'Avg 2024: 1 USD ≈ 7.17 CNY',
  },
  PLN: {
    code: 'PLN',
    label: 'Polish Złoty',
    locale: 'pl-PL',
    rate: 4.03,
    symbol: 'zł',
    note: 'Śr. 2024: 1 USD ≈ 4.03 PLN',
  },
};
