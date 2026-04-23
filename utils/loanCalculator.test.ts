import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  calculateAdelanto,
  calculateFirstTimeCredits,
  calculateYearsOfService,
} from './loanCalculator';

afterEach(() => {
  vi.useRealTimers();
});

describe('calculateYearsOfService', () => {
  it('calcula los anios de servicio con base 360', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-23T00:00:00.000Z'));

    expect(calculateYearsOfService('2024-04-23T00:00:00.000Z')).toBe(2.03);
  });
});

describe('calculateFirstTimeCredits', () => {
  it('mantiene 12 meses disponible aunque no cumpla otras condiciones', () => {
    const results = calculateFirstTimeCredits({
      monthlyRate: 0.028,
      age: 30,
      netSalary: 3000000,
      maxIndebtedness: 0.3,
      startDate: '2026-01-01T00:00:00.000Z',
    });

    expect(results).toEqual([
      {
        term: 12,
        amount: 3600000,
        monthlyPayment: 357000,
        isApplicable: true,
      },
      {
        term: 18,
        amount: null,
        monthlyPayment: null,
        isApplicable: false,
      },
      {
        term: 24,
        amount: null,
        monthlyPayment: null,
        isApplicable: false,
      },
    ]);
  });

  it('habilita 18 meses cuando edad y vinculacion superan el minimo', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-23T00:00:00.000Z'));

    const results = calculateFirstTimeCredits({
      monthlyRate: 0.028,
      age: 35,
      netSalary: 3000000,
      maxIndebtedness: 0.3,
      startDate: '2024-04-23T00:00:00.000Z',
    });

    expect(results).toEqual([
      {
        term: 12,
        amount: 3600000,
        monthlyPayment: 357000,
        isApplicable: true,
      },
      {
        term: 18,
        amount: 5036032.650170831,
        monthlyPayment: 360000,
        isApplicable: true,
      },
      {
        term: 24,
        amount: null,
        monthlyPayment: null,
        isApplicable: false,
      },
    ]);
  });

  it('habilita 24 meses cuando cumple edad y mas de 3 anios de vinculacion', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-23T00:00:00.000Z'));

    const results = calculateFirstTimeCredits({
      monthlyRate: 0.028,
      age: 40,
      netSalary: 3000000,
      maxIndebtedness: 0.3,
      startDate: '2022-04-23T00:00:00.000Z',
    });

    expect(results).toEqual([
      {
        term: 12,
        amount: 3600000,
        monthlyPayment: 357000,
        isApplicable: true,
      },
      {
        term: 18,
        amount: 5036032.650170831,
        monthlyPayment: 360000,
        isApplicable: true,
      },
      {
        term: 24,
        amount: 7787816.9140549945,
        monthlyPayment: 450000,
        isApplicable: true,
      },
    ]);
  });
});

describe('calculateAdelanto', () => {
  it('aplica comision, 4x1000 y redondeo final al 1000', () => {
    expect(
      calculateAdelanto({
        invoiceValue: 1000000,
        commissionRate: 5,
        taxRate: 4,
      }),
    ).toEqual({
      commissionValue: 50000,
      valueAfterCommission: 950000,
      tax4x1000Value: 3800,
      finalConsignment: 946000,
    });
  });
});
