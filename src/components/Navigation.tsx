
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, PieChart, Calendar, Download, Settings, User } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'categories', label: 'Categories', icon: PieChart },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: Download },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:relative md:bottom-auto">
      <div className="glass border-t border-white/10 md:border-t-0 md:border-r md:border-white/10 p-4">
        <div className="flex md:flex-col gap-2 justify-around md:justify-start">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`flex items-center gap-3 w-full md:justify-start justify-center p-3 transition-all duration-300 ${
                  isActive 
                    ? 'purple-gradient text-white shadow-lg animate-glow' 
                    : 'text-purple-300 hover:text-white hover:bg-white/5 hover-glow'
                }`}
                onClick={() => onPageChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                <span className="hidden md:inline font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
        
        {/* User Profile Section */}
        <div className="hidden md:block mt-8 p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center animate-glow">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">Budget Master</p>
              <p className="text-purple-300 text-sm">Premium User</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
