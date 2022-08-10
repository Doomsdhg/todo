import { ChangeEvent, FC, ReactElement, useState } from 'react';
import { useLocalStorage } from '../../hooks/localStorageHooks';
import TodoItemCard, { TodoItemCardProps } from '../TodoItemCard/TodoItemCard';
import './TodoList.scss';

const TodoList: FC = function(){

  const [todosArray, setTodosArray] = useLocalStorage<Todo[]>('todos', []);

  const [displayAddingPanel, setDisplayAddingPanel] = useState<boolean>(false);

  const [todoNameInput, setTodoNameInput] = useState<string>('');

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

  const addClickHandler = () => {
    console.log([...todosArray, new Todo(todoNameInput, 'awaits')]);
    setTodosArray([...todosArray, new Todo(todoNameInput, 'awaits')]);
  }

  const deleteTodo = (index: number) => {
    const newTodosArray = [...todosArray];
    newTodosArray.splice(index, 1);
    setTodosArray(newTodosArray);
  }

  const renderAddingPanel = () => {
    return displayAddingPanel ? 
    <div className="todos-adding-panel">
      <form>
        <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => todoInputHandler(e)}>
        </input>
      </form>
      <button onClick={() => addClickHandler()}></button>
    </div> :
    null;
  }

  return (
    <div className="todo-list-container">
      <div className="todos-header">
        <span>TODO list</span>
        <button onClick={() => toggleAddingPanel()}>+</button>
      </div>
      {renderAddingPanel()}
      {renderTodosCards()}
    </div>
  )
};

export class Todo {
  public name: string;
  public status: string;

  constructor(name: string, status: string){
    this.name = name;
    this.status = status;
  }
}

export default TodoList;