import React, { useState } from 'react';
import { ViewState } from '../types';
import { FAQS } from '../constants';
import { 
  ArrowRight, 
  Calculator, 
  FileCheck, 
  Banknote, 
  Zap, 
  Users, 
  Lock, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-brand-900 text-white overflow-hidden" data-theme="dark">
        {/* Abstract background element */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-500 blur-[100px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-600 blur-[80px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="md:w-2/3 lg:w-3/5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
              Impulsamos tus metas con créditos por <span className="text-accent-500">nómina</span>
            </h1>
            <p className="text-lg md:text-xl text-brand-100 mb-8 leading-relaxed font-light">
              Somos la financiera que te acompaña de forma simple, transparente y segura. 
              Sin filas, sin papeleos ocultos y descontado directamente de tu salario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('simulator')}
                className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-full shadow-lg shadow-accent-500/30 transform transition hover:-translate-y-1 flex justify-center items-center gap-2"
              >
                Simula tu crédito <Calculator className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onNavigate('apply')}
                className="px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold rounded-full transition flex justify-center items-center"
              >
                Solicita tu crédito
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900 sm:text-4xl">¿Cómo funciona?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Conseguir el dinero que necesitas es más fácil de lo que imaginas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Calculator, title: "1. Simula", desc: "Elige el monto y el plazo que mejor se ajusten a tu bolsillo en nuestro simulador." },
              { icon: FileCheck, title: "2. Solicita", desc: "Llena el formulario en línea con tus datos básicos. Sin papeleo físico innecesario." },
              { icon: Banknote, title: "3. Recibe", desc: "Una vez aprobado, desembolsamos el dinero directamente a tu cuenta bancaria." }
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-brand-50 text-brand-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-5 transform -translate-y-1/2 text-gray-200">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-900">¿Por qué elegirnos?</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border-l-4 border-accent-500">
              <Zap className="w-10 h-10 text-accent-500 mb-4" />
              <h3 className="text-xl font-bold text-brand-900 mb-2">Proceso Ágil</h3>
              <p className="text-gray-600">Respuesta en tiempo récord. Entendemos que tus necesidades no dan espera.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border-l-4 border-brand-900">
              <Users className="w-10 h-10 text-brand-900 mb-4" />
              <h3 className="text-xl font-bold text-brand-900 mb-2">Acompañamiento Cercano</h3>
              <p className="text-gray-600">No eres un número más. Nuestro equipo está listo para resolver tus dudas.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border-l-4 border-lime-500">
              <Lock className="w-10 h-10 text-lime-500 mb-4" />
              <h3 className="text-xl font-bold text-brand-900 mb-2">Claridad Total</h3>
              <p className="text-gray-600">Sin letra chiquita. Sabrás exactamente cuánto pagarás desde el primer día.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Safety */}
      <section className="py-20 bg-brand-900 text-white relative overflow-hidden" data-theme="dark">
        {/* Texture */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block p-4 bg-white/10 rounded-full mb-8">
            <Lock className="w-10 h-10 text-accent-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Tu seguridad es nuestra prioridad</h2>
          <p className="text-lg md:text-xl text-brand-100 mb-10 leading-relaxed font-light">
            Operamos bajo estrictos estándares de seguridad. Al trabajar mediante libranza (descuento por nómina), 
            garantizamos un proceso regulado donde validamos tus datos para protegerte de fraudes y suplantaciones. 
            Tus metas están en buenas manos.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-brand-900 mb-12">Preguntas Frecuentes</h2>
          
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-5 sm:p-6 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  <span className="font-semibold text-brand-900 text-lg">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-accent-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="p-5 sm:p-6 bg-brand-50 border-t border-gray-100 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900 mb-8">¿Listo para cumplir esa meta?</h2>
          <button 
            onClick={() => onNavigate('apply')}
            className="px-12 py-5 bg-accent-500 hover:bg-accent-600 text-white text-lg font-bold rounded-full shadow-xl shadow-accent-500/20 transform transition hover:scale-105"
          >
            Solicita tu crédito ahora
          </button>
        </div>
      </section>
    </div>
  );
};