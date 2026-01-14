import React, { useState } from 'react';
import { Send, User, Building, Wallet, AlertCircle, CheckCircle } from 'lucide-react';
import { CONTRACT_TYPES } from '../constants';
import { FormData, ViewState } from '../types';

interface LoanRequestPageProps {
  onNavigate: (view: ViewState) => void;
}

export const LoanRequestPage: React.FC<LoanRequestPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    docType: 'CC',
    docNumber: '',
    email: '',
    phone: '',
    company: '',
    contractType: CONTRACT_TYPES[0],
    salary: '',
    amount: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Solicitud enviada:', formData);
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
            Hemos recibido tus datos correctamente. Uno de nuestros asesores analizará tu perfil y te contactará al número <strong>{formData.phone}</strong> en las próximas horas.
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

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-8 space-y-8">
            
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
                    placeholder="Ej. Juan Pérez"
                    autoComplete="name"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento</label>
                  <select
                    name="docType"
                    value={formData.docType}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="PP">Pasaporte</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Documento</label>
                  <input
                    required
                    type="text"
                    name="docNumber"
                    value={formData.docNumber}
                    onChange={handleChange}
                    placeholder="Ej. 1234567890"
                    inputMode="numeric"
                    autoComplete="off"
                    pattern="[0-9]*"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tucorreo@ejemplo.com"
                    autoComplete="email"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número de Celular</label>
                  <input
                    required
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ej. 300 123 4567"
                    inputMode="tel"
                    autoComplete="tel"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
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
                    placeholder="Nombre de la empresa"
                    autoComplete="organization"
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Contrato</label>
                  <select
                    name="contractType"
                    value={formData.contractType}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  >
                    {CONTRACT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salario Mensual Aproximado</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      required
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      inputMode="numeric"
                      autoComplete="off"
                      className="block w-full pl-7 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
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
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    inputMode="numeric"
                    autoComplete="off"
                    className="block w-full pl-7 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
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
              className={`flex items-center gap-2 py-3 px-8 border border-transparent rounded-lg shadow-sm text-base font-medium text-white ${isSubmitting ? 'bg-gray-400' : 'bg-brand-600 hover:bg-brand-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all`}
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
