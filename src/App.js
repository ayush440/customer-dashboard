import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CustomerManagement from './components/CustomerManagement';
import CustomerStats from './components/CustomerStats';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="w-full p-6">
          <Routes>
            <Route path="/" element={<CustomerManagement />} />
            <Route path="/stats" element={<CustomerStats />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
