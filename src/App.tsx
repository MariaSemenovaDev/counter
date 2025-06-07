import './App.css'
import {Counter} from "./components/Counter.tsx";
import {SetCounter} from "./components/SetCounter.tsx";
import React, {useEffect, useState} from "react";


type VariantType = "variant1" | "variant2" | "variant3"

function App() {

    // Загружаем начальные значения из localStorage
    const loadSettings = () => {
        const saved = localStorage.getItem("counterSettings");
        return saved ? JSON.parse(saved) : { startValue: 0, maxValue: 5 };
    };

    const [settings, setSettings] = useState(loadSettings);
    const [changes, setChanges] = useState(false);
    const [tempValues, setTempValues] = useState(loadSettings); // состояние временного значения



    // Сохраняем настройки при их изменении
    useEffect(() => {
        localStorage.setItem("counterSettings", JSON.stringify(settings));
    }, [settings]);

    //устанавливаем стартовые значения
    const setValuesHandler = (newStartValue: number, newMaxValue: number) => {
        const newSettings = {startValue: newStartValue, maxValue: newMaxValue};
        setSettings(newSettings);
        setTempValues(newSettings);
        setChanges(true);
    };



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

                         changes={changes}
                />


                {/*<Button onClick={setsetsetHandler}>setsetset</Button>*/}

            </div>

        </div>

    )
}

export default App
