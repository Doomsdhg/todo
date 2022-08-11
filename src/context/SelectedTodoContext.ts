import React, { Dispatch, SetStateAction } from "react";
import { Todo } from "../components/TodoList/TodoList";
import { Constants } from "../constants/constants";

class _selectedTodoContext {
    selectedTodo: Todo;
    setSelectedTodo: Dispatch<SetStateAction<Todo>>;
    selectedTodoIndex: number;
    setSelectedTodoIndex: Dispatch<SetStateAction<number>>;

    constructor(
        selectedTodo: Todo, 
        setSelectedTodo: Dispatch<SetStateAction<Todo>>, 
        selectedTodoIndex: number, 
        setSelectedTodoIndex: Dispatch<SetStateAction<number>>){
        this.selectedTodo = selectedTodo;
        this.setSelectedTodo = setSelectedTodo;
        this.selectedTodoIndex = selectedTodoIndex;
        this.setSelectedTodoIndex = setSelectedTodoIndex;
    }
}

export const SelectedTodoContext = React.createContext<_selectedTodoContext>(
    new _selectedTodoContext(
    {
        name: Constants.GENERAL.EMPTY_STRING, 
        status: Constants.TODOS_STATUS.NOT_INITIALIZED
    }, 
    Constants.GENERAL.EMPTY_FUNCTION, 
    Constants.GENERAL.ZERO, 
    Constants.GENERAL.EMPTY_FUNCTION
    )
);