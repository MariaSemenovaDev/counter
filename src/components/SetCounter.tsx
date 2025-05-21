import React, {type ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {Button} from "./Button.tsx";
import s from './SetCounter.module.css'

type SetCounterType = {
    setValues: (min: number, max: number) => void
    updateMin: number
    updateMax: number
    onInputChange: (values: { startValue: number; maxValue: number }) => void; // Новый пропс
}

export const SetCounter = (props : SetCounterType) => {

    const {
        setValues,
        updateMin,
        updateMax,
        onInputChange,
    } = props

    const [min, setMin] = useState(updateMin)
    const [max, setMax] = useState(updateMax)


    useEffect(() => {
        setMin(updateMin);
        setMax(updateMax);
    }, [updateMin, updateMax]);  //перерисовывай при изменении updateMin и updateMax

    // При изменении инпутов обновляем tempValues в App
    useEffect(() => {
        onInputChange({ startValue: min, maxValue: max });
    }, [min, max]);

    const setBtnHandler = () => {
        setValues(min, max)
    }

    const onKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            setBtnHandler()
        }
    }


    const onChangeMinHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMin(+e.currentTarget.value || 0);
    }
    const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMax(+e.currentTarget.value || 0);

    }

    return (
        <div className={s.blockWrapper}>
            <div className={s.scoreWrapper}>
                <label className={s.title}>
                    Start value:
                    <input type="number"
                           value={min}
                           onKeyDown={onKeyDownHandler}
                           onChange={onChangeMinHandler}
                           className={s.input}
                        // className={`input ${max < 0 || min >= max ? 'error' : ''}`}

                    />
                </label>
                <label className={s.title}>
                    Max value:
                    <input type="number"
                           value={max}
                           onKeyDown={onKeyDownHandler}
                           onChange={onChangeMaxHandler}
                           className={s.input}
                        // className={`input ${min < 0 ? 'error' : ''}`}
                    />
                </label>
            </div>
            <div className={''}>
                <Button onClick={setBtnHandler}>Set</Button>
            </div>
        </div>

    );
};
