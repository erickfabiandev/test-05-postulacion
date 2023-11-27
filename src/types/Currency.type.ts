import { ExchangeRate } from "./ExchangeRate.type";

export enum CurrencyType {
  USD_TO_PEN = 'USD_TO_PEN',
  PEN_TO_USD = 'PEN_TO_USD'
}

interface CurrencyState {
  currencyType: CurrencyType;
  currencyFrom: string;
  currencyTo: string;
}

interface CurrencyProps {
  currencyType: CurrencyType;
  currencyFrom: string;
  dataExchange: ExchangeRate;
}

type ActionCurrencyWithoutType = Omit<CurrencyProps, 'currencyType'>;
type ActionCurrencyWithoutFrom = Omit<CurrencyProps, 'currencyFrom'>;

export type {
  CurrencyState,
  ActionCurrencyWithoutType,
  ActionCurrencyWithoutFrom,
  CurrencyProps
};
