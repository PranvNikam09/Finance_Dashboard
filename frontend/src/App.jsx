import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FinanceProvider } from './context/FinanceContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';

function App() {
  return (
    <ThemeProvider>
      <FinanceProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="transactions" element={<Transactions />} />
            </Route>
          </Routes>
        </Router>
      </FinanceProvider>
    </ThemeProvider>
  );
}

export default App;
