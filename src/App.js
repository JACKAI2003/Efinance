import React, { useState, useEffect } from 'react';
import { initialTransactions, initialBudgets, initialSavingsGoals, currencies } from './data/initialData';
import DashboardWidgets from './components/DashboardWidgets';
import TransactionList from './components/TransactionList';
import BudgetManager from './components/BudgetManager';
import SavingsManager from './components/SavingsManager';
import ExpenseAnalyzer from './components/ExpenseAnalyzer';
import TransactionModal from './components/TransactionModal';
import BudgetModal from './components/BudgetModal';
import SavingsModal from './components/SavingsModal';
import ContributionModal from './components/ContributionModal';
import ConfirmationModal from './components/ConfirmationModal';
import { Plus, Wallet, PieChart } from 'lucide-react';

export default function App() {
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('ff_transactions')) || initialTransactions);
  const [budgets, setBudgets] = useState(() => JSON.parse(localStorage.getItem('ff_budgets')) || initialBudgets);
  const [savings, setSavings] = useState(() => JSON.parse(localStorage.getItem('ff_savings')) || initialSavingsGoals);
  const [currency, setCurrency] = useState(() => JSON.parse(localStorage.getItem('ff_currency')) || currencies.USD);
  
  const [transModal, setTransModal] = useState({ isOpen: false, item: null });
  const [budgetModal, setBudgetModal] = useState({ isOpen: false, item: null });
  const [savingsModal, setSavingsModal] = useState({ isOpen: false, item: null });
  const [contribModal, setContribModal] = useState({ isOpen: false, item: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, type: null, id: null });

  useEffect(() => {
    localStorage.setItem('ff_transactions', JSON.stringify(transactions));
    localStorage.setItem('ff_budgets', JSON.stringify(budgets));
    localStorage.setItem('ff_savings', JSON.stringify(savings));
    localStorage.setItem('ff_currency', JSON.stringify(currency));
  }, [transactions, budgets, savings, currency]);

  const handleSaveTransaction = (t) => {
    if (t.tipo === 'Abono' && t.goalId) {
       setSavings(savings.map(s => s.id === t.goalId ? { ...s, currentAmount: s.currentAmount + t.monto } : s));
    }
    if (t.id) setTransactions(transactions.map(item => item.id === t.id ? t : item));
    else setTransactions([{...t, id: Date.now().toString()}, ...transactions]);
  };

  const handleSaveBudget = (b) => {
    if (b.id) setBudgets(budgets.map(item => item.id === b.id ? b : item));
    else setBudgets([...budgets, {...b, id: Date.now().toString()}]);
  };

  const handleSaveSavings = (s) => {
    if (s.id) setSavings(savings.map(item => item.id === s.id ? s : item));
    else setSavings([...savings, {...s, id: Date.now().toString()}]);
  };

  const handleContributeSavings = (goalId, amount) => {
    setSavings(savings.map(s => s.id === goalId ? { ...s, currentAmount: s.currentAmount + amount } : s));
    handleSaveTransaction({
      descripcion: `Abono a meta`,
      monto: amount,
      tipo: 'Abono',
      categoria: 'Ahorro',
      fecha: new Date().toISOString().split('T')[0],
      goalId: goalId
    });
  };

  const handleDelete = () => {
    if (deleteConfirm.type === 'transaction') setTransactions(transactions.filter(t => t.id !== deleteConfirm.id));
    else if (deleteConfirm.type === 'budget') setBudgets(budgets.filter(b => b.id !== deleteConfirm.id));
    else if (deleteConfirm.type === 'savings') setSavings(savings.filter(s => s.id !== deleteConfirm.id));
    setDeleteConfirm({ isOpen: false, type: null, id: null });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      <nav className="border-b border-slate-100 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white"><Wallet size={20} /></div>
            <h1 className="font-bold text-xl tracking-tight text-slate-900">Finance<span className="text-indigo-600">Flow</span></h1>
          </div>
          <div className="flex gap-4">
             <select value={currency.code} onChange={(e) => setCurrency(currencies[e.target.value])} className="bg-slate-50 border-none text-sm rounded-xl px-3 py-2 cursor-pointer font-medium hover:bg-slate-100 transition-colors">
              {Object.keys(currencies).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={() => setTransModal({isOpen: true, item: null})} className="bg-slate-900 text-white px-5 py-2 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-900/10">
              <Plus size={18} /> Nueva Transacción
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <DashboardWidgets transactions={transactions} currency={currency} period="Global" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TransactionList 
              transactions={transactions} 
              setTransactions={setTransactions} 
              currency={currency} 
              onEdit={(t) => setTransModal({isOpen: true, item: t})} 
              onDeleteClick={(id) => setDeleteConfirm({isOpen: true, type: 'transaction', id})}
            />
            <ExpenseAnalyzer transactions={transactions} currency={currency} />
          </div>
          <div className="space-y-8">
            <BudgetManager 
              budgets={budgets} 
              setBudgets={setBudgets} 
              transactions={transactions} 
              currency={currency} 
              onEdit={(b) => setBudgetModal({isOpen: true, item: b})} 
              onCreate={() => setBudgetModal({isOpen: true, item: null})}
              onDeleteClick={(id) => setDeleteConfirm({isOpen: true, type: 'budget', id})}
            />
            <SavingsManager 
              goals={savings}
              currency={currency}
              onCreate={() => setSavingsModal({isOpen: true, item: null})}
              onEdit={(s) => setSavingsModal({isOpen: true, item: s})}
              onContribute={(s) => setContribModal({isOpen: true, item: s})}
              onDelete={(id) => setDeleteConfirm({isOpen: true, type: 'savings', id})}
            />
          </div>
        </div>
      </main>

      <TransactionModal isOpen={transModal.isOpen} transaction={transModal.item} onClose={() => setTransModal({isOpen: false, item: null})} onSave={handleSaveTransaction} savingsGoals={savings} />
      <BudgetModal isOpen={budgetModal.isOpen} budget={budgetModal.item} onClose={() => setBudgetModal({isOpen: false, item: null})} onSave={handleSaveBudget} />
      <SavingsModal isOpen={savingsModal.isOpen} goal={savingsModal.item} onClose={() => setSavingsModal({isOpen: false, item: null})} onSave={handleSaveSavings} />
      <ContributionModal isOpen={contribModal.isOpen} goal={contribModal.item} onClose={() => setContribModal({isOpen: false, item: null})} onConfirm={handleContributeSavings} />
      <ConfirmationModal isOpen={deleteConfirm.isOpen} onClose={() => setDeleteConfirm({isOpen: false, type: null, id: null})} onConfirm={handleDelete} title="Eliminar elemento" message="Esta acción es permanente. ¿Seguro que quieres borrarlo?" />
    </div>
  );
}