import React, { useEffect, useRef, useState } from 'react';
import { Send, User, Building, Wallet, AlertCircle, CheckCircle } from 'lucide-react';
import { CONTRACT_TYPES } from '../constants';
import { FormData, ViewState } from '../types';
import {
  formatPhoneDisplay,
  hasLoanRequestErrors,
  LoanRequestErrors,
  normalizeLoanRequestData,
  normalizeLoanRequestFieldValue,
  sanitizeLoanRequestValue,
  validateLoanRequestData,
} from '../utils/loanRequestValidation';

interface LoanRequestPageProps {
  onNavigate: (view: ViewState) => void;
}

const INITIAL_FORM_DATA: FormData = {
  fullName: '',
  docType: 'CC',
  docNumber: '',
  email: '',
  phone: '',
  company: '',
  contractType: CONTRACT_TYPES[0],
  salary: '',
  amount: '',
};

const ALL_FORM_FIELDS = Object.keys(INITIAL_FORM_DATA) as Array<keyof FormData>;

export const LoanRequestPage: React.FC<LoanRequestPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<LoanRequestErrors>({});
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const submitTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current !== null) {
        window.clearTimeout(submitTimeoutRef.current);
      }
    };
  }, []);

  const getFieldError = (field: keyof FormData) => {
    if (!touchedFields[field] && !hasAttemptedSubmit) {
      return undefined;
    }

    return errors[field];
  };

  const getInputClasses = (field: keyof FormData) => {
    const hasError = Boolean(getFieldError(field));

    return `block w-full px-4 py-3 rounded-lg border focus:ring-2 focus:border-transparent ${
      hasError
        ? 'border-red-300 bg-red-50 text-red-900 focus:ring-red-500'
        : 'border-gray-300 focus:ring-brand-500'
    }`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const field = name as keyof FormData;
    const sanitizedValue = sanitizeLoanRequestValue(field, value);

    setFormData(prev => {
      const nextData = { ...prev, [field]: sanitizedValue };

      if (touchedFields[field] || hasAttemptedSubmit) {
        setErrors(validateLoanRequestData(normalizeLoanRequestData(nextData)));
      }

      return nextData;
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = e.target.name as keyof FormData;

    setTouchedFields(prev => ({ ...prev, [field]: true }));
    setFormData(prev => {
      const nextData = {
        ...prev,
        [field]: normalizeLoanRequestFieldValue(field, prev[field]),
      };

      setErrors(validateLoanRequestData(normalizeLoanRequestData(nextData)));
      return nextData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedData = normalizeLoanRequestData(formData);
    const nextErrors = validateLoanRequestData(normalizedData);

    setHasAttemptedSubmit(true);
    setTouchedFields(
      ALL_FORM_FIELDS.reduce<Partial<Record<keyof FormData, boolean>>>((acc, field) => {
        acc[field] = true;
        return acc;
      }, {}),
    );
    setFormData(normalizedData);
    setErrors(nextErrors);

    if (hasLoanRequestErrors(nextErrors)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    submitTimeoutRef.current = window.setTimeout(() => {
      console.log('Solicitud enviada:', normalizedData);
      submitTimeoutRef.current = null;
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud Enviada!</h2>
          <p className="text-gray-600 mb-8">
            Hemos recibido tus datos correctamente. Uno de nuestros asesores analizará tu perfil y te contactará al número <strong>{formatPhoneDisplay(formData.phone)}</strong> en las próximas horas.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brand-900">Solicita tu Crédito</h2>
          <p className="mt-4 text-gray-600">
            Completa el siguiente formulario. Es rápido, seguro y sin papeleos innecesarios.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-8 space-y-8">
            {hasAttemptedSubmit && hasLoanRequestErrors(errors) && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start gap-3" role="alert">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Revisa los campos marcados antes de enviar tu solicitud.
                </p>
              </div>
            )}
            
            {/* Personal Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-brand-800 border-b pb-2">
                <User className="w-5 h-5" />
                <h3>Información Personal</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ej. Juan Pérez"
                    autoComplete="name"
                    aria-invalid={Boolean(getFieldError('fullName'))}
                    aria-describedby={getFieldError('fullName') ? 'fullName-error' : undefined}
                    className={getInputClasses('fullName')}
                  />
                  {getFieldError('fullName') && (
                    <p id="fullName-error" className="mt-2 text-sm text-red-600">
                      {getFieldError('fullName')}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento</label>
                  <select
                    name="docType"
                    value={formData.docType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(getFieldError('docType'))}
                    aria-describedby={getFieldError('docType') ? 'docType-error' : undefined}
                    className={getInputClasses('docType')}
                  >
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="PP">Pasaporte</option>
                  </select>
                  {getFieldError('docType') && (
                    <p id="docType-error" className="mt-2 text-sm text-red-600">
                      {getFieldError('docType')}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Documento</label>
                  <input
                    required
                    type="text"
                    name="docNumber"
                    value={formData.docNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ej. 1234567890"
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={15}
                    aria-invalid={Boolean(getFieldError('docNumber'))}
                    aria-describedby={getFieldError('docNumber') ? 'docNumber-error' : undefined}
                    className={getInputClasses('docNumber')}
                  />
                  {getFieldError('docNumber') && (
                    <p id="docNumber-error" className="mt-2 text-sm text-red-600">
                      {getFieldError('docNumber')}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="tucorreo@ejemplo.com"
                    autoComplete="email"
                    aria-invalid={Boolean(getFieldError('email'))}
                    aria-describedby={getFieldError('email') ? 'email-error' : undefined}
                    className={getInputClasses('email')}
                  />
                  {getFieldError('email') && (
                    <p id="email-error" className="mt-2 text-sm text-red-600">
                      {getFieldError('email')}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Celular</label>
                  <input
                    required
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ej. 300 123 4567"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={10}
                    aria-invalid={Boolean(getFieldError('phone'))}
                    aria-describedby={getFieldError('phone') ? 'phone-error' : undefined}
                    className={getInputClasses('phone')}
                  />
                  {getFieldError('phone') && (
                    <p id="phone-error" className="mt-2 text-sm text-red-600">
                      {getFieldError('phone')}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Labor Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-brand-800 border-b pb-2">
                <Building className="w-5 h-5" />
                <h3>Información Laboral</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa donde trabajas</label>
                  <input
                    required
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nombre de la empresa"
                    autoComplete="organization"
                    aria-invalid={Boolean(getFieldError('company'))}
                    aria-describedby={getFieldError('company') ? 'company-error' : undefined}
                    className={getInputClasses('company')}
                  />
                  {getFieldError('company') && (
                    <p id="company-error" className="mt-2 text-sm text-red-600">
                      {getFieldError('company')}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Contrato</label>
                  <select
                    name="contractType"
                    value={formData.contractType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(getFieldError('contractType'))}
                    aria-describedby={getFieldError('contractType') ? 'contractType-error' : undefined}
                    className={getInputClasses('contractType')}
                  >
                    {CONTRACT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {getFieldError('contractType') && (
                    <p id="contractType-error" className="mt-2 text-sm text-red-600">
                      {getFieldError('contractType')}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salario Mensual Aproximado</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      required
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputMode="numeric"
                      autoComplete="off"
                      aria-invalid={Boolean(getFieldError('salary'))}
                      aria-describedby={getFieldError('salary') ? 'salary-error' : undefined}
                      className={`${getInputClasses('salary')} pl-7`}
                      placeholder="0"
                    />
                  </div>
                  {getFieldError('salary') && (
                    <p id="salary-error" className="mt-2 text-sm text-red-600">
                      {getFieldError('salary')}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Request Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-lg font-semibold text-brand-800 border-b pb-2">
                <Wallet className="w-5 h-5" />
                <h3>Detalles de la Solicitud</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monto a Solicitar</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    required
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputMode="numeric"
                    autoComplete="off"
                    aria-invalid={Boolean(getFieldError('amount'))}
                    aria-describedby={getFieldError('amount') ? 'amount-error' : undefined}
                    className={`${getInputClasses('amount')} pl-7`}
                    placeholder="0"
                  />
                </div>
                {getFieldError('amount') && (
                  <p id="amount-error" className="mt-2 text-sm text-red-600">
                    {getFieldError('amount')}
                  </p>
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">
                Al enviar este formulario, aceptas nuestras políticas de tratamiento de datos y autorizas a <strong>Alinea Soluciones</strong> a consultar tu historial crediticio para fines de estudio.
              </p>
            </div>

          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 py-3 px-8 border border-transparent rounded-lg shadow-sm text-base font-medium text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all`}
            >
              {isSubmitting ? 'Enviando...' : (
                <>
                  Enviar Solicitud <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
