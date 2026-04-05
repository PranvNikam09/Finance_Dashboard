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
  Aperture
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <Aperture size={24} color="#ffffff" strokeWidth={2} />
          </div>
          <h2>FONIK</h2>
        </div>
      </div>

      <div className="sidebar-scrollable">
        <div className="nav-section-title">Main</div>
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Monitor size={18} className="icon" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/transactions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <List size={18} className="icon" />
            <span>Transactions</span>
          </NavLink>
          <NavLink to="/insights" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <LineChart size={18} className="icon" />
            <span>Insights</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
