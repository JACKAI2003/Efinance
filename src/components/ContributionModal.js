import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ContributionModal({ isOpen, onClose, onConfirm, goal }) {
  const [amount, setAmount] = useState('');

  if (!isOpen || !goal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Abonar a {goal.name}</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onConfirm(goal.id, parseFloat(amount)); onClose(); setAmount(''); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Monto a abonar</label>
            <input required type="number" className="w-full border rounded-lg p-2" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700">Confirmar Abono</button>
        </form>
      </div>
    </div>
  );
}