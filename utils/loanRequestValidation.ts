import { CONTRACT_TYPES, DOCUMENT_TYPE_OPTIONS } from '../constants';
import { DocumentType, FormData } from '../types';

export type LoanRequestField = keyof FormData;
export type LoanRequestErrors = Partial<Record<LoanRequestField, string>>;

const VALID_DOC_TYPES: DocumentType[] = DOCUMENT_TYPE_OPTIONS.map(({ value }) => value);
const DIGIT_ONLY_FIELDS: LoanRequestField[] = ['docNumber', 'phone', 'salary', 'amount'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeText = (value: string) => value.trim().replace(/\s+/g, ' ');

export const sanitizeLoanRequestValue = (field: LoanRequestField, value: string): string => {
  if (DIGIT_ONLY_FIELDS.includes(field)) {
    return value.replace(/\D+/g, '');
  }

  if (field === 'email') {
    return value.trimStart();
  }

  return value;
};

export const normalizeLoanRequestFieldValue = (
  field: LoanRequestField,
  value: string,
): string => {
  if (DIGIT_ONLY_FIELDS.includes(field)) {
    return value.replace(/\D+/g, '');
  }

  if (field === 'email') {
    return value.trim().toLowerCase();
  }

  if (field === 'fullName' || field === 'company') {
    return normalizeText(value);
  }

  return value.trim();
};

export const normalizeLoanRequestData = (data: FormData): FormData => ({
  ...data,
  fullName: normalizeLoanRequestFieldValue('fullName', data.fullName),
  docNumber: normalizeLoanRequestFieldValue('docNumber', data.docNumber),
  email: normalizeLoanRequestFieldValue('email', data.email),
  phone: normalizeLoanRequestFieldValue('phone', data.phone),
  company: normalizeLoanRequestFieldValue('company', data.company),
  contractType: normalizeLoanRequestFieldValue('contractType', data.contractType),
  salary: normalizeLoanRequestFieldValue('salary', data.salary),
  amount: normalizeLoanRequestFieldValue('amount', data.amount),
});

export const validateLoanRequestData = (data: FormData): LoanRequestErrors => {
  const errors: LoanRequestErrors = {};

  if (data.fullName.length < 3) {
    errors.fullName = 'Ingresa tu nombre completo.';
  }

  if (!VALID_DOC_TYPES.includes(data.docType)) {
    errors.docType = 'Selecciona un tipo de documento válido.';
  }

  if (!/^\d{6,15}$/.test(data.docNumber)) {
    errors.docNumber = 'Ingresa un número de documento válido.';
  }

  if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  if (!/^\d{10}$/.test(data.phone)) {
    errors.phone = 'Ingresa un celular de 10 dígitos.';
  }

  if (data.company.length < 2) {
    errors.company = 'Ingresa la empresa donde trabajas.';
  }

  if (!CONTRACT_TYPES.includes(data.contractType)) {
    errors.contractType = 'Selecciona un tipo de contrato válido.';
  }

  if (!data.salary || Number(data.salary) <= 0) {
    errors.salary = 'Ingresa un salario mensual válido.';
  }

  if (!data.amount || Number(data.amount) <= 0) {
    errors.amount = 'Ingresa un monto válido para la solicitud.';
  }

  return errors;
};

export const hasLoanRequestErrors = (errors: LoanRequestErrors): boolean => {
  return Object.keys(errors).length > 0;
};

export const formatPhoneDisplay = (phone: string): string => {
  const digits = phone.replace(/\D+/g, '');

  if (digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  return digits;
};
