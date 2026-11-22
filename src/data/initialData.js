export const initialTransactions = [
  { id: '1', fecha: new Date().toISOString().split('T')[0], descripcion: 'Salario Mensual', monto: 3500, tipo: 'ingreso', categoria: 'Salario' },
  { id: '2', fecha: new Date().toISOString().split('T')[0], descripcion: 'Alquiler', monto: 1200, tipo: 'gasto', categoria: 'Vivienda' },
  { id: '3', fecha: new Date().toISOString().split('T')[0], descripcion: 'Suscripción Streaming', monto: 20, tipo: 'gasto', categoria: 'Entretenimiento' },
];

export const initialBudgets = [
  { id: '1', categoria: 'Entretenimiento', limiteMensual: 100 },
  { id: '2', categoria: 'Vivienda', limiteMensual: 1200 },
];

export const initialSavingsGoals = [
  { id: '1', name: 'Fondo Emergencia', targetAmount: 5000, currentAmount: 1500 },
  { id: '2', name: 'Nuevo Portátil', targetAmount: 1200, currentAmount: 300 },
];

export const currencies = {
  USD: { symbol: '$', code: 'USD' },
  MXN: { symbol: '$', code: 'MXN' },
  EUR: { symbol: '€', code: 'EUR' }
};

export const discretionaryCategories = ['Entretenimiento', 'Shopping', 'Restaurantes', 'Suscripciones'];