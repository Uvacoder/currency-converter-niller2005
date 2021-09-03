export interface ExchangeRates {
  amount: number;
  base: string;
  date: string;
  rates: { [key: string]: number };
}
