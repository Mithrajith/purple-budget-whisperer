
import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import Categories from '@/components/Categories';
import CalendarView from '@/components/CalendarView';
import Reports from '@/components/Reports';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'categories':
        return <Categories />;
      case 'calendar':
        return <CalendarView />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-violet-900 to-purple-900">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 border-r border-white/10">
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {renderPage()}
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden">
          <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default Index;
