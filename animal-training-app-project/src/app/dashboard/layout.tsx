import React from 'react';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      {/* Add any common layout elements like headers or footers here */}
      {children}
    </div>
  );
};

export default DashboardLayout;
