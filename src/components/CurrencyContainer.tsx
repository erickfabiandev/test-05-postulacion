'use client'
import React, { FC } from 'react';
import Styles from '@/styles/components/CurrencyContainer.module.scss'
import CurrencyTabContent from './CurrencyTabContent';
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { updateCurrencyType } from '@/redux/features/currencySlice';

const CurrencyContainer: FC = () => {
  const priceRate = ['Dólar compra', 'Dólar venta']
  const currencyType = useAppSelector(state => state.currencyReducer.currencyType)
  const dataExchange = useAppSelector(state => state.firebaseReducer)
  const disptach = useAppDispatch()

  const handleTabClick = (newCurrencyType: number) => {
    disptach(updateCurrencyType({ newCurrencyType, dataExchange }))
  }

  return (
    <section className={Styles.currency_container}>
      <ul className={Styles.currency_container__tabs}>
        {
          priceRate.map((price, index) =>
            <li
              key={index}
              className={Styles.currency_container__tabs__title}
              onClick={() => handleTabClick(index)}
            >
              <p className={currencyType === index ? Styles.active : ''}>
                <span> {price}</span>
                <span className={Styles.value}>{dataExchange[index === 0 ? 'purchase_price' : 'sale_price']}</span>
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