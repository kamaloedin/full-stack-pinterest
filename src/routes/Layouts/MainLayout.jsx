import { Outlet } from 'react-router';
import LeftBar from '../../components/LeftBar/LeftBar';
import TopBar from '../../components/TopBar/TopBar';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="app">
      <LeftBar />
      <div className="content">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
