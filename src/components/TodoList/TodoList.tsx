import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import { Constants } from '../../constants/constants';
import { TodosArrayContext } from '../../context/TodosArrayContext';
import TodoItemCard, { TodoItemCardProps } from '../TodoItemCard/TodoItemCard';
import { todoStatus } from '../TodoManagingPanel/TodoManagingPanel';
import './TodoList.scss';

const TodoList: FC = function(){
  const [displayAddingPanel, setDisplayAddingPanel] = useState<boolean>(Constants.GENERAL.FALSE);
  const [todoNameInput, setTodoNameInput] = useState<string>(Constants.GENERAL.EMPTY_STRING);
  const [displayValidationError,  setDisplayValidationError] = useState<boolean>(Constants.GENERAL.FALSE);
  const {todosArray, setTodosArray} = useContext(TodosArrayContext);

  const renderTodosCards = function(): ReactElement<TodoItemCardProps>[] {
    return todosArray.map((item, index) => {
      return <TodoItemCard 
      key={item.name + String(index)}
      name={item.name}
      status={item.status}
      index={index}
      deleteCallback={deleteTodo} />
    })
  }

  const toggleAddingPanel = () => {
    setDisplayAddingPanel(!displayAddingPanel);
  }

  const todoInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoNameInput(e.target.value);
  }

  const handleAddingTodo = () => {
    if (todoNameInput === Constants.GENERAL.EMPTY_STRING){
      setDisplayValidationError(Constants.GENERAL.TRUE);
    } else {
      setDisplayValidationError(Constants.GENERAL.FALSE);
      setTodosArray([...todosArray, new Todo(todoNameInput, Constants.TODOS_STATUS.AWAITS)]);
    }
  }

  const deleteTodo = (index: number) => {
    const newTodosArray = [...todosArray];
    newTodosArray.splice(index, 1);
    setTodosArray(newTodosArray);
  }

  const mouseDragHandler = (e: MouseEvent) => {
    const resizableElement = document.getElementById('todo-list-container');
    resizableElement!.style['width'] = `${e.screenX}px`;
  }

  const startDragHandler = (e: React.MouseEvent) => {
    console.log(e);
    document.addEventListener('mouseup', finishDragHandler)
    document.addEventListener('mousemove', mouseDragHandler);
  }

  const finishDragHandler = () => {
    document.removeEventListener('mousemove', mouseDragHandler);
  }

  const renderAddingPanel = () => {
    return displayAddingPanel ? 
    <div className="adding-panel">
      <form className="adding-panel__form">
        <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => todoInputHandler(e)}>
        </input>
        <button className="adding-panel__adding-button" 
        onClick={() => handleAddingTodo()}>
          add
        </button>
      </form>
    </div> :
    null;
  }

  const renderValidationError = () => {
    return displayAddingPanel && displayValidationError ?
    <span className='validation-error'>
      {Constants.ERRORS.VALIDATION.FORBIDDEN_EMPTY_NAME}
    </span> :
    null;
  }

  return (
    <div className="todo-list-container" id="todo-list-container">
      <div className="todo-list">
        <div className="todos-header">
          <h1>TODO list</h1>
          <button className="todos-header__toggle-adding-panel-button" onClick={() => toggleAddingPanel()}>+</button>
        </div>
        {renderAddingPanel()}
        {renderValidationError()}
        {renderTodosCards()}
      </div>
      <div className="resizing-drag"
      onMouseDown={(e) => startDragHandler(e)}
      ></div>
    </div>
  )
};

export class Todo {
  public name: string;
  public status: todoStatus;

  constructor(name: string, status: todoStatus){
    this.name = name;
    this.status = status;
  }
}

export default TodoList;