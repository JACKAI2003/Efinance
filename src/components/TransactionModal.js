import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function TransactionModal({ isOpen, onClose, onSave, transaction, savingsGoals = [] }) {
  const [formData, setFormData] = useState({
    descripcion: '',
    monto: '',
    tipo: 'gasto',
    categoria: 'General',
    fecha: new Date().toISOString().split('T')[0],
    goalId: ''
  });

  useEffect(() => {
    if (transaction) setFormData(transaction);
    else setFormData({ descripcion: '', monto: '', tipo: 'gasto', categoria: 'General', fecha: new Date().toISOString().split('T')[0], goalId: '' });
  }, [transaction, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{transaction ? 'Editar' : 'Nueva'} Transacción</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <input required type="text" className="w-full border rounded-lg p-2" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Monto</label>
            <input required type="number" className="w-full border rounded-lg p-2" value={formData.monto} onChange={e => setFormData({...formData, monto: parseFloat(e.target.value)})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo</label>
              <select className="w-full border rounded-lg p-2" value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                <option value="gasto">Gasto</option>
                <option value="ingreso">Ingreso</option>
                <option value="Abono">Abono (Ahorro)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Categoría</label>
              <select className="w-full border rounded-lg p-2" value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})}>
                <option value="General">General</option>
                <option value="Vivienda">Vivienda</option>
                <option value="Comida">Comida</option>
                <option value="Entretenimiento">Entretenimiento</option>
                <option value="Ahorro">Ahorro</option>
              </select>
            </div>
          </div>
          
          {formData.tipo === 'Abono' && (
            <div>
              <label className="block text-sm font-medium mb-1">Seleccionar Meta</label>
              <select required className="w-full border rounded-lg p-2" value={formData.goalId} onChange={e => setFormData({...formData, goalId: e.target.value})}>
                <option value="">Selecciona una meta...</option>
                {savingsGoals.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </div>
          )}

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700">Guardar</button>
        </form>
      </div>
    </div>
  );
}