import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  canCalculateAdelanto,
  createInitialAdelantoInputs,
  createInitialCreditInputs,
  getCreditSimulation,
  parseSimulatorNumberInput,
} from './simulatorState';

afterEach(() => {
  vi.useRealTimers();
});

describe('simulatorState', () => {
  it('crea valores iniciales alineados con las reglas base del simulador', () => {
    expect(createInitialCreditInputs()).toEqual({
      monthlyRate: 0.028,
      age: 0,
      netSalary: 0,
      maxIndebtedness: 0.3,
      startDate: '',
    });

    expect(createInitialAdelantoInputs()).toEqual({
      invoiceValue: 0,
      commissionRate: 5,
      taxRate: 4,
    });
  });

  it('parsea numeros del simulador sin propagar NaN', () => {
    expect(parseSimulatorNumberInput('123.45')).toBe(123.45);
    expect(parseSimulatorNumberInput('')).toBe(0);
    expect(parseSimulatorNumberInput('abc')).toBe(0);
  });

  it('solo calcula resultados de credito cuando los campos requeridos estan completos', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-23T00:00:00.000Z'));

    expect(
      getCreditSimulation({
        ...createInitialCreditInputs(),
        age: 35,
        startDate: '2024-04-23T00:00:00.000Z',
      }),
    ).toEqual({
      yearsOfService: 2.03,
      creditResults: [],
      hasRequiredInputs: false,
    });
  });

  it('deriva resultados de credito cuando ya hay informacion suficiente', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-23T00:00:00.000Z'));

    const simulation = getCreditSimulation({
      ...createInitialCreditInputs(),
      age: 35,
      netSalary: 3000000,
      startDate: '2024-04-23T00:00:00.000Z',
    });

    expect(simulation.hasRequiredInputs).toBe(true);
    expect(simulation.yearsOfService).toBe(2.03);
    expect(simulation.creditResults).toHaveLength(3);
  });

  it('solo habilita el calculo de adelanto con un valor de factura positivo', () => {
    expect(canCalculateAdelanto(createInitialAdelantoInputs())).toBe(false);
    expect(
      canCalculateAdelanto({
        ...createInitialAdelantoInputs(),
        invoiceValue: 500000,
      }),
    ).toBe(true);
  });
});
