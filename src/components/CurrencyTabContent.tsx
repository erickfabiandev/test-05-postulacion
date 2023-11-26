'use client'
import { FC, ChangeEvent, KeyboardEvent } from 'react';
import style from '@/styles/components/CurrencyTabContent.module.scss'
import { RxUpdate } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { updateCurrencyFrom, updateCurrencyType } from '@/redux/features/currencySlice'
import CurrencyInput from './CurrencyInput';


const CurrencyTabContent: FC = () => {
  const dispacth = useAppDispatch()
  const currencyFrom = useAppSelector(state => state.currencyReducer.currencyFrom)
  const currencyTo = useAppSelector(state => state.currencyReducer.currencyTo)
  const currencyType = useAppSelector(state => state.currencyReducer.currencyType)
  const dataExchange = useAppSelector(state => state.firebaseReducer)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const newCurrencyFrom = target.value;
    dispacth(updateCurrencyFrom({ newCurrencyFrom, dataExchange }))
  }

  const hanldeKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '-' || event.key === 'e' || event.key === 'E' || event.key === '+') {
      event.preventDefault();
    }
  };

  const handleToggleClick = () => {
    const newCurrencyType = currencyType === 0 ? 1 : 0
    dispacth(updateCurrencyType({ newCurrencyType, dataExchange }))
  }

  const sendLabel = currencyType === 0 ? 'Dólares' : 'Soles';
  const sendSymbol = currencyType === 0 ? '$' : 'S/';
  const receiveLabel = currencyType === 0 ? 'Soles' : 'Dólares';
  const receiveSymbol = currencyType === 0 ? 'S/' : '$';

  return (
    <div className={style.currency_tab_content}>
      <CurrencyInput
        id={'currencyFrom'}
        name={'currencyFrom'}
        label={sendLabel}
        symbol={sendSymbol}
        amountValue={currencyFrom}
        legend={'Envías'}
        disabled={false}
        onChange={handleChange}
        onKeyDown={hanldeKeyDown}
      />
      <button
        type='button'
        id='toggle'
        data-testid='toggle'
        className={`${style.toggle} ${currencyType === 1 ? style.animation_rotate : ''}`}
        onClick={handleToggleClick}
      >
        <RxUpdate className={style.icon} size={25} />
      </button>
      <CurrencyInput
        id={'currencyTo'}
        name={'currencyTo'}
        label={receiveLabel}
        symbol={receiveSymbol}
        amountValue={currencyTo}
        legend={'Recibes'}
        disabled={true}
      />
      <button
        type='button'
        className={style.start}
      >
        Iniciar operación
      </button>
    </div>
  );
};

export default CurrencyTabContent;