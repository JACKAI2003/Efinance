import React from 'react';
import { AlertCircle, TrendingDown } from 'lucide-react';
import { discretionaryCategories } from '../data/initialData';

export default function ExpenseAnalyzer({ transactions, currency }) {
  const unnecessary = transactions.filter(t => 
    discretionaryCategories.includes(t.categoria) && t.tipo === 'gasto'
  );

  const totalUnnecessary = unnecessary.reduce((acc, t) => acc + t.monto, 0);

  return (
    <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-sm border border-indigo-800">
      <div className="flex items-center gap-2 mb-4">
        <TrendingDown className="text-indigo-300" size={20} />
        <h2 className="font-semibold text-lg">Análisis de Gastos</h2>
      </div>
      
      {totalUnnecessary > 0 ? (
        <>
          <p className="text-indigo-200 text-sm mb-4">
            Has gastado <span className="font-bold text-white">{currency.symbol}{totalUnnecessary}</span> en categorías no esenciales este mes.
          </p>
          <ul className="space-y-2 text-sm text-indigo-100">
            <li className="flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>Considera cancelar suscripciones que no utilizas frecuentemente.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>Reduce la frecuencia de salidas a comer para ahorrar hasta 20% más.</span>
            </li>
          </ul>
        </>
      ) : (
        <p className="text-indigo-200 text-sm italic">No se detectaron gastos innecesarios significativos. ¡Excelente trabajo!</p>
      )}
    </div>
  );
}