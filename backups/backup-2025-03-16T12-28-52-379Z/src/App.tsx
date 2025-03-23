import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { DashboardStats } from './components/DashboardStats';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ResetPassword } from './pages/ResetPassword';
import { MaitreOeuvre } from './pages/MaitreOeuvre';
import { MaitreOuvrage } from './pages/MaitreOuvrage';
import { Entreprise } from './pages/Entreprise';
import { Particuliers } from './pages/Particuliers';
import { Agents } from './pages/Agents';
import { Workspace } from './pages/Workspace';
import { Marketplace } from './pages/Marketplace';
import { Comptabilite } from './pages/Comptabilite';
import { Landing } from './pages/Landing';
import { Pricing } from './pages/Pricing';
import { Settings } from './pages/Settings';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FinanceProvider } from './contexts/FinanceContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { PopupManager } from './components/PopupManager';
import type { KPI } from './types';

const mockStats: KPI[] = [
  { label: 'Projets Actifs', value: 12, change: 8, trend: 'up' },
  { label: 'Budget Total', value: 2500000, change: 12, trend: 'up' },
  { label: 'ROI Moyen', value: 15, change: 2, trend: 'down' },
  { label: 'Crédits Carbone', value: 45, change: 5, trend: 'up' }
];

function Dashboard() {
  return (
    <div className="p-6 aurora-bg">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text mb-6">
        Tableau de Bord
      </h1>
      <DashboardStats stats={mockStats} />
    </div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const { signOut } = useAuth();

  return (
    <div className="flex min-h-screen bg-[rgb(var(--background))]">
      <Sidebar 
        onExpandChange={setIsSidebarExpanded} 
        onSignOut={signOut}
      />
      <main className={`flex-1 transition-all duration-300 relative ${
        isSidebarExpanded ? 'ml-64' : 'ml-16'
      }`}>
        {children}
      </main>
      <PopupManager />
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/pricing" element={<Pricing />} />
      
      {/* Auth Routes */}
      <Route path="/signin" element={
        <AuthRoute>
          <SignIn />
        </AuthRoute>
      } />
      <Route path="/signup" element={
        <AuthRoute>
          <SignUp />
        </AuthRoute>
      } />
      <Route path="/reset-password" element={
        <AuthRoute>
          <ResetPassword />
        </AuthRoute>
      } />

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/workspace" element={
        <ProtectedRoute>
          <AppLayout>
            <Workspace />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/marketplace" element={
        <ProtectedRoute>
          <AppLayout>
            <Marketplace />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/maitre-oeuvre/*" element={
        <ProtectedRoute>
          <AppLayout>
            <MaitreOeuvre />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/maitre-ouvrage/*" element={
        <ProtectedRoute>
          <AppLayout>
            <MaitreOuvrage />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/entreprise/*" element={
        <ProtectedRoute>
          <AppLayout>
            <Entreprise />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/particuliers/*" element={
        <ProtectedRoute>
          <AppLayout>
            <Particuliers />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/agents/*" element={
        <ProtectedRoute>
          <AppLayout>
            <Agents />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/comptabilite/*" element={
        <ProtectedRoute>
          <AppLayout>
            <Comptabilite />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <AppLayout>
            <Settings />
          </AppLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <FinanceProvider>
            <NotificationProvider>
              <Router>
                <AppRoutes />
              </Router>
            </NotificationProvider>
          </FinanceProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}