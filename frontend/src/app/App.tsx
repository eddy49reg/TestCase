import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MessagesPage from '../components/messages/MessagesPage';
import './App.scss';
import AuthPage from '../components/auth/AuthPage';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<AuthPage />} />
        <Route path="/main" element={<MessagesPage />} />
      </Routes>
    </div>
  );
}

export default App;
