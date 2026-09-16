import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext.tsx';
import { AdminLogin } from './AdminLogin.tsx';
import { AdminDashboard } from './AdminDashboard.tsx';

interface AdminPanelProps {
  onBackToSite: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onBackToSite,
  isDark,
  toggleTheme,
}) => {
  const { isAdminLoggedIn } = usePortfolio();

  if (!isAdminLoggedIn) {
    return <AdminLogin onBackToSite={onBackToSite} isDark={isDark} />;
  }

  return (
    <AdminDashboard
      onBackToSite={onBackToSite}
      isDark={isDark}
      toggleTheme={toggleTheme}
    />
  );
};
