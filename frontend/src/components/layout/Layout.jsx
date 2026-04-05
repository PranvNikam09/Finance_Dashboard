import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={`app-container ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} isCollapsed={isCollapsed} onClose={closeSidebar} />
      {/* Overlay to close sidebar on mobile when clicked outside */}
      {isSidebarOpen && isMobile && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}
      <div className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="page-content animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
