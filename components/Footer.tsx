import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const PseLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <circle cx="50" cy="50" r="50" fill="#183660" />
    <path d="M15,50 L25,50 L30,42" fill="none" stroke="#FABD00" strokeWidth="3" strokeLinecap="round" />
    <circle cx="15" cy="50" r="4" fill="#FABD00" />
    <circle cx="28" cy="35" r="3" fill="#FABD00" />
    <circle cx="20" cy="65" r="3" fill="#FABD00" />
    <path d="M35,40 C35,40 45,38 45,48 C45,58 35,58 35,58 L35,70" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <path d="M55,60 C55,60 50,60 50,55 C50,50 60,50 60,45 C60,40 55,40 55,40" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <path d="M70,55 H80 V40 H70 V70 H80" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
    <text x="38" y="32" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="bold">ach</text>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-900 text-white pt-16 pb-8" data-theme="dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center h-16 sm:h-20 md:h-24 rounded-full overflow-hidden bg-brand-900">
                <img
                  src="/logo-alinea.png"
                  srcSet="/logo-alinea@2x.png 2x"
                  alt="Alinea Soluciones"
                  className="h-full w-auto object-cover scale-115 -translate-y-[4px]"
                />
              </div>
            </div>
            <p className="text-brand-100 mb-6 max-w-md">
              Somos la financiera que entiende tus necesidades. Trabajamos con descuento por nómina para ofrecerte tasas justas, procesos transparentes y la confianza que necesitas para cumplir tus metas.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Contacto</h4>
            <ul className="space-y-3 text-brand-100">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-accent-500 mt-0.5" />
                <span>(+57) 601 123 4567<br/>(+57) 300 987 6543</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent-500" />
                <span>contacto@alineasoluciones.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent-500 mt-0.5" />
                <span>Calle 100 # 15-20, Of. 302<br/>Bogotá, Colombia</span>
              </li>
            </ul>
          </div>

          {/* New Section: Online Payments */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Pagos en Línea</h4>
            <p className="text-sm text-brand-100 mb-3">Paga tu cuota fácil y seguro:</p>
            <a 
              href="https://micrositios.avalpaycenter.com/alinea-soluciones-sas-ma"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block hover:opacity-90 transition-opacity bg-white p-2 rounded-xl"
            >
              <div className="flex items-center gap-2">
                 <PseLogo className="w-12 h-12" />
                 <span className="text-brand-900 font-bold text-sm leading-tight">Pagar con<br/>PSE</span>
              </div>
            </a>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Enlaces Legales</h4>
            <ul className="space-y-2 text-brand-100">
              <li><a href="#" className="hover:text-accent-400 hover:underline transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-accent-400 hover:underline transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-accent-400 hover:underline transition-colors">Política de Tratamiento de Datos</a></li>
              <li><a href="#" className="hover:text-accent-400 hover:underline transition-colors">Tasas y Tarifas</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-brand-200">
          <p>&copy; {new Date().getFullYear()} Alinea Soluciones. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0 opacity-75">
            Créditos sujetos a estudio y aprobación.
          </p>
        </div>
      </div>
    </footer>
  );
};
