import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
interface Category {
  id: string;
  name: string;
  budget: number;
  spent: number;
  color: string;
  icon: string;
}
const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([{
    id: '1',
    name: 'Food & Dining',
    budget: 800,
    spent: 450,
    color: '#8B5CF6',
    icon: '🍕'
  }, {
    id: '2',
    name: 'Transportation',
    budget: 300,
    spent: 200,
    color: '#A855F7',
    icon: '🚗'
  }, {
    id: '3',
    name: 'Shopping',
    budget: 500,
    spent: 300,
    color: '#C084FC',
    icon: '🛍️'
  }, {
    id: '4',
    name: 'Entertainment',
    budget: 200,
    spent: 150,
    color: '#E879F9',
    icon: '🎬'
  }, {
    id: '5',
    name: 'Bills & Utilities',
    budget: 400,
    spent: 250,
    color: '#F0ABFC',
    icon: '⚡'
  }, {
    id: '6',
    name: 'Healthcare',
    budget: 200,
    spent: 75,
    color: '#DDD6FE',
    icon: '🏥'
  }]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    budget: '',
    icon: '💰'
  });
  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.budget) return;
    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      budget: parseFloat(newCategory.budget),
      spent: 0,
      color: '#8B5CF6',
      icon: newCategory.icon
    };
    setCategories([...categories, category]);
    setNewCategory({
      name: '',
      budget: '',
      icon: '💰'
    });
    setShowAddDialog(false);
  };
  const getSpendingStatus = (spent: number, budget: number) => {
    const percentage = spent / budget * 100;
    if (percentage >= 90) return {
      status: 'danger',
      color: 'red'
    };
    if (percentage >= 70) return {
      status: 'warning',
      color: 'yellow'
    };
    return {
      status: 'good',
      color: 'green'
    };
  };
  return <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="animate-slide-up">
          <h1 className="text-3xl font-bold text-white">Categories</h1>
          <p className="text-purple-300 mt-1">Manage your spending categories</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="purple-gradient hover-lift">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="glass border-purple-500/30">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Category</DialogTitle>
            </DialogHeader>
            <div className="-space-y-4 ">
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  Category Name
                </label>
                <Input value={newCategory.name} onChange={e => setNewCategory({
                ...newCategory,
                name: e.target.value
              })} placeholder="e.g., Groceries" className="glass border-purple-500/30 text-white" />
              </div>
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  Monthly Budget
                </label>
                <Input type="number" value={newCategory.budget} onChange={e => setNewCategory({
                ...newCategory,
                budget: e.target.value
              })} placeholder="0.00" className="glass border-purple-500/30 text-white" />
              </div>
              <div>
                <label className="block text-purple-300 text-sm font-medium mb-2">
                  Icon
                </label>
                <div className="flex gap-2">
                  {['💰', '🍕', '🚗', '🛍️', '🎬', '⚡', '🏥', '🎓', '✈️', '🏠'].map(icon => <Button key={icon} variant={newCategory.icon === icon ? 'default' : 'outline'} className={`w-12 h-12 ${newCategory.icon === icon ? 'purple-gradient' : 'glass'}`} onClick={() => setNewCategory({
                  ...newCategory,
                  icon
                })}>
                      {icon}
                    </Button>)}
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddCategory} className="purple-gradient flex-1">
                  Add Category
                </Button>
                <Button variant="outline" onClick={() => setShowAddDialog(false)} className="glass border-purple-500/30">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => {
        const spentPercentage = category.spent / category.budget * 100;
        const remaining = category.budget - category.spent;
        const status = getSpendingStatus(category.spent, category.budget);
        return <Card key={category.id} className="glass hover-lift animate-scale-in" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl animate-float">{category.icon}</div>
                    <div>
                      <CardTitle className="text-white text-lg">{category.name}</CardTitle>
                      <p className="text-purple-300 text-sm">
                        ${category.spent} of ${category.budget}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10">
                      <Edit className="h-4 w-4 text-purple-300" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10">
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-300">Progress</span>
                      <span className="text-white font-medium">{spentPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{
                    width: `${Math.min(spentPercentage, 100)}%`,
                    backgroundColor: category.color
                  }} />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <TrendingUp className="h-4 w-4 text-red-400" />
                        <span className="text-xs text-purple-300">Spent</span>
                      </div>
                      <p className="text-white font-bold">${category.spent}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <TrendingDown className="h-4 w-4 text-green-400" />
                        <span className="text-xs text-purple-300">Left</span>
                      </div>
                      <p className="text-white font-bold">${remaining}</p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-center">
                    <Badge variant="secondary" className={`${status.status === 'danger' ? 'bg-red-500/20 text-red-300 border-red-500/30' : status.status === 'warning' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 'bg-green-500/20 text-green-300 border-green-500/30'} animate-glow`}>
                      {status.status === 'danger' ? 'Over Budget' : status.status === 'warning' ? 'Close to Limit' : 'On Track'}
                    </Badge>
                  </div>

                  {/* Quick Add Button */}
                  <Button variant="outline" className="w-full glass border-purple-500/30 hover-glow">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Expense
                  </Button>
                </div>
              </CardContent>
            </Card>;
      })}
      </div>
    </div>;
};
export default Categories;