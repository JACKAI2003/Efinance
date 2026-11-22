import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function SavingsModal({ isOpen, onClose, onSave, goal }) {
  const [formData, setFormData] = useState({ name: '', targetAmount: '', currentAmount: '' });

  useEffect(() => {
    if (goal) setFormData(goal);
    else setFormData({ name: '', targetAmount: '', currentAmount: '' });
  }, [goal, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{goal ? 'Editar' : 'Nueva'} Meta</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); onClose(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre de la meta</label>
            <input required type="text" className="w-full border rounded-lg p-2" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Monto Objetivo</label>
            <input required type="number" className="w-full border rounded-lg p-2" value={formData.targetAmount} onChange={e => setFormData({...formData, targetAmount: parseFloat(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Monto Actual</label>
            <input required type="number" className="w-full border rounded-lg p-2" value={formData.currentAmount} onChange={e => setFormData({...formData, currentAmount: parseFloat(e.target.value)})} />
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700">Guardar Meta</button>
        </form>
      </div>
    </div>
  );
}