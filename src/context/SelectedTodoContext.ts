import React, { Dispatch, SetStateAction } from "react";
import { Todo } from "../components/TodoList/TodoList";

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

export const SelectedTodoContext = React.createContext<_selectedTodoContext>
(new _selectedTodoContext({name: '', status: ''}, ()=>{}, 0, ()=>{}));