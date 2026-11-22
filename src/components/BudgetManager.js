import React from 'react';
import { Plus } from 'lucide-react';

export default function BudgetManager({ budgets, transactions, currency, onEdit, onCreate, onDeleteClick }) {
  const getProgress = (cat, limit) => {
    const spent = transactions
      .filter(t => t.categoria === cat && t.tipo === 'gasto')
      .reduce((acc, t) => acc + t.monto, 0);
    return { spent, percentage: Math.min((spent / limit) * 100, 100) };
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg">Presupuestos</h2>
        <button onClick={onCreate} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-lg transition-colors"><Plus size={20} /></button>
      </div>
      <div className="space-y-6">
        {budgets.map(b => {
          const { spent, percentage } = getProgress(b.categoria, b.limiteMensual);
          return (
            <div key={b.id}>
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="text-slate-600">{b.categoria}</span>
                <span className="text-slate-400 tabular-nums">{currency.symbol}{spent} <span className="text-slate-300">/ {currency.symbol}{b.limiteMensual}</span></span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden cursor-pointer" onClick={() => onEdit(b)}>
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-700" style={{ width: `${percentage}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}