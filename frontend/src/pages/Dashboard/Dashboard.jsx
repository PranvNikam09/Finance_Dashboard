import { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { format, parseISO } from 'date-fns';
import './Dashboard.css';

const Dashboard = () => {
  const { transactions } = useFinance();

  // Derived calculations for summary cards and charts
  const {
    totalBalance,
    totalIncome,
    totalExpense,
    trendData,
    expenseCategoryData
  } = useMemo(() => {
    let tInc = 0;
    let tExp = 0;
    const catMap = {};
    const dateMap = {};

    // Sort transactions by date ascending for trend calculation
    const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    let runningBalance = 0;

    sortedTx.forEach(t => {
      const dateStr = format(parseISO(t.date), 'MMM dd');
      
      if (!dateMap[dateStr]) {
        dateMap[dateStr] = { date: dateStr, balance: runningBalance, income: 0, expense: 0 };
      }

      if (t.type === 'income') {
        tInc += t.amount;
        runningBalance += t.amount;
        dateMap[dateStr].income += t.amount;
      } else if (t.type === 'expense') {
        const absAmt = Math.abs(t.amount);
        tExp += absAmt;
        runningBalance -= absAmt;
        dateMap[dateStr].expense += absAmt;
        catMap[t.category] = (catMap[t.category] || 0) + absAmt;
      }
      
      dateMap[dateStr].balance = runningBalance;
    });

    // Formatting for charts
    const tData = Object.values(dateMap);
    
    // Categorical Data
    const cData = Object.keys(catMap).map(cat => ({
      name: cat,
      value: catMap[cat]
    }));

    return {
      totalBalance: tInc - tExp,
      totalIncome: tInc,
      totalExpense: tExp,
      trendData: tData,
      expenseCategoryData: cData
    };
  }, [transactions]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p className="subtitle">Welcome back! Here is a summary of your finances.</p>
      </div>

      <div className="summary-cards-flat">
        <div className="card-flat">
          <p className="stat-label">Total Balance</p>
          <h2 className="stat-number text-purple">{formatCurrency(totalBalance)}</h2>
        </div>
        
        <div className="card-flat">
          <p className="stat-label">Total Income</p>
          <h2 className="stat-number text-teal">+{formatCurrency(totalIncome)}</h2>
        </div>

        <div className="card-flat">
          <p className="stat-label">Total Expenses</p>
          <h2 className="stat-number text-red">-{formatCurrency(totalExpense)}</h2>
        </div>
      </div>

      <div className="dashboard-charts-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        
        {/* Time-Based Visualization: Balance Trend */}
        <div className="chart-card glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>Balance Trend</h3>
          <div className="chart-container" style={{ height: '300px' }}>
            {trendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7950f2" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7950f2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" opacity={0.5} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#adb5bd', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#adb5bd', fontSize: 12 }}
                    dx={-10}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Area type="monotone" dataKey="balance" stroke="#7950f2" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                  No transaction data over time.
                </div>
            )}
          </div>
        </div>

        {/* Categorical Visualization: Spending Breakdown */}
        <div className="chart-card glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>Spending Categories</h3>
          <div className="chart-container" style={{ height: '300px' }}>
            {expenseCategoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseCategoryData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }} barSize={15}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e9ecef" opacity={0.5} />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    width={80}
                  />
                  <RechartsTooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Bar dataKey="value" fill="#f64e60" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                  No expenses recorded.
                </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
