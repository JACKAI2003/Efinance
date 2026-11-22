import React from 'react';
import { TrendingUp, TrendingDown, Wallet, ArrowRight } from 'lucide-react';

export default function DashboardWidgets({ transactions, currency, period }) {
  const totalIngresos = transactions
    .filter(t => t.tipo === 'ingreso')
    .reduce((acc, t) => acc + t.monto, 0);
  
  const totalSalidas = transactions
    .filter(t => t.tipo === 'gasto' || t.tipo === 'Abono')
    .reduce((acc, t) => acc + t.monto, 0);

  const balance = totalIngresos - totalSalidas;

  const cards = [
    { label: 'Balance', val: balance, color: 'text-slate-900', icon: Wallet, bg: 'bg-slate-100' },
    { label: 'Ingresos', val: totalIngresos, color: 'text-emerald-600', icon: TrendingUp, bg: 'bg-emerald-50' },
    { label: 'Gastos/Abonos', val: totalSalidas, color: 'text-rose-600', icon: TrendingDown, bg: 'bg-rose-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((c, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div className={`p-2 rounded-xl ${c.bg} ${c.color}`}>
              <c.icon size={22} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{c.label}</span>
          </div>
          <div className="mt-4">
            <h3 className={`text-3xl font-bold tracking-tight ${c.color} tabular-nums`}>
              {c.label === 'Balance' ? (balance >= 0 ? '+' : '') : ''}{currency.symbol}{c.val.toLocaleString()}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}