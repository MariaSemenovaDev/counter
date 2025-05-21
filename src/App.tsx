import './App.css'
import {Counter} from "./components/Counter.tsx";
import {SetCounter} from "./components/SetCounter.tsx";
import {useState} from "react";

function App() {

    const initialValues = {
        startValue: 0,
        maxValue: 5,
    }

    const [settings, setSettings] = useState(initialValues);

    const [tempValues, setTempValues] = useState(initialValues); // состояние временного значения

    //устанавливаем стартовые значения
    const setValuesHandler = (newStartValue: number, newMaxValue: number) => {
        setSettings({startValue: newStartValue, maxValue: newMaxValue})

        setTempValues({startValue: newStartValue, maxValue: newMaxValue}); // Обновляем временные значения
    }

    return (
        <div>
            <h1>counter</h1>
            <div className="displayWrapper">
                <SetCounter
                    setValues={setValuesHandler}
                    updateMin={settings.startValue}
                    updateMax={settings.maxValue}
                    onInputChange={setTempValues} // Передаём функцию для обновления tempValues
                />
                <Counter startValue={settings.startValue}
                         maxValue={settings.maxValue}

                         tempStartValue={tempValues.startValue} // Передаём временные значения
                         tempMaxValue={tempValues.maxValue}
                />
            </div>
        </div>

    )
}

export default App
