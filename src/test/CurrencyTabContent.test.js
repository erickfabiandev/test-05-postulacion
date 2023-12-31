import { fireEvent, render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import configureStore from 'redux-mock-store';
import CurrencyTabContent from "@/components/CurrencyTabContent";
import { CurrencyType } from "@/types/Currency.type";
import { Provider } from 'react-redux';

describe('CurrencyTabContent', () => {

  test('you must change the type of currency by clicking on the button', () => {
    //Arrange
    const initialState = {
      currencyReducer: {
        currencyType: CurrencyType.USD_TO_PEN,
        currencyFrom: '',
        currencyTo: ''
      },
      firebaseReducer: {
        purchase_price: '3.5',
        sale_price: '3.7'
      }
    };

    const mockStore = configureStore();
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <CurrencyTabContent />
      </ Provider>
    )
    //Act
    fireEvent.click(screen.getByTestId('toggle'));

    const actions = store.getActions();
    expect(actions[0].type).toEqual('currency/updateCurrencyType');
    expect(actions[0].payload.currencyType).toEqual(CurrencyType.PEN_TO_USD);
  })
})