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
          <div className="nav-link">
            <Briefcase size={18} className="icon" />
            <span>User Interface</span>
            <ChevronRight size={16} className="chevron" />
          </div>
          <div className="nav-link">
            <Mail size={18} className="icon" />
            <span>Email</span>
            <ChevronRight size={16} className="chevron" />
          </div>
          <div className="nav-link">
            <Calendar size={18} className="icon" />
            <span>Calendar</span>
          </div>
          <div className="nav-link">
            <CreditCard size={18} className="icon" />
            <span>Contact</span>
            <ChevronRight size={16} className="chevron" />
          </div>
          <div className="nav-link">
            <FileText size={18} className="icon" />
            <span>Forms</span>
            <span className="badge badge-green">7</span>
          </div>
          <div className="nav-link">
            <Box size={18} className="icon" />
            <span>Icons</span>
            <ChevronRight size={16} className="chevron" />
          </div>
          <div className="nav-link">
            <LineChart size={18} className="icon" />
            <span>Charts</span>
            <ChevronRight size={16} className="chevron" />
          </div>
          <div className="nav-link">
            <List size={18} className="icon" />
            <span>Tables</span>
            <ChevronRight size={16} className="chevron" />
          </div>
          <div className="nav-link">
            <MapIcon size={18} className="icon" />
            <span>Maps</span>
            <span className="badge badge-red">2</span>
          </div>
        </nav>
        <div className="nav-section-title" style={{ paddingBottom: '2rem' }}>Extras</div>
      </div>
    </aside>
  );
};

export default Sidebar;
