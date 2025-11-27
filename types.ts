export type ViewState = 'home' | 'simulator' | 'apply';

export interface LoanParams {
  amount: number;
  months: number;
}

export interface SimulatorInputs {
  monthlyRate: number; // Tasa mensual (decimal, e.g. 0.028)
  age: number; // Edad en años
  netSalary: number; // Salario neto
  maxIndebtedness: number; // Porcentaje máximo (def 0.3)
  startDate: string; // Fecha de ingreso laboral
}

export interface CreditRow {
  term: number; // 12, 18, 24
  amount: number | null; // Valor Desembolsado
  monthlyPayment: number | null; // Cuota mensual
  isApplicable: boolean; // Si cumple condiciones
}

// Interfaces para Adelanto Alinea
export interface AdelantoInputs {
  invoiceValue: number; // Valor de la factura
  commissionRate: number; // Porcentaje comisión (ej. 5)
  // El prompt pide editable, así que usamos number para flexibilidad
  taxRate: number; // ej. 4 para 4x1000
}

export interface AdelantoResult {
  commissionValue: number;
  valueAfterCommission: number;
  tax4x1000Value: number;
  finalConsignment: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FormData {
  fullName: string;
  docType: string;
  docNumber: string;
  email: string;
  phone: string;
  company: string;
  contractType: string;
  salary: string;
  amount: string;
}