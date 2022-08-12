import { todoStatus } from "../components/TodoManagingPanel/TodoManagingPanel";


class TodoStatus {
    public static AWAITS: todoStatus = "awaits";
    public static IN_PROCESS: todoStatus = "in-process";
    public static DONE: todoStatus = "done";
    public static NOT_INITIALIZED: todoStatus = "";
}

class General {
    public static EMPTY_STRING: string = "";
    public static EMPTY_FUNCTION: () => void = () => {};
    public static EMPTY_ARRAY: [] = [];
    public static ZERO: number = 0;
    public static TRUE: boolean = true;
    public static FALSE: boolean = false;
}

class LocalStorageErrors {
    public static getNoValueError(key: string){
        return `No value found in localStorage by passed key. Passed key is: '${key}'`;
    }
}

class ValidationErrors {
    public static FORBIDDEN_EMPTY_NAME = "todo name must not be empty!";
}

class Errors {
    public static LOCAL_STORAGE = LocalStorageErrors;
    public static VALIDATION = ValidationErrors;
}

class LocalStorageAccessors {
    public static TODOS = "todos";
}

class Accessors {
    public static LOCAL_STORAGE = LocalStorageAccessors;
}

export class Constants {
    public static TODOS_STATUS = TodoStatus;
    public static GENERAL = General;
    public static ERRORS = Errors;
    public static ACCESSORS = Accessors;
}