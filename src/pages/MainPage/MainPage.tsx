import { useState } from 'react';
import TodoList, { Todo } from '../../components/TodoList/TodoList';
import TodoManagingPanel from '../../components/TodoManagingPanel/TodoManagingPanel';
import { Constants } from '../../constants/constants';
import { SelectedTodoContext } from '../../context/SelectedTodoContext';
import { TodosArrayContext } from '../../context/TodosArrayContext';
import { useLocalStorage } from '../../hooks/localStorageHooks';
import './MainPage.scss';

export function MainPage(){
  const [selectedTodo, setSelectedTodo] = useState(
    new Todo(
      Constants.GENERAL.EMPTY_STRING, 
      Constants.TODOS_STATUS.NOT_INITIALIZED
    )
  );
  const [selectedTodoIndex, setSelectedTodoIndex] = useState<number>(Constants.GENERAL.ZERO);
  const [todosArray, setTodosArray] = useLocalStorage<Todo[]>(
    Constants.ACCESSORS.LOCAL_STORAGE.TODOS, 
    Constants.GENERAL.EMPTY_ARRAY
  );

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
