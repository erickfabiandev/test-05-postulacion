'use client'
import { FC, ChangeEvent, KeyboardEvent } from 'react';
import style from '@/styles/components/CurrencyTabContent.module.scss'
import { RxUpdate } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { updateCurrencyFrom, updateCurrencyType } from '@/redux/features/currencySlice'
import CurrencyInput from './CurrencyInput';
import { CurrencyType } from '@/types/Currency.type';


const CurrencyTabContent: FC = () => {
  const dispacth = useAppDispatch()
  const currencyFrom = useAppSelector(state => state.currencyReducer.currencyFrom)
  const currencyTo = useAppSelector(state => state.currencyReducer.currencyTo)
  const currencyType = useAppSelector(state => state.currencyReducer.currencyType)
  const dataExchange = useAppSelector(state => state.firebaseReducer)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const newCurrencyFrom = target.value;
    dispacth(updateCurrencyFrom({ currencyFrom: newCurrencyFrom, dataExchange }))
  }

  const hanldeKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '-' || event.key === 'e' || event.key === 'E' || event.key === '+') {
      event.preventDefault();
    }
  };

  const handleToggleClick = () => {
    const newCurrencyType = currencyType === CurrencyType.USD_TO_PEN ? CurrencyType.PEN_TO_USD : CurrencyType.USD_TO_PEN
    dispacth(updateCurrencyType({ currencyType: newCurrencyType, dataExchange }))
  }

  const sendLabel = currencyType === CurrencyType.USD_TO_PEN ? 'Dólares' : 'Soles';
  const sendSymbol = currencyType === CurrencyType.USD_TO_PEN ? '$' : 'S/';
  const receiveLabel = currencyType === CurrencyType.USD_TO_PEN ? 'Soles' : 'Dólares';
  const receiveSymbol = currencyType === CurrencyType.USD_TO_PEN ? 'S/' : '$';

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
        className={`${style.toggle} ${currencyType === CurrencyType.PEN_TO_USD ? style.animation_rotate : ''}`}
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