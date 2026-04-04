import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  // Mock data for the chart as in the image (2006 - 2018)
  const chartData = [
    { year: '2006', seriesA: 100, seriesB: 90 },
    { year: '2007', seriesA: 75, seriesB: 65 },
    { year: '2008', seriesA: 50, seriesB: 40 },
    { year: '2009', seriesA: 75, seriesB: 65 },
    { year: '2010', seriesA: 50, seriesB: 40 },
    { year: '2011', seriesA: 75, seriesB: 65 },
    { year: '2012', seriesA: 100, seriesB: 90 },
    { year: '2013', seriesA: 90, seriesB: 75 },
    { year: '2014', seriesA: 75, seriesB: 65 },
    { year: '2015', seriesA: 50, seriesB: 40 },
    { year: '2016', seriesA: 75, seriesB: 65 },
    { year: '2017', seriesA: 100, seriesB: 90 },
    { year: '2018', seriesA: 90, seriesB: 75 },
  ];

  return (
    <div className="dashboard-page">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }} barSize={5}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ecef" />
            <XAxis 
              dataKey="year" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#adb5bd', fontSize: 12 }} 
              dy={10}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#adb5bd', fontSize: 12 }}
              dx={-10}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <RechartsTooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
            />
            <Bar dataKey="seriesA" fill="#38a4f8" radius={[0, 0, 0, 0]} />
            <Bar dataKey="seriesB" fill="#54c8c3" radius={[0, 0, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-tabs">
        <button className="tab-btn active-outline">Year 2017</button>
        <button className="tab-btn outline teal">Year 2018</button>
        <button className="tab-btn outline">Year 2019</button>
      </div>

      <div className="summary-cards-flat">
        <div className="card-flat">
          <h2 className="stat-number text-teal">15,852</h2>
          <p className="stat-label">Monthly Statistics</p>
        </div>
        
        <div className="card-flat">
          <h2 className="stat-number text-purple">9,514</h2>
          <p className="stat-label">New Orders</p>
        </div>

        <div className="card-flat">
          <h2 className="stat-number text-blue">289</h2>
          <p className="stat-label">New Users</p>
        </div>

        <div className="card-flat">
          <h2 className="stat-number text-red">5,220</h2>
          <p className="stat-label">Unique Visitors</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
