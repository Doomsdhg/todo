import { FC, useContext } from 'react';
import { SelectedTodoContext } from '../../context/SelectedTodoContext';
import { Todo } from '../TodoList/TodoList';
import { todoStatus } from '../TodoManagingPanel/TodoManagingPanel';
import './TodoItemCard.scss';

export interface TodoItemCardProps extends Todo {
  key: string,
  name: string,
  status: todoStatus,
  index: number,
  deleteCallback: (index: number) => void
}

export const TodoItemCard: FC<TodoItemCardProps> = (props: TodoItemCardProps) => {
  const {setSelectedTodo, setSelectedTodoIndex} = useContext(SelectedTodoContext);

  const selectThisTodo = () => {
    setSelectedTodo(new Todo(props.name, props.status));
    setSelectedTodoIndex(props.index);
  }

  return (
  <div className="todo-item-card-wrapper" onClick={() => selectThisTodo()}>
    <div className="todo-item-card-wrapper__name">{props.name}</div>
    <button className="todo-item-card-wrapper__delete-button" 
    onClick={() => props.deleteCallback(props.index)}>
      X
    </button>
  </div>
  )
};

export default TodoItemCard;
