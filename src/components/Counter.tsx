import React, {useEffect, useState} from 'react';
import {Button} from "./Button.tsx";
import s from './Counter.module.css'


type CounterType = {
    startValue: number;
    maxValue: number;
    tempStartValue: number; // Новый пропс
    tempMaxValue: number;  // Новый пропс
    changes: boolean
}

export const Counter = ({startValue, maxValue, tempStartValue, tempMaxValue, changes}:CounterType) => {

    const [count, setCount] = useState(startValue);

    useEffect(() => {
        setCount(startValue);
    }, [startValue]); //перерисовывай при изменении startValue

    // Проверяем временные значения (ещё не сохранённые)
    const hasError = tempStartValue < 0 || tempMaxValue < 0 || tempMaxValue <= tempStartValue;

    const handlerIncrement = () => {
        if (count < maxValue) {
            setCount(count + 1);
        }
    }
    const handlerReset = () => {
        setCount(startValue);
    }


    return (
        <div className={s.blockWrapper}>

            <div className={s.counter}>
                {(startValue || maxValue) < 0 || maxValue <= startValue || hasError
                    ? <div className={s.title}>Incorrect value!</div>
                    : <div className={`${s.title} ${count === maxValue ? s.endNumber : ""}`}>{ changes ? count : "enter values and press 'set'" }</div>
                }


            </div>
            <div  className={s.btnWrapper}>
                <Button
                    callBack={handlerIncrement}
                    isDisabled={count >= maxValue || startValue < 0 || maxValue <= startValue}
                >
                    inc
                </Button>
                <Button
                    callBack={handlerReset}
                >
                    reset
                </Button>
            </div>
        </div>
    );
};
