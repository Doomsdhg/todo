import { useState } from "react";
import { Constants } from "../constants/constants";

export const useLocalStorage = function<T>(key: string, initialValue: T): [T, (newvalue: T) => void]{
    const jsonValue = localStorage.getItem(key);
    if (jsonValue === null){
        console.error(Constants.ERRORS.LOCAL_STORAGE.getNoValueError(key));
    }
    const startingValue = jsonValue ? JSON.parse(jsonValue) : initialValue;
    const [value, setValue] = useState(startingValue);
    const setNewValue = function(newValue: T): void{
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };
    return [value, setNewValue];
}