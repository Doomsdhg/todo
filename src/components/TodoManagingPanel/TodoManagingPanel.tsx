import { FC, useContext, useState } from 'react';
import { SelectedTodoContext } from '../../context/SelectedTodoContext';
import { TodosArrayContext } from '../../context/TodosArrayContext';
import { Todo } from '../TodoList/TodoList';
import './TodoManagingPanel.scss';

interface TodoManagingPanelProps {}

const TodoManagingPanel: FC<TodoManagingPanelProps> = () => {
  const {selectedTodo, selectedTodoIndex} = useContext(SelectedTodoContext);
  const [todoName, setTodoName] = useState<string>(selectedTodo.name);
  const [todoStatus, setTodoStatus] = useState<string>(selectedTodo.status);
  const {todosArray, setTodosArray} = useContext(TodosArrayContext);
  const noTodoSelected = selectedTodo.name === '' && selectedTodo.status === '';

  const saveChanges = () => {
    const newArray: Todo[] = [...todosArray];
    newArray[selectedTodoIndex] = new Todo(todoName, todoStatus);
    setTodosArray([...newArray]);
  }

  return (
    noTodoSelected ?
    <span>no todo selected</span> :
    <div className="todo-managing-panel-container">
      <div>
        <form>
          <input type="text" defaultValue={selectedTodo.name} onChange={(e) => setTodoName(e.target.value)}>
          </input>
        </form>
        <form>
          <select onChange={(e) => setTodoStatus(e.target.value)}>
            <option selected={selectedTodo.status === "awaits"}>awaits</option>
            <option selected={selectedTodo.status === "in process"}>in process</option>
            <option selected={selectedTodo.status === "finished"}>finished</option>
          </select>
        </form>
        <button onClick={() => saveChanges()}>save</button>
      </div>
    </div>
  )
};

export default TodoManagingPanel;
