
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', spending: 2400, budget: 3000 },
    { month: 'Feb', spending: 2800, budget: 3000 },
    { month: 'Mar', spending: 2200, budget: 3000 },
    { month: 'Apr', spending: 2600, budget: 3000 },
    { month: 'May', spending: 2900, budget: 3000 },
    { month: 'Jun', spending: 2100, budget: 3000 },
  ];

  const categoryData = [
    { name: 'Food', value: 450, color: '#8B5CF6' },
    { name: 'Transport', value: 200, color: '#A855F7' },
    { name: 'Shopping', value: 300, color: '#C084FC' },
    { name: 'Entertainment', value: 150, color: '#E879F9' },
    { name: 'Utilities', value: 250, color: '#F0ABFC' },
  ];

  const weeklyTrend = [
    { week: 'Week 1', amount: 320 },
    { week: 'Week 2', amount: 280 },
    { week: 'Week 3', amount: 420 },
    { week: 'Week 4', amount: 350 },
  ];

  const handleDownloadReport = () => {
    // Mock download functionality
    const data = {
      period: selectedPeriod,
      generated: new Date().toISOString(),
      totalSpent: 1350,
      totalBudget: 3000,
      categories: categoryData,
      trends: monthlyData
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `budget-report-${selectedPeriod}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const totalSpent = categoryData.reduce((sum, cat) => sum + cat.value, 0);
  const totalBudget = 3000;
  const savings = totalBudget - totalSpent;
  const savingsPercentage = (savings / totalBudget) * 100;

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="animate-slide-up">
          <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-purple-300 mt-1">Detailed insights into your spending</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40 glass border-purple-500/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass border-purple-500/30">
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleDownloadReport} className="purple-gradient hover-lift">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass hover-lift animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">${totalSpent}</p>
                <p className="text-sm text-red-400 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-400 animate-float" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass hover-lift animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Total Budget</p>
                <p className="text-2xl font-bold text-white">${totalBudget}</p>
                <p className="text-sm text-green-400 flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Same as last month
                </p>
              </div>
              <Calendar className="h-8 w-8 text-purple-400 animate-float" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass hover-lift animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Savings</p>
                <p className="text-2xl font-bold text-green-400">${savings}</p>
                <p className="text-sm text-green-400 flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  {savingsPercentage.toFixed(1)}% of budget
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 animate-glow" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass hover-lift animate-scale-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Avg. Daily</p>
                <p className="text-2xl font-bold text-white">${(totalSpent / 30).toFixed(0)}</p>
                <p className="text-sm text-yellow-400 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Based on 30 days
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 animate-glow" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Trend */}
        <Card className="glass hover-lift">
          <CardHeader>
            <CardTitle className="text-white">Monthly Spending Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#rgb(196, 132, 252)" />
                <YAxis stroke="#rgb(196, 132, 252)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="spending" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="budget" fill="#rgba(168, 85, 247, 0.3)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="glass hover-lift">
          <CardHeader>
            <CardTitle className="text-white">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
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
      </div>

      {/* Weekly Trend and Category List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Trend */}
        <Card className="glass hover-lift lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Weekly Spending Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="#rgb(196, 132, 252)" />
                <YAxis stroke="#rgb(196, 132, 252)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card className="glass hover-lift">
          <CardHeader>
            <CardTitle className="text-white">Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData
                .sort((a, b) => b.value - a.value)
                .slice(0, 5)
                .map((category, index) => (
                  <div 
                    key={category.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover-glow animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full animate-glow"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-white font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="purple-gradient mb-1">
                        ${category.value}
                      </Badge>
                      <p className="text-xs text-purple-300">
                        {((category.value / totalSpent) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="glass hover-lift">
        <CardHeader>
          <CardTitle className="text-white">Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="glass border-purple-500/30 hover-glow">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" className="glass border-purple-500/30 hover-glow">
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline" className="glass border-purple-500/30 hover-glow">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" className="glass border-purple-500/30 hover-glow">
              <Download className="h-4 w-4 mr-2" />
              Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
