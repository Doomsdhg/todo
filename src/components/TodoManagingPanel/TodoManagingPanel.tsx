import { FC, useContext, useState } from 'react';
import { Constants } from '../../constants/constants';
import { SelectedTodoContext } from '../../context/SelectedTodoContext';
import { TodosArrayContext } from '../../context/TodosArrayContext';
import { Todo } from '../TodoList/TodoList';
import './TodoManagingPanel.scss';

interface TodoManagingPanelProps {}

const TodoManagingPanel: FC<TodoManagingPanelProps> = () => {
  const {selectedTodo, selectedTodoIndex} = useContext(SelectedTodoContext);
  const [todoName, setTodoName] = useState<string>(selectedTodo.name);
  const [todoStatus, setTodoStatus] = useState<todoStatus>(selectedTodo.status || Constants.TODOS_STATUS.AWAITS);
  const [displayValidationError, setDisplayValidationError] = useState<boolean>(Constants.GENERAL.FALSE);
  const {todosArray, setTodosArray} = useContext(TodosArrayContext);
  const noTodoSelected: boolean = selectedTodo.status === Constants.TODOS_STATUS.NOT_INITIALIZED;

  const saveChanges = () => {
    if (todoName === Constants.GENERAL.EMPTY_STRING){
      setDisplayValidationError(Constants.GENERAL.TRUE)
    } else {
      setDisplayValidationError(Constants.GENERAL.FALSE)
      const newArray: Todo[] = [...todosArray];
      newArray[selectedTodoIndex] = new Todo(todoName, todoStatus);
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
    noTodoSelected ?
    <span>no todo selected</span> :
    <div className="todo-managing-panel-container">
    <span>{noTodoSelected}</span>
      <div className="editing-container">
        <form>
          <input type="text" defaultValue={selectedTodo.name} onChange={(e) => setTodoName(e.target.value)}>
          </input>
        </form>
        {renderValidationError()}
        <form>
          <select onChange={(e) => {setTodoStatus(e.target.value as todoStatus)}}>
            <option selected={selectedTodo.status === Constants.TODOS_STATUS.AWAITS}>
              {Constants.TODOS_STATUS.AWAITS}
            </option>
            <option selected={selectedTodo.status === Constants.TODOS_STATUS.IN_PROCESS}>
              {Constants.TODOS_STATUS.IN_PROCESS}
            </option>
            <option selected={selectedTodo.status === Constants.TODOS_STATUS.DONE}>
              {Constants.TODOS_STATUS.DONE}
            </option>
          </select>
        </form>
        <button onClick={() => saveChanges()}>save</button>
      </div>
    </div>
  )
};

export type todoStatus = "awaits" | "in process" | "done" | "";

export default TodoManagingPanel;
