'use client'
import React, { FC } from 'react';
import Styles from '@/styles/components/CurrencyContainer.module.scss'
import CurrencyTabContent from './CurrencyTabContent';
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { updateCurrencyType } from '@/redux/features/currencySlice';
import { CurrencyType } from '@/types/Currency.type';

const CurrencyContainer: FC = () => {
  const priceRate = [
    {
      id: CurrencyType.USD_TO_PEN,
      title: 'Dólar compra'
    },
    {
      id: CurrencyType.PEN_TO_USD,
      title: 'Dólar venta'
    }
  ]
  const currencyType = useAppSelector(state => state.currencyReducer.currencyType)
  const dataExchange = useAppSelector(state => state.firebaseReducer)
  const disptach = useAppDispatch()

  const handleTabClick = (newCurrencyType: CurrencyType) => {
    disptach(updateCurrencyType({ currencyType: newCurrencyType, dataExchange }))
  }

  return (
    <section className={Styles.currency_container}>
      <ul className={Styles.currency_container__tabs}>
        {
          priceRate.map((price) =>
            <li
              key={price.id}
              className={Styles.currency_container__tabs__title}
              onClick={() => handleTabClick(price.id)}
            >
              <p className={currencyType === price.id ? Styles.active : ''}>
                <span> {price.title}</span>
                <span className={Styles.value}>
                  {
                    dataExchange[price.id === CurrencyType.USD_TO_PEN ? 'purchase_price' : 'sale_price']
                  }
                </span>
              </p>
            </li>
          )
        }
      </ul>
      <CurrencyTabContent />
    </section>
  );
};

export default CurrencyContainer;