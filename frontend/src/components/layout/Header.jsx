import { useFinance } from '../../context/FinanceContext';
import { Menu, Search, Maximize, Bell, Settings, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { role, setRole } = useFinance();

  return (
    <header className="header">
      <div className="header-left">
        <button className="btn-icon menu-btn">
          <Menu size={22} color="#333333" strokeWidth={2} />
        </button>
        <span className="header-title">Dashboard</span>
      </div>
      
      <div className="header-right">
        <button className="btn-icon text-muted">
          <Search size={18} strokeWidth={2} />
        </button>
        
        <div className="role-switcher" style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-secondary)', padding: '4px 10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', cursor: 'pointer', fontWeight: 500 }}
          >
            <option value="viewer">Viewer Mode</option>
            <option value="admin">Admin Mode</option>
          </select>
        </div>
        <button className="btn-icon text-muted">
          <Maximize size={18} strokeWidth={2} />
        </button>
        
        <div className="notification-wrapper">
          <button className="btn-icon text-muted">
            <Bell size={18} strokeWidth={2} className="bell-icon" />
          </button>
          <span className="notification-badge">3</span>
        </div>
        
        <div className="user-profile">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="User" 
            className="avatar" 
          />
        </div>
        
        <button className="btn-icon text-muted">
          <Settings size={18} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
};

export default Header;
