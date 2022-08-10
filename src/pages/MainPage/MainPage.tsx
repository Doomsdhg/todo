import TodoList from '../../components/TodoList/TodoList';
import TodoManagingPanel from '../../components/TodoManagingPanel/TodoManagingPanel';
import './MainPage.scss';

export function MainPage(){
  return (
    <div className="main-page-container">
      <TodoList />
      <TodoManagingPanel />
    </div>
)};

export default MainPage;
