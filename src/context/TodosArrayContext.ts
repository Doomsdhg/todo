import React from "react";
import { Todo } from "../components/TodoList/TodoList";
import { Constants } from "../constants/constants";

class _todosArrayContext {
    todosArray: Todo[];
    setTodosArray: (newValue: Todo[]) => void;

    constructor(todosArray: Todo[], setTodosArray: (newValue: Todo[]) => void){
        this.todosArray = todosArray;
        this.setTodosArray = setTodosArray;
    }
}

export const TodosArrayContext = React.createContext<_todosArrayContext>(
    new _todosArrayContext(
        Constants.GENERAL.EMPTY_ARRAY, 
        Constants.GENERAL.EMPTY_FUNCTION
    )
);
