import { CreditRow, SimulatorInputs, AdelantoInputs, AdelantoResult } from '../types';

/**
 * Redondea un número al múltiplo más cercano.
 * Equivalente a MROUND de Excel.
 */
const mround = (value: number, multiple: number): number => {
  if (multiple === 0) return value;
  return Math.round(value / multiple) * multiple;
};

/**
 * Calcula el Valor Presente (Capital).
 * PV(rate, nper, pmt) = -pmt * (1 - (1 + rate)^(-nper)) / rate
 * Nota: En Excel PV suele tomar argumentos adicionales, aquí simplificamos a lo requerido.
 */
const pv = (rate: number, nper: number, pmt: number): number => {
  if (rate === 0) return -pmt * nper;
  return -pmt * (1 - Math.pow(1 + rate, -nper)) / rate;
};

/**
 * Calcula el Pago Mensual (Cuota).
 * PMT(rate, nper, pv) = rate * pv / (1 - (1 + rate)^(-nper))
 */
const pmt = (rate: number, nper: number, pvValue: number): number => {
  if (rate === 0) return -pvValue / nper;
  return (rate * pvValue) / (1 - Math.pow(1 + rate, -nper));
};

/**
 * Calcula los años de servicio basado en días / 360.
 */
export const calculateYearsOfService = (startDateStr: string): number => {
  if (!startDateStr) return 0;
  
  const start = new Date(startDateStr);
  const now = new Date();
  
  // Diferencia en milisegundos
  const diffTime = Math.abs(now.getTime() - start.getTime());
  // Diferencia en días
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  // Base 360 según requerimiento
  return parseFloat((diffDays / 360).toFixed(2));
};

export const formatCurrency = (value: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatPercent = (value: number): string => {
   return new Intl.NumberFormat('es-CO', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Lógica principal del simulador "Créditos Primera Vez"
 */
export const calculateFirstTimeCredits = (inputs: SimulatorInputs): CreditRow[] => {
  const { monthlyRate, age, netSalary, maxIndebtedness, startDate } = inputs;
  
  const yearsService = calculateYearsOfService(startDate);
  
  // 1. Capacidad máxima de endeudamiento mensual
  const maxCapacity = netSalary * maxIndebtedness;

  const results: CreditRow[] = [];

  // --- PLAZO 12 MESES ---
  // Siempre se calcula
  // cuotaBase = capacity * 0.4
  const pmtBase12 = maxCapacity * 0.4; 
  // Capital = MROUND(PV(rate, 12, -pmtBase), 100000)
  // Nota: En la fórmula del prompt PV recibe negativo el pmt: -(capacidad * 0.4)
  // Al pasar negativo a PV (que espera el pago), nos devuelve un capital positivo.
  let capital12 = mround(pv(monthlyRate, 12, -pmtBase12), 100000);
  
  // Cuota = PMT(rate, 12, -capital)
  // Pasamos capital negativo para obtener cuota positiva (flujo de caja convencional)
  // SE AGREGA REDONDEO A 1000 en la cuota
  let cuota12 = mround(Math.abs(pmt(monthlyRate, 12, -capital12)), 1000);

  results.push({
    term: 12,
    amount: capital12,
    monthlyPayment: cuota12,
    isApplicable: true
  });

  // --- PLAZO 18 MESES ---
  // Condición: edad >= 35 y añosServicio > 2
  if (age >= 35 && yearsService > 2) {
    const pmtBase18 = maxCapacity * 0.4;
    // Sin MROUND especificado en prompt para 18 meses, usamos raw PV
    const capital18 = pv(monthlyRate, 18, -pmtBase18);
    // SE AGREGA REDONDEO A 1000 en la cuota
    const cuota18 = mround(Math.abs(pmt(monthlyRate, 18, -capital18)), 1000);

    results.push({
      term: 18,
      amount: capital18,
      monthlyPayment: cuota18,
      isApplicable: true
    });
  } else {
    results.push({
      term: 18,
      amount: null,
      monthlyPayment: null,
      isApplicable: false
    });
  }

  // --- PLAZO 24 MESES ---
  // Condición: edad >= 35 y añosServicio > 3
  if (age >= 35 && yearsService > 3) {
    // Nota: Aquí cambia el factor a 0.5 según prompt
    const pmtBase24 = maxCapacity * 0.5;
    const capital24 = pv(monthlyRate, 24, -pmtBase24);
    // SE AGREGA REDONDEO A 1000 en la cuota
    const cuota24 = mround(Math.abs(pmt(monthlyRate, 24, -capital24)), 1000);

    results.push({
      term: 24,
      amount: capital24,
      monthlyPayment: cuota24,
      isApplicable: true
    });
  } else {
    results.push({
      term: 24,
      amount: null,
      monthlyPayment: null,
      isApplicable: false
    });
  }

  return results;
};

/**
 * Lógica para el simulador "Adelanto Alinea"
 * 
 * @param inputs Valores de entrada (factura, % comisión, 4x1000)
 * @returns Objeto con el desglose de valores
 */
export const calculateAdelanto = (inputs: AdelantoInputs): AdelantoResult => {
  const { invoiceValue, commissionRate, taxRate } = inputs;
  
  // 1. Calcular comisión (ej. 5%)
  // Convertimos el rate (ej. 5) a decimal (0.05)
  const decimalCommission = commissionRate / 100;
  const commissionValue = invoiceValue * decimalCommission;

  // 2. Valor después de comisión
  // valorDespuesDeComision = valorFactura - comision
  const valueAfterCommission = invoiceValue - commissionValue;

  // 3. Calcular 4 x 1000 sobre el valor después de comisión
  // Formula: (valor * taxRate) / 1000.  Donde taxRate es usualmente 4.
  const tax4x1000Value = (valueAfterCommission * taxRate) / 1000;

  // 4. Consignación final
  const finalConsignment = valueAfterCommission - tax4x1000Value;

  // 5. REDONDEO AL 1000 MÁS CERCANO (Según requerimiento)
  const roundedConsignment = mround(finalConsignment, 1000);

  return {
    commissionValue,
    valueAfterCommission,
    tax4x1000Value,
    finalConsignment: roundedConsignment
  };
};