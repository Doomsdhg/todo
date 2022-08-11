import { useState } from 'react';
import TodoList, { Todo } from '../../components/TodoList/TodoList';
import TodoManagingPanel from '../../components/TodoManagingPanel/TodoManagingPanel';
import { SelectedTodoContext } from '../../context/SelectedTodoContext';
import { TodosArrayContext } from '../../context/TodosArrayContext';
import { useLocalStorage } from '../../hooks/localStorageHooks';
import './MainPage.scss';

export function MainPage(){
  const [selectedTodo, setSelectedTodo] = useState(new Todo('',''));
  const [selectedTodoIndex, setSelectedTodoIndex] = useState<number>(0);
  const [todosArray, setTodosArray] = useLocalStorage<Todo[]>('todos', []);

  return (
    <TodosArrayContext.Provider value={{todosArray, setTodosArray}}>
      <SelectedTodoContext.Provider value={{selectedTodo, setSelectedTodo, selectedTodoIndex, setSelectedTodoIndex}}>
        <div className="main-page-container">
          <TodoList />
          <TodoManagingPanel />
        </div>
      </SelectedTodoContext.Provider>
    </TodosArrayContext.Provider>
)};

export default MainPage;
