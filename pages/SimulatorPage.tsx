import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Info, User, Percent, Briefcase, Calculator, FileText, ArrowRightCircle } from 'lucide-react';
import { 
  calculateFirstTimeCredits, 
  calculateYearsOfService, 
  calculateAdelanto,
  formatCurrency 
} from '../utils/loanCalculator';
import { ViewState, SimulatorInputs, CreditRow, AdelantoInputs, AdelantoResult } from '../types';
import { DEFAULT_MONTHLY_RATE, DEFAULT_MAX_INDEBTEDNESS } from '../constants';

interface SimulatorPageProps {
  onNavigate: (view: ViewState) => void;
}

type TabType = 'credit' | 'adelanto';

export const SimulatorPage: React.FC<SimulatorPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<TabType>('credit');

  // --- ESTADO PARA SIMULADOR DE CRÉDITO ---
  const [creditInputs, setCreditInputs] = useState<SimulatorInputs>({
    monthlyRate: DEFAULT_MONTHLY_RATE,
    age: 30,
    netSalary: 2000000,
    maxIndebtedness: DEFAULT_MAX_INDEBTEDNESS,
    startDate: '', 
  });
  const [yearsOfService, setYearsOfService] = useState<number>(0);
  const [creditResults, setCreditResults] = useState<CreditRow[]>([]);

  // --- ESTADO PARA SIMULADOR DE ADELANTO ---
  const [adelantoInputs, setAdelantoInputs] = useState<AdelantoInputs>({
    invoiceValue: 0,
    commissionRate: 5, // 5% por defecto
    taxRate: 4, // 4 (para 4x1000) por defecto (oculto en UI)
  });
  const [adelantoResults, setAdelantoResults] = useState<AdelantoResult | null>(null);

  // Efecto para Crédito
  useEffect(() => {
    const years = calculateYearsOfService(creditInputs.startDate);
    setYearsOfService(years);
    const rows = calculateFirstTimeCredits(creditInputs);
    setCreditResults(rows);
  }, [creditInputs]);

  // Handlers Crédito
  const handleCreditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setCreditInputs(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  // Handlers Adelanto
  const handleAdelantoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdelantoInputs(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const calculateAdelantoClick = () => {
    const res = calculateAdelanto(adelantoInputs);
    setAdelantoResults(res);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-[calc(100vh-80px)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-brand-900 sm:text-4xl">
            Simulador de Servicios
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Elige la herramienta que necesitas hoy.
          </p>
        </div>

        {/* TABS DE NAVEGACIÓN */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex">
            <button
              onClick={() => setActiveTab('credit')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'credit' 
                  ? 'bg-brand-900 text-white shadow-md' 
                  : 'text-gray-500 hover:text-brand-900 hover:bg-gray-50'
              }`}
            >
              <User className="w-4 h-4" /> Crédito Nómina
            </button>
            <button
              onClick={() => setActiveTab('adelanto')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'adelanto' 
                  ? 'bg-accent-500 text-white shadow-md' 
                  : 'text-gray-500 hover:text-accent-500 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4" /> Adelanto Factura (OPS)
            </button>
          </div>
        </div>

        {/* --- CONTENIDO SIMULADOR CRÉDITO --- */}
        {activeTab === 'credit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* INPUTS CRÉDITO */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-accent-500" /> Datos del Solicitante
                </h3>
                
                <div className="space-y-5">
                  <div className="bg-brand-50 rounded-lg p-4 border border-brand-100 flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold text-brand-600 uppercase tracking-wide">Tasa Mensual Fija</span>
                      <span className="text-2xl font-bold text-brand-900">2.8% M.V.</span>
                    </div>
                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-brand-500 shadow-sm">
                      <Percent className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Edad (años)
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={creditInputs.age}
                      onChange={handleCreditChange}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salario Neto Mensual
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="netSalary"
                        value={creditInputs.netSalary}
                        onChange={handleCreditChange}
                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Ingreso Laboral
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={creditInputs.startDate}
                      onChange={handleCreditChange}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                      <Briefcase className="w-3 h-3" /> Tiempo de Vinculación
                    </label>
                    <div className="text-xl font-bold text-brand-900">
                      {yearsOfService} años
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Calculado base 360 días</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RESULTADOS CRÉDITO */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full">
                <div className="p-6 sm:p-8 bg-brand-900 text-white">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent-500" /> Resultados: Créditos Primera Vez
                  </h3>
                  <p className="text-brand-200 text-sm mt-2 opacity-80">
                    Tasas y cuotas aproximadas sujetas a validación de documentos.
                  </p>
                </div>

                <div className="p-6 sm:p-8 flex-grow">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 rounded-tl-lg rounded-bl-lg">
                            Plazo
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                            Valor Desembolsado
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 rounded-tr-lg rounded-br-lg">
                            Cuota Estimada
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {creditResults.map((row) => (
                          <tr key={row.term} className={!row.isApplicable ? "opacity-50 bg-gray-50" : "hover:bg-brand-50 transition-colors"}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${row.isApplicable ? 'bg-brand-100 text-brand-900' : 'bg-gray-200 text-gray-500'}`}>
                                  {row.term}
                                </div>
                                <span className="ml-3 text-sm font-medium text-gray-900">Meses</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {row.isApplicable ? (
                                <span className="text-base font-bold text-brand-900">
                                  {formatCurrency(row.amount || 0)}
                                </span>
                              ) : (
                                <span className="text-sm text-gray-400 italic">N/A</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                               {row.isApplicable ? (
                                <span className="text-base font-bold text-accent-600">
                                  {formatCurrency(row.monthlyPayment || 0)}
                                </span>
                              ) : (
                                <span className="text-sm text-gray-400 italic">N/A</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8 bg-blue-50 p-4 rounded-lg flex items-start gap-3 border border-blue-100">
                    <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Condiciones de Cálculo:</p>
                      <ul className="list-disc pl-4 space-y-1 opacity-90">
                        <li><strong>12 Meses:</strong> Disponible para todos los perfiles.</li>
                        <li><strong>18 Meses:</strong> Requiere ser mayor de 35 años y tener más de 2 años de vinculación.</li>
                        <li><strong>24 Meses:</strong> Requiere ser mayor de 35 años y tener más de 3 años de vinculación.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center">
                     <button
                      onClick={() => onNavigate('apply')}
                      className="w-full sm:w-auto px-8 py-3 bg-brand-900 hover:bg-brand-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      Solicitar Crédito Ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- CONTENIDO SIMULADOR ADELANTO (NUEVO) --- */}
        {activeTab === 'adelanto' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* INPUTS ADELANTO */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-accent-500" /> Datos de la Factura
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Calcula el valor que recibirás al adelantar tu cuenta de cobro u orden de prestación de servicios.
                </p>

                <div className="space-y-5">
                  <div className="bg-brand-50 rounded-lg p-4 border border-brand-100 flex items-center justify-between">
                    <div>
                      <span className="block text-xs font-bold text-brand-600 uppercase tracking-wide">Comisión Alinea</span>
                      <span className="text-2xl font-bold text-brand-900">5%</span>
                    </div>
                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-brand-500 shadow-sm">
                      <Percent className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor de la Factura
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="invoiceValue"
                        value={adelantoInputs.invoiceValue || ''}
                        onChange={handleAdelantoChange}
                        placeholder="Ej. 5000000"
                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-accent-500 focus:border-accent-500"
                      />
                    </div>
                  </div>

                  {/* Eliminados campos editables de Comisión y 4x1000 según requerimiento */}

                  <button
                    onClick={calculateAdelantoClick}
                    className="w-full mt-4 px-6 py-4 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl shadow-lg shadow-accent-500/20 transform transition hover:-translate-y-1 flex justify-center items-center gap-2"
                  >
                    Calcular Adelanto <ArrowRightCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* RESULTADOS ADELANTO */}
            <div className="lg:col-span-7">
               {adelantoResults ? (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full animate-in fade-in zoom-in duration-300">
                  <div className="p-6 sm:p-8 bg-accent-500 text-white">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <FileText className="w-5 h-5 text-white" /> Detalle de Consignación
                    </h3>
                    <p className="text-white/80 text-sm mt-2">
                      Valor final después de aplicar comisión y 4x1000.
                    </p>
                  </div>
                  
                  <div className="p-6 sm:p-8 flex flex-col justify-center h-[calc(100%-110px)]">
                    {/* Resumen Simplificado */}
                    <div className="space-y-6">
                       <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                          <span className="text-gray-600 text-lg">Valor de la Factura</span>
                          <span className="font-bold text-gray-900 text-xl">{formatCurrency(adelantoInputs.invoiceValue)}</span>
                       </div>

                       <div className="bg-brand-50 p-8 rounded-xl border border-brand-100 text-center">
                          <span className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Consignación Aproximada</span>
                          <span className="block text-5xl sm:text-6xl font-bold text-brand-900 tracking-tight">
                            {formatCurrency(adelantoResults.finalConsignment)}
                          </span>
                       </div>
                    </div>

                    <div className="mt-8 bg-yellow-50 p-4 rounded-lg flex items-start gap-3 border border-yellow-100">
                       <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                       <p className="text-sm text-yellow-800">
                          <strong>Recuerda:</strong> El desembolso está sujeto a la verificación de la validez de la cuenta de cobro y la aprobación por parte de la entidad pagadora.
                       </p>
                    </div>
                  </div>
                </div>
               ) : (
                 /* Estado vacío (antes de calcular) */
                 <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 h-full flex flex-col items-center justify-center p-12 text-center opacity-70">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                       <Calculator className="w-8 h-8 text-gray-300" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-400 mb-2">Esperando datos...</h4>
                    <p className="text-gray-400 max-w-xs">Ingresa el valor de tu factura y haz clic en calcular.</p>
                 </div>
               )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};