import { NavLink } from 'react-router-dom';
import {
  Monitor,
  Briefcase,
  Mail,
  Calendar,
  CreditCard,
  FileText,
  Box,
  LineChart,
  List,
  Map as MapIcon,
  ChevronRight,
  Aperture,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, isCollapsed, onClose }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <Aperture size={24} color="#ffffff" strokeWidth={2} />
          </div>
          {!isCollapsed && <h2>FINANCE</h2>}
        </div>
      </div>

      <div className="sidebar-scrollable">
        {!isCollapsed && <div className="nav-section-title">Main</div>}
        <nav className="sidebar-nav">
          <NavLink to="/" onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title={isCollapsed ? 'Dashboard' : ''}>
            <Monitor size={18} className="icon" />
            {!isCollapsed && <span>Dashboard</span>}
          </NavLink>
          <NavLink to="/transactions" onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title={isCollapsed ? 'Transactions' : ''}>
            <List size={18} className="icon" />
            {!isCollapsed && <span>Transactions</span>}
          </NavLink>
          <NavLink to="/insights" onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title={isCollapsed ? 'Insights' : ''}>
            <LineChart size={18} className="icon" />
            {!isCollapsed && <span>Insights</span>}
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme} title={isCollapsed ? (theme === 'dark' ? 'Light Mode' : 'Dark Mode') : ''}>
          {theme === 'dark' ? <Sun size={18} className="icon" color="#adb5bd" /> : <Moon size={18} className="icon" color="#adb5bd" />}
          {!isCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
