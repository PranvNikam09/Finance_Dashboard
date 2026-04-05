import { useFinance } from '../../context/FinanceContext';
import { Menu, Bell, Download, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = ({ toggleSidebar }) => {
  const { role, setRole, transactions } = useFinance();

  const toggleRole = () => {
    setRole(role === 'admin' ? 'viewer' : 'admin');
  };

  const exportAllToCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(tx => 
        `"${tx.date}","${tx.description.replace(/"/g, '""')}","${tx.category}","${tx.type}",${tx.amount}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `all_transactions.csv`;
    link.click();
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="btn-icon menu-btn" onClick={toggleSidebar}>
          <Menu size={22} color="#333333" strokeWidth={2} />
        </button>
        <span className="header-title">Dashboard</span>
      </div>

      <div className="header-right custom-header-group">
        <div className="role-selector-clean">
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="viewer">Viewer Mode</option>
            <option value="admin">Admin Mode</option>
          </select>
          <ChevronDown size={16} className="chevron-icon" />
        </div>

        <div className="live-badge">
          <span className="live-dot"></span>
          <span>Live</span>
        </div>
        
        <button className="btn-icon header-dark-btn" onClick={exportAllToCSV} title="Export CSV">
          <Download size={18} color="#8c9aab" />
        </button>
        
        <div className="notification-wrapper">
          <button className="btn-icon header-dark-btn">
            <Bell size={18} color="#8c9aab" />
          </button>
        </div>
        
        <div className={`role-avatar-circle ${role === 'admin' ? 'admin' : 'viewer'}`} onClick={toggleRole} title="Toggle Role">
          <span>{role === 'admin' ? 'A' : 'V'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
