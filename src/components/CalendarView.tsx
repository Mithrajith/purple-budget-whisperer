
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface DayExpense {
  date: string;
  expenses: {
    category: string;
    amount: number;
    description: string;
    color: string;
  }[];
  total: number;
}

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Mock data for expenses
  const expenseData: DayExpense[] = [
    {
      date: '2024-06-01',
      expenses: [
        { category: 'Food', amount: 25, description: 'Lunch', color: '#8B5CF6' },
        { category: 'Transport', amount: 15, description: 'Bus fare', color: '#A855F7' }
      ],
      total: 40
    },
    {
      date: '2024-06-05',
      expenses: [
        { category: 'Shopping', amount: 120, description: 'Groceries', color: '#C084FC' },
        { category: 'Entertainment', amount: 30, description: 'Movie tickets', color: '#E879F9' }
      ],
      total: 150
    },
    {
      date: '2024-06-10',
      expenses: [
        { category: 'Food', amount: 45, description: 'Dinner', color: '#8B5CF6' },
        { category: 'Utilities', amount: 80, description: 'Electricity bill', color: '#F0ABFC' }
      ],
      total: 125
    }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDate = (day: number) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getExpenseForDate = (dateStr: string) => {
    return expenseData.find(expense => expense.date === dateStr);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const selectedExpense = selectedDate ? getExpenseForDate(selectedDate) : null;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="animate-slide-up">
          <h1 className="text-3xl font-bold text-white">Expense Calendar</h1>
          <p className="text-purple-300 mt-1">Track your daily spending</p>
        </div>
        <Button className="purple-gradient hover-lift">
          <Plus className="h-4 w-4 mr-2" />
          Add Today's Expense
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="glass hover-lift lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-xl">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  className="glass border-purple-500/30 hover-glow"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  className="glass border-purple-500/30 hover-glow"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map(day => (
                <div key={day} className="text-center text-purple-300 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before the first day of the month */}
              {Array.from({ length: firstDay }, (_, index) => (
                <div key={`empty-${index}`} className="h-20" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;
                const dateStr = formatDate(day);
                const expense = getExpenseForDate(dateStr);
                const isSelected = selectedDate === dateStr;
                const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                return (
                  <div
                    key={day}
                    className={`h-20 p-2 rounded-lg border border-white/10 cursor-pointer transition-all duration-300 hover-glow ${
                      isSelected ? 'purple-gradient border-purple-400' : 'glass'
                    } ${isToday ? 'ring-2 ring-purple-400' : ''}`}
                    onClick={() => setSelectedDate(dateStr)}
                  >
                    <div className="flex justify-between items-start h-full">
                      <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-purple-300'}`}>
                        {day}
                      </span>
                      {expense && (
                        <Badge 
                          variant="secondary" 
                          className="text-xs bg-purple-600/20 text-purple-200 border-purple-500/30"
                        >
                          ${expense.total}
                        </Badge>
                      )}
                    </div>
                    {expense && (
                      <div className="mt-1 space-y-1">
                        {expense.expenses.slice(0, 2).map((exp, idx) => (
                          <div 
                            key={idx}
                            className="w-full h-1 rounded-full opacity-80"
                            style={{ backgroundColor: exp.color }}
                          />
                        ))}
                        {expense.expenses.length > 2 && (
                          <div className="text-xs text-purple-300 text-center">
                            +{expense.expenses.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Day Details */}
        <Card className="glass hover-lift">
          <CardHeader>
            <CardTitle className="text-white">
              {selectedDate ? `Expenses for ${new Date(selectedDate).toLocaleDateString()}` : 'Select a date'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedExpense ? (
              <div className="space-y-4">
                <div className="text-center p-4 rounded-lg bg-white/5">
                  <p className="text-purple-300 text-sm">Total Spent</p>
                  <p className="text-3xl font-bold text-white">${selectedExpense.total}</p>
                </div>

                <div className="space-y-3">
                  {selectedExpense.expenses.map((expense, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover-glow animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full animate-glow"
                          style={{ backgroundColor: expense.color }}
                        />
                        <div>
                          <p className="text-white font-medium">{expense.description}</p>
                          <p className="text-purple-300 text-sm">{expense.category}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="purple-gradient">
                        ${expense.amount}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button className="w-full purple-gradient hover-lift">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4 animate-float">📅</div>
                <p className="text-purple-300 mb-4">Select a date to view expenses</p>
                <Button className="purple-gradient hover-lift">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense for Today
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarView;
