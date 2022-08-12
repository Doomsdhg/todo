import { FC, useContext, useEffect, useState } from 'react';
import { Constants } from '../../constants/constants';
import { SelectedTodoContext } from '../../context/SelectedTodoContext';
import { TodosArrayContext } from '../../context/TodosArrayContext';
import { Todo } from '../TodoList/TodoList';
import './TodoManagingPanel.scss';

interface TodoManagingPanelProps {}

const TodoManagingPanel: FC<TodoManagingPanelProps> = () => {
  const {selectedTodo, selectedTodoIndex} = useContext(SelectedTodoContext);
  const {todosArray, setTodosArray} = useContext(TodosArrayContext);
  const [todoNameInput, setTodoName] = useState<string>(selectedTodo.name);
  const [todoStatusInput, setTodoStatus] = useState<todoStatus>(selectedTodo.status || Constants.TODOS_STATUS.AWAITS);
  const [displayValidationError, setDisplayValidationError] = useState<boolean>(Constants.GENERAL.FALSE);
  const noTodoSelected: boolean = selectedTodo.status === Constants.TODOS_STATUS.NOT_INITIALIZED;

  const refreshInputValues = useEffect(() => {
    setTodoName(selectedTodo.name);
    setTodoStatus(selectedTodo.status);
  }, [selectedTodo])

  const saveChanges = () => {
    if (selectedTodo.status === Constants.TODOS_STATUS.NOT_INITIALIZED){
      setDisplayValidationError(Constants.GENERAL.TRUE)
    } else {
      setDisplayValidationError(Constants.GENERAL.FALSE)
      const newArray: Todo[] = [...todosArray];
      newArray[selectedTodoIndex] = new Todo(todoNameInput, todoStatusInput);
      setTodosArray([...newArray]);
    }
  }

  const renderValidationError = () => {
    return displayValidationError ?
    <span className="editing-container__validation-error">
      {Constants.ERRORS.VALIDATION.FORBIDDEN_EMPTY_NAME}
    </span> :
    null
  }

  return (
    <div className="todo-managing-panel-container">
      <div className="managing-panel-title">
        <h1>Todo editing</h1>
      </div>
    {noTodoSelected ?
      <div className="no-todo-selected">
        <h2>No todo selected</h2>
      </div> :
        <div className="editing-container">
          <form className="editing-name-form">
            <span className="editing-name-form__title">Todo name</span>
            <input className="editing-name-form__input" 
            type="text" 
            defaultValue={todoNameInput} 
            onChange={(e) => setTodoName(e.target.value)}>
            </input>
          </form>
          {renderValidationError()}
          <form className="editing-status-form">
            <span className="editing-status-form__title">Select todo status</span>
            <select className="editing-status-form__select" 
            onChange={(e) => {setTodoStatus(e.target.value as todoStatus)}}>
              <option selected={todoStatusInput === Constants.TODOS_STATUS.AWAITS}>
                {Constants.TODOS_STATUS.AWAITS}
              </option>
              <option selected={todoStatusInput === Constants.TODOS_STATUS.IN_PROCESS}>
                {Constants.TODOS_STATUS.IN_PROCESS}
              </option>
              <option selected={todoStatusInput === Constants.TODOS_STATUS.DONE}>
                {Constants.TODOS_STATUS.DONE}
              </option>
            </select>
          </form>
          <button className="editing-container__save-changes-button" onClick={() => saveChanges()}>save changes</button>
        </div>}
    </div>
  )
};

export type todoStatus = "awaits" | "in process" | "done" | "";

export default TodoManagingPanel;
