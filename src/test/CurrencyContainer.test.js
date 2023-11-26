import { describe } from "node:test";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import CurrencyContainer from "@/components/CurrencyContainer";
import { fireEvent, render, screen } from "@testing-library/react";
import React from 'react';

describe('CurrencyContainer', () => {
  let store

  beforeEach(() => {
    //Arrange
    const initialState = {
      currencyReducer: {
        currencyType: 0,
        currencyFrom: '',
        currencyTo: ''
      },
      firebaseReducer: {
        purchase_price: '3.5',
        sale_price: '3.7'
      }
    };
    const mockStore = configureStore();
    store = mockStore(initialState);

    render(
      <Provider store={store}>
        <CurrencyContainer />
      </Provider>
    );
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('should render CurrencyContainer component', () => {
    //Act
    const TabsElementCompra = screen.getByText('Dólar compra');
    const TabsElementVenta = screen.getByText('Dólar venta');

    //Assert
    expect(TabsElementCompra).toBeInTheDocument();
    expect(TabsElementVenta).toBeInTheDocument();
  });

  test('you should change the currency type when clicking on a tab', () => {
    //Act
    fireEvent.click(screen.getByText('Dólar venta'));

    //Assert
    const actions = store.getActions();
    expect(actions[0].type).toEqual('currency/updateCurrencyType');
    expect(actions[0].payload.newCurrencyType).toEqual(1);
  });
});
