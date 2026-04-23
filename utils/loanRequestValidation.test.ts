import { describe, expect, it } from 'vitest';
import {
  formatPhoneDisplay,
  hasLoanRequestErrors,
  normalizeLoanRequestData,
  sanitizeLoanRequestValue,
  validateLoanRequestData,
} from './loanRequestValidation';

describe('loanRequestValidation', () => {
  it('sanitiza campos numericos y normaliza datos de texto', () => {
    expect(sanitizeLoanRequestValue('docNumber', '12.345-678')).toBe('12345678');
    expect(sanitizeLoanRequestValue('phone', '300 123 4567')).toBe('3001234567');

    expect(
      normalizeLoanRequestData({
        fullName: '  Ana   Maria  Lopez ',
        docType: 'CC',
        docNumber: '12.345.678',
        email: '  ANA@MAIL.COM ',
        phone: '300 123 4567',
        company: '  Empresa   Demo ',
        contractType: 'Término Fijo',
        salary: '3.500.000',
        amount: '$900.000',
      }),
    ).toEqual({
      fullName: 'Ana Maria Lopez',
      docType: 'CC',
      docNumber: '12345678',
      email: 'ana@mail.com',
      phone: '3001234567',
      company: 'Empresa Demo',
      contractType: 'Término Fijo',
      salary: '3500000',
      amount: '900000',
    });
  });

  it('reporta errores cuando los campos requeridos son invalidos', () => {
    const errors = validateLoanRequestData({
      fullName: 'Al',
      docType: 'TI',
      docNumber: '123',
      email: 'correo-invalido',
      phone: '30012',
      company: '',
      contractType: 'Temporal',
      salary: '0',
      amount: '',
    });

    expect(errors).toMatchObject({
      fullName: 'Ingresa tu nombre completo.',
      docType: 'Selecciona un tipo de documento válido.',
      docNumber: 'Ingresa un número de documento válido.',
      email: 'Ingresa un correo electrónico válido.',
      phone: 'Ingresa un celular de 10 dígitos.',
      company: 'Ingresa la empresa donde trabajas.',
      contractType: 'Selecciona un tipo de contrato válido.',
      salary: 'Ingresa un salario mensual válido.',
      amount: 'Ingresa un monto válido para la solicitud.',
    });

    expect(hasLoanRequestErrors(errors)).toBe(true);
  });

  it('acepta datos validos y formatea el celular para la vista de exito', () => {
    const errors = validateLoanRequestData({
      fullName: 'Ana Maria Lopez',
      docType: 'CC',
      docNumber: '1234567890',
      email: 'ana@mail.com',
      phone: '3001234567',
      company: 'Empresa Demo',
      contractType: 'Término Fijo',
      salary: '3500000',
      amount: '900000',
    });

    expect(errors).toEqual({});
    expect(hasLoanRequestErrors(errors)).toBe(false);
    expect(formatPhoneDisplay('3001234567')).toBe('300 123 4567');
  });
});
