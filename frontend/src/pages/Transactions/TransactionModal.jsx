import { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { X } from 'lucide-react';
import './TransactionModal.css';

const TransactionModal = ({ onClose }) => {
  const { addTransaction } = useFinance();
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'General',
    type: 'expense'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    // Convert amount to a number, and make it negative if expense
    let amountNum = Number(formData.amount);
    if (formData.type === 'expense' && amountNum > 0) {
      amountNum = -amountNum;
    } else if (formData.type === 'income' && amountNum < 0) {
      amountNum = Math.abs(amountNum);
    }

    addTransaction({
      ...formData,
      amount: amountNum
    });
    
    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-content glass-card">
        <div className="modal-header">
          <h2>Add New Transaction</h2>
          <button className="btn-icon close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group type-selector">
              <label className={formData.type === 'income' ? 'active income' : ''}>
                <input 
                  type="radio" 
                  name="type" 
                  value="income" 
                  checked={formData.type === 'income'} 
                  onChange={handleChange} 
                />
                Income
              </label>
              <label className={formData.type === 'expense' ? 'active expense' : ''}>
                <input 
                  type="radio" 
                  name="type" 
                  value="expense" 
                  checked={formData.type === 'expense'} 
                  onChange={handleChange} 
                />
                Expense
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input 
              type="text" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="form-input" 
              placeholder="e.g., Grocery Shopping"
              required 
            />
          </div>

          <div className="form-row split">
            <div className="form-group">
              <label className="form-label">Amount</label>
              <input 
                type="number" 
                name="amount" 
                value={formData.amount} 
                onChange={handleChange} 
                className="form-input" 
                placeholder="0.00"
                step="0.01"
                min="0.01"
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Date</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                className="form-input" 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              className="form-input"
            >
              {formData.type === 'expense' ? (
                <>
                  <option value="General">General</option>
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Housing">Housing</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                </>
              ) : (
                <>
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Investments">Investments</option>
                  <option value="Other">Other</option>
                </>
              )}
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
