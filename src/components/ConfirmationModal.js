import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all animate-in fade-in zoom-in duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-rose-100 text-rose-600 rounded-full">
            <AlertTriangle size={24} />
          </div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        </div>
        <p className="text-slate-600 mb-6 text-sm">{message}</p>
        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={() => { onConfirm(); onClose(); }} 
            className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}