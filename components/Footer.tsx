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
               <div className="relative w-10 h-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-accent-500 fill-current">
                    <path d="M65.4,30.2c-5.8-5.6-13.9-8.5-23.4-8.5c-15.6,0-29.5,9.2-34.6,22.8c-1.4,3.7-2.1,7.8-2.1,12c0,16.8,11.2,31.2,26.7,35.4 c3.4,0.9,7,1.4,10.6,1.4c8.4,0,16.2-2.8,22.4-7.6V88h12V48.5C97,33.5,82.8,21.7,65.4,30.2z M65,74.2c-3.6,3.4-8.4,5.4-13.6,5.4 c-9.6,0-17.6-6.8-19.6-15.8c-0.6-2.6-0.9-5.3-0.9-8.1c0-2.3,0.2-4.5,0.6-6.7c2.2-10.6,11.5-18.6,22.6-18.6c4.5,0,8.7,1.3,12.3,3.7 L65,74.2z" />
                    <path d="M66.4,26.5c2.6-2.5,5.6-4.5,9-5.8c3.4-1.3,7.1-2,10.9-2c2.1,0,4.2,0.2,6.2,0.6V7.4c-2.3-0.6-4.8-1-7.4-1 c-5.8,0-11.2,1.5-16,4.2L66.4,26.5z" />
                  </svg>
               </div>
               <div className="flex flex-col justify-center text-white">
                  <span className="font-logo font-bold text-3xl leading-none tracking-tight pb-1">alinea</span>
                  <span className="text-[10px] font-medium opacity-80 uppercase tracking-[0.35em] leading-none ml-1">soluciones</span>
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