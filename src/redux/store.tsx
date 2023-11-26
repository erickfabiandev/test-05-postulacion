import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from './features/currencySlice'
import firebaseReducer from './features/firebaseSlice'

export const store = configureStore(
  {
    reducer: {
      currencyReducer,
      firebaseReducer
    }
  }
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch