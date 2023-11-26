import { CurrencyState } from "@/types/Currency.type";
import { ExchangeRate } from "@/types/ExchangeRate.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * currencyType = Tipo de conversion 
    0 : Para DOL a PEN 
    1 : Para PEN a DOL

 * currencyFrom = Valor a convertir
 * CurrencyTo = Valor ya convertido    
 */


const initialState: CurrencyState = {
  currencyType: 0,
  currencyFrom: '',
  currencyTo: '',
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateCurrencyFrom: (state, action: PayloadAction<{ newCurrencyFrom: string, dataExchange: ExchangeRate }>) => {
      state.currencyFrom = action.payload.newCurrencyFrom
      state.currencyTo = calculateConversion(action.payload.newCurrencyFrom, state.currencyType, action.payload.dataExchange)
    },
    updateCurrencyType: (state, action: PayloadAction<{ newCurrencyType: number, dataExchange: ExchangeRate }>) => {
      state.currencyType = action.payload.newCurrencyType
      state.currencyTo = calculateConversion(state.currencyFrom, action.payload.newCurrencyType, action.payload.dataExchange)
    }
  }
})

const calculateConversion = (currencyFrom: string, currencyType: number, dataExchange: ExchangeRate): string => {
  const newCurrencyTo = currencyType === 0 ?
    (
      parseFloat(currencyFrom) * parseFloat(dataExchange.purchase_price)
    ) : (
      parseFloat(currencyFrom) / parseFloat(dataExchange.sale_price)
    )
  return newCurrencyTo.toFixed(2)
}


export const { updateCurrencyFrom, updateCurrencyType } = currencySlice.actions

export default currencySlice.reducer