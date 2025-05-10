import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './containers/Login';
import { Orders } from './containers/Orders';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default App;