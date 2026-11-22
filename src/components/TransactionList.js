import React, { useState } from 'react';
import { Trash2, Edit2, Search, ArrowUpRight, ArrowDownRight, PiggyBank } from 'lucide-react';

export default function TransactionList({ transactions, setTransactions, currency, onEdit, onDeleteClick }) {
  const [filter, setFilter] = useState('');

  const filtered = transactions.filter(t => 
    t.descripcion.toLowerCase().includes(filter.toLowerCase()) ||
    t.categoria.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <h2 className="font-bold text-lg text-slate-800">Movimientos</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Filtrar..." 
            className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-48 transition-all"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-slate-50">
            {filtered.map(t => (
              <tr key={t.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${t.tipo === 'ingreso' ? 'bg-emerald-50 text-emerald-600' : t.tipo === 'Abono' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                    {t.tipo === 'ingreso' ? <ArrowUpRight size={16} /> : t.tipo === 'Abono' ? <PiggyBank size={16} /> : <ArrowDownRight size={16} />}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{t.descripcion}</p>
                    <p className="text-xs text-slate-400">{t.fecha} • {t.categoria}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`font-semibold tabular-nums ${t.tipo === 'ingreso' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {t.tipo === 'ingreso' ? '+' : '-'}{currency.symbol}{t.monto}
                  </span>
                </td>
                <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(t)} className="p-2 text-slate-400 hover:text-indigo-600"><Edit2 size={16} /></button>
                  <button onClick={() => onDeleteClick(t.id)} className="p-2 text-slate-400 hover:text-rose-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}