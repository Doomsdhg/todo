import { FC } from 'react';
import { Todo } from '../TodoList/TodoList';
import './TodoItemCard.scss';

export interface TodoItemCardProps extends Todo {
  key: string,
  name: string,
  status: string,
  index: number,
  deleteCallback: (index: number) => void
}

export const TodoItemCard: FC<TodoItemCardProps> = (props: TodoItemCardProps) => {
  return <div className="todo-item-card-wrapper">
    <span>{props.name}</span>
    <button onClick={() => props.deleteCallback(props.index)}>X</button>
  </div>
};

export default TodoItemCard;
