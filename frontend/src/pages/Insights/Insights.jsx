import { useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { TrendingUp, TrendingDown, DollarSign, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import './Insights.css';

const COLORS = ['#38a4f8', '#54c8c3', '#7950f2', '#f64e60', '#ffb822', '#1bc5bd', '#3699ff'];

const Insights = () => {
  const { transactions } = useFinance();

  // Derived calculations
  const {
    totalIncome,
    totalExpense,
    highestSpendingCategory,
    categoryData,
    savingsRate
  } = useMemo(() => {
    let tInc = 0;
    let tExp = 0;
    const catMap = {};

    transactions.forEach(t => {
      if (t.type === 'income') {
        tInc += t.amount;
      } else if (t.type === 'expense') {
        const absAmt = Math.abs(t.amount);
        tExp += absAmt;
        catMap[t.category] = (catMap[t.category] || 0) + absAmt;
      }
    });

    let highestCat = { name: 'None', amount: 0 };
    const pData = [];
    Object.keys(catMap).forEach((cat) => {
      pData.push({ name: cat, value: catMap[cat] });
      if (catMap[cat] > highestCat.amount) {
        highestCat = { name: cat, amount: catMap[cat] };
      }
    });

    const sRate = tInc !== 0 ? (((tInc - tExp) / tInc) * 100).toFixed(1) : 0;

    return {
      totalIncome: tInc,
      totalExpense: tExp,
      highestSpendingCategory: highestCat,
      categoryData: pData,
      savingsRate: sRate
    };
  }, [transactions]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="insights-page">
      <div className="page-header">
        <h1>Financial Insights</h1>
        <p className="subtitle">Discover trends and analytical observations from your spending habits.</p>
      </div>

      <div className="insights-grid">
        <div className="insight-card glass-card">
          <div className="insight-icon bg-purple">
            <TrendingUp size={24} color="#fff" />
          </div>
          <div className="insight-info">
            <h3>Highest Spending</h3>
            <p className="insight-value">{highestSpendingCategory.name}</p>
            <p className="insight-sub">{formatCurrency(highestSpendingCategory.amount)} spent in total</p>
          </div>
        </div>

        <div className="insight-card glass-card">
          <div className="insight-icon bg-blue">
            <DollarSign size={24} color="#fff" />
          </div>
          <div className="insight-info">
            <h3>Savings Rate</h3>
            <p className="insight-value">{savingsRate}%</p>
            <p className="insight-sub">Of total income saved</p>
          </div>
        </div>
      </div>

      <div className="charts-grid mt-4">
        <div className="chart-card glass-card">
          <div className="card-header">
            <h3>Expense Breakdown</h3>
            <PieChartIcon size={18} className="text-muted" />
          </div>
          <div className="chart-container" style={{ height: '300px' }}>
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <RechartsTooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
               <div className="empty-chart">No expense data available</div>
            )}
          </div>
        </div>

        <div className="observation-card glass-card">
            <h3>Smart Observations</h3>
            <ul className="observations-list">
              <li>
                <div className="obs-bullet bg-teal"></div>
                <div className="obs-content">
                  <strong>Total Cashflow:</strong> You have an income of {formatCurrency(totalIncome)} against expenses of {formatCurrency(totalExpense)}.
                </div>
              </li>
              <li>
                <div className="obs-bullet bg-red"></div>
                <div className="obs-content">
                  <strong>Top Expense:</strong> The majority of your outgoing capital goes to <em>{highestSpendingCategory.name}</em>.
                </div>
              </li>
              {savingsRate > 20 && (
                <li>
                  <div className="obs-bullet bg-blue"></div>
                  <div className="obs-content">
                    <strong>Great Saving:</strong> Your saving rate of {savingsRate}% is excellent. Keep it up!
                  </div>
                </li>
              )}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Insights;
