import { useFinance } from '../../context/FinanceContext';
import { Menu, Search, Maximize, Bell, Settings, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { role } = useFinance();

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
        
        <div className="lang-switcher">
          <img src="https://flagcdn.com/w20/us.png" alt="US" className="flag-img" />
          <span className="lang-text">English</span>
          <ChevronDown size={14} strokeWidth={2.5} className="dropdown-icon" />
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
