import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content" style={{ marginLeft: 'var(--sidebar-width)' }}>
        <Header />
        <main className="page-content animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
