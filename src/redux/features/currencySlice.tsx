import { ActionCurrencyWithoutFrom, CurrencyState, CurrencyType, ActionCurrencyWithoutType, CurrencyProps } from "@/types/Currency.type";
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
  currencyType: CurrencyType.USD_TO_PEN,
  currencyFrom: '',
  currencyTo: '',
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateCurrencyFrom: (state: CurrencyState, action: PayloadAction<ActionCurrencyWithoutType>) => {
      state.currencyFrom = action.payload.currencyFrom
      const calculateProps: CurrencyProps = {
        currencyType: state.currencyType,
        currencyFrom: action.payload.currencyFrom,
        dataExchange: action.payload.dataExchange
      }
      state.currencyTo = calculateConversion(calculateProps)
    },
    updateCurrencyType: (state: CurrencyState, action: PayloadAction<ActionCurrencyWithoutFrom>) => {
      state.currencyType = action.payload.currencyType
      const calculateProps: CurrencyProps = {
        currencyType: action.payload.currencyType,
        currencyFrom: state.currencyFrom,
        dataExchange: action.payload.dataExchange
      }
      state.currencyTo = calculateConversion(calculateProps)
    }
  }
})

const calculateConversion = (calculateProps: CurrencyProps): string => {
  const { currencyFrom, currencyType, dataExchange } = calculateProps
  const newCurrencyTo = currencyType === CurrencyType.USD_TO_PEN ?
    (
      parseFloat(currencyFrom) * parseFloat(dataExchange.purchase_price)
    ) : (
      parseFloat(currencyFrom) / parseFloat(dataExchange.sale_price)
    )
  return newCurrencyTo.toFixed(2)
}


export const { updateCurrencyFrom, updateCurrencyType } = currencySlice.actions

export default currencySlice.reducer