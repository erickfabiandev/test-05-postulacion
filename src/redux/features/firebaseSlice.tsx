import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ExchangeRate } from '@/types/ExchangeRate.type'

const initialState: ExchangeRate = {
  purchase_price: '0.000',
  sale_price: '0.000'
}

const firebaseSlice = createSlice({
  name: 'firebaseData',
  initialState,
  reducers: {
    setFirebaseData: (state, action: PayloadAction<ExchangeRate>) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { setFirebaseData } = firebaseSlice.actions
export default firebaseSlice.reducer