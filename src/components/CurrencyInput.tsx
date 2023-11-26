import { FC, ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import style from '@/styles/components/CurrencyInput.module.scss'

interface CurrencyInputProps {
  label: string
  symbol: string
  id: string
  name: string
  amountValue: string
  disabled: boolean
  legend: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
}

const CurrencyInput: FC<CurrencyInputProps> = ({
  label,
  symbol,
  id,
  name,
  amountValue,
  legend,
  disabled,
  onChange,
  onKeyDown
}) => {

  const max_width = 120

  return (
    <div className={style.currency_input}>
      <label
      >
        {label}
      </label>
      <fieldset>
        <legend>
          {legend}
        </legend>
        <span
          className={style.amount_input}
        >
          {symbol}
          <input
            id={id}
            name={name}
            value={amountValue}
            disabled={disabled}
            type='number'
            inputMode='decimal'
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={style.amount_input__number_input}
            style={{
              width: Math.min(amountValue ? amountValue.length * 10 : 0, 120) + 'px',
              maxWidth: `${max_width}px`
            }}
          />
        </span>
      </fieldset>
    </div>
  );
};

export default CurrencyInput;