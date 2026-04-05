import { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Plus, Search, Filter, Trash2, ArrowUpCircle, ArrowDownCircle, Download } from 'lucide-react';
import TransactionModal from './TransactionModal';
import { format, parseISO } from 'date-fns';
import './Transactions.css';

const Transactions = () => {
  const { transactions, role, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc' based on date
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Apply filters, search and sort
  const filteredTransactions = transactions
    .filter(t => filterType === 'all' || t.type === filterType)
    .filter(t => 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(val));

  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(tx => 
        `"${format(parseISO(tx.date), 'yyyy-MM-dd')}","${tx.description.replace(/"/g, '""')}","${tx.category}","${tx.type}",${tx.amount}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  return (
    <div className="transactions-page">
      <div className="page-header flex-between">
        <div>
          <h1>Transactions</h1>
          <p className="subtitle">Manage and track your financial activities.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary animate-fade-in" onClick={exportToCSV}>
            <Download size={18} />
            <span className="hide-on-mobile">Export CSV</span>
          </button>
          {role === 'admin' && (
            <button className="btn btn-primary animate-fade-in" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      </div>

      <div className="controls-bar glass-card">
        <div className="search-box">
          <Search size={18} className="icon" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-transparent"
          />
        </div>

        <div className="filters-group">
          <div className="filter-item">
            <Filter size={16} />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          
          <div className="filter-item">
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="transactions-list glass-card">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Search size={32} />
            </div>
            <h3>No transactions found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                  {role === 'admin' && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="transaction-row">
                    <td>
                      <div className="tx-desc-cell">
                        {tx.type === 'income' ? (
                          <ArrowUpCircle className="tx-icon income" size={20} />
                        ) : (
                          <ArrowDownCircle className="tx-icon expense" size={20} />
                        )}
                        <span className="tx-desc">{tx.description}</span>
                      </div>
                    </td>
                    <td><span className="category-badge">{tx.category}</span></td>
                    <td>{format(parseISO(tx.date), 'MMM dd, yyyy')}</td>
                    <td className={`tx-amount ${tx.type}`}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                    {role === 'admin' && (
                      <td>
                        <button 
                          className="btn-icon delete-btn" 
                          onClick={() => deleteTransaction(tx.id)}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && <TransactionModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Transactions;
