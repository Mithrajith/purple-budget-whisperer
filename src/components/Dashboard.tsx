
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MessageCircle, Plus, TrendingUp, Wallet, Calendar, Download, Settings, DollarSign } from 'lucide-react';

interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

interface Category {
  name: string;
  spent: number;
  color: string;
}

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState(3000);
  const [categories, setCategories] = useState<Category[]>([
    { name: 'Food', spent: 450, color: '#8B5CF6' },
    { name: 'Transport', spent: 200, color: '#A855F7' },
    { name: 'Shopping', spent: 300, color: '#C084FC' },
    { name: 'Entertainment', spent: 150, color: '#E879F9' },
    { name: 'Utilities', spent: 250, color: '#F0ABFC' }
  ]);
  
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hi! I'm your budget assistant. How can I help you today?", isBot: true }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = budget - totalSpent;
  const spentPercentage = (totalSpent / budget) * 100;

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = { id: Date.now(), text: newMessage, isBot: false };
    setChatMessages(prev => [...prev, userMessage]);
    
    // Simple AI response simulation
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        text: "I've noted your expense. Your spending is looking good this month! Try to save more on entertainment category.", 
        isBot: true 
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
    
    setNewMessage('');
  };

  const recentExpenses = [
    { name: 'Grocery Shopping', amount: 85, category: 'Food', date: 'Today' },
    { name: 'Gas Station', amount: 45, category: 'Transport', date: 'Yesterday' },
    { name: 'Netflix', amount: 15, category: 'Entertainment', date: '2 days ago' },
  ];

  return (
    <div className="min-h-screen p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="animate-slide-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            NEO BUDGET MANAGER
          </h1>
          <p className="text-purple-300 mt-2">Manage your finances with AI assistance</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="glass hover-glow border-purple-500/30 text-purple-300"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            AI Chat
          </Button>
          <Button className="purple-gradient hover-lift">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass hover-lift animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Total Budget</p>
                <p className="text-2xl font-bold text-white">${budget}</p>
              </div>
              <Wallet className="h-8 w-8 text-purple-400 animate-float" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass hover-lift animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">${totalSpent}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-400 animate-float" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass hover-lift animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Remaining</p>
                <p className="text-2xl font-bold text-green-400">${remaining}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400 animate-float" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass hover-lift animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Spent %</p>
                <p className="text-2xl font-bold text-white">{spentPercentage.toFixed(1)}%</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 animate-glow" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Chart */}
        <Card className="glass hover-lift lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="spent"
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card className="glass hover-lift">
          <CardHeader>
            <CardTitle className="text-white">Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentExpenses.map((expense, index) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover-glow">
                <div>
                  <p className="text-white font-medium">{expense.name}</p>
                  <p className="text-purple-300 text-sm">{expense.category} • {expense.date}</p>
                </div>
                <Badge variant="secondary" className="purple-gradient">
                  ${expense.amount}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Categories Overview */}
      <Card className="glass hover-lift">
        <CardHeader>
          <CardTitle className="text-white">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 hover-glow hover-lift">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{category.name}</h3>
                  <div 
                    className="w-4 h-4 rounded-full animate-glow" 
                    style={{ backgroundColor: category.color }}
                  />
                </div>
                <p className="text-2xl font-bold text-white">${category.spent}</p>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(category.spent / budget) * 100}%`,
                      backgroundColor: category.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      {showChat && (
        <Card className="glass hover-lift animate-slide-up">
          <CardHeader>
            <CardTitle className="text-white">AI Budget Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto space-y-3 mb-4">
              {chatMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.isBot 
                      ? 'bg-purple-600/20 text-purple-100' 
                      : 'purple-gradient text-white'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask about your budget or add expenses..."
                className="glass border-purple-500/30 text-white placeholder-purple-300"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} className="purple-gradient">
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
