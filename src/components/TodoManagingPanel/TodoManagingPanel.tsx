import React, { FC } from 'react';
import './TodoManagingPanel.scss';

interface TodoManagingPanelProps {}

const TodoManagingPanel: FC<TodoManagingPanelProps> = () => (
  <div className="todo-managing-panel-container">
    <span>
      TodoManagingPanel Component
    </span>
  </div>
);

export default TodoManagingPanel;
