import React from 'react';
import { Plus, Edit2, Trash2, PiggyBank, PlusCircle } from 'lucide-react';

export default function SavingsManager({ goals, currency, onEdit, onCreate, onDelete, onContribute }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <PiggyBank className="text-emerald-500" size={20} /> Metas de Ahorro
        </h2>
        <button onClick={onCreate} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Plus size={20} /></button>
      </div>
      <div className="space-y-4">
        {goals.map(goal => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div key={goal.id} className="group">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">{goal.name}</span>
                <div className="flex gap-1 items-center">
                  <span className="font-bold text-emerald-600 mr-2">{currency.symbol}{goal.currentAmount} / {currency.symbol}{goal.targetAmount}</span>
                  <button onClick={() => onContribute(goal)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-emerald-50 text-emerald-600 rounded" title="Abonar"><PlusCircle size={14}/></button>
                  <button onClick={() => onEdit(goal)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-100 rounded" title="Editar"><Edit2 size={14}/></button>
                  <button onClick={() => onDelete(goal.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-50 text-rose-500 rounded" title="Eliminar"><Trash2 size={14}/></button>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${Math.min(progress, 100)}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}