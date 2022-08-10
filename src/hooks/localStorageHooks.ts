import { useState } from "react";

export const useLocalStorage = function<T>(key: string, initialValue: T): [T, (newvalue: T) => void]{
    const encodedValue = localStorage.getItem(key);
    if (encodedValue === null){
        console.error(`no value found in localStorage by passed key. passed key is: '${key}'`);
    }
    const decodedValue = encodedValue ? JSON.parse(encodedValue) : initialValue;
    const [value, setValue] = useState(decodedValue);
    const setNewValue = function(newValue: T): void{
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };
    return [value, setNewValue];
}