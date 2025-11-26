import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import SMEDashboard from './pages/SMEDashboard';
import ChatInterface from './pages/ChatInterface';
import MyAgents from './pages/MyAgents';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  return user ? <>{children}</> : <Navigate to="/" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  return !user ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

const DashboardRoute: React.FC = () => {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Route to appropriate dashboard based on user type
  return user.type === 'sme' ? <SMEDashboard /> : <Dashboard />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={<DashboardRoute />}
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatInterface />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-agents"
        element={
          <ProtectedRoute>
            <MyAgents />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Router>
  );
}

export default App;
