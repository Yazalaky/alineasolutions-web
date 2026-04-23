import {
  DEFAULT_ADELANTO_COMMISSION_RATE,
  DEFAULT_ADELANTO_TAX_RATE,
  DEFAULT_MAX_INDEBTEDNESS,
  DEFAULT_MONTHLY_RATE,
} from '../constants';
import { AdelantoInputs, CreditRow, SimulatorInputs } from '../types';
import {
  calculateFirstTimeCredits,
  calculateYearsOfService,
} from './loanCalculator';

export const createInitialCreditInputs = (): SimulatorInputs => ({
  monthlyRate: DEFAULT_MONTHLY_RATE,
  age: 0,
  netSalary: 0,
  maxIndebtedness: DEFAULT_MAX_INDEBTEDNESS,
  startDate: '',
});

export const createInitialAdelantoInputs = (): AdelantoInputs => ({
  invoiceValue: 0,
  commissionRate: DEFAULT_ADELANTO_COMMISSION_RATE,
  taxRate: DEFAULT_ADELANTO_TAX_RATE,
});

export const parseSimulatorNumberInput = (value: string): number => {
  const parsed = Number.parseFloat(value.trim());
  return Number.isFinite(parsed) ? parsed : 0;
};

export const getCreditSimulation = (
  creditInputs: SimulatorInputs,
): {
  yearsOfService: number;
  creditResults: CreditRow[];
  hasRequiredInputs: boolean;
} => {
  const yearsOfService = calculateYearsOfService(creditInputs.startDate);
  const hasRequiredInputs =
    creditInputs.age > 0 &&
    creditInputs.netSalary > 0 &&
    creditInputs.startDate.length > 0;

  return {
    yearsOfService,
    creditResults: hasRequiredInputs ? calculateFirstTimeCredits(creditInputs) : [],
    hasRequiredInputs,
  };
};

export const canCalculateAdelanto = (adelantoInputs: AdelantoInputs): boolean => {
  return adelantoInputs.invoiceValue > 0;
};
