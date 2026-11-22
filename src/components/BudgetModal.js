import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function BudgetModal({ isOpen, onClose, onSave, budget }) {
  const [formData, setFormData] = useState({ categoria: '', limiteMensual: '' });

  useEffect(() => {
    if (budget) setFormData(budget);
    else setFormData({ categoria: '', limiteMensual: '' });
  }, [budget, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{budget ? 'Editar' : 'Nuevo'} Presupuesto</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); onClose(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Categoría</label>
            <input required type="text" className="w-full border rounded-lg p-2" value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Límite</label>
            <input required type="number" className="w-full border rounded-lg p-2" value={formData.limiteMensual} onChange={e => setFormData({...formData, limiteMensual: parseFloat(e.target.value)})} />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700">Guardar</button>
        </form>
      </div>
    </div>
  );
}