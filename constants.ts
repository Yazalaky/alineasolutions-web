import { FAQItem } from "./types";

export const APP_NAME = "Alinea Soluciones";

// Valores por defecto para el simulador
export const DEFAULT_MONTHLY_RATE = 0.028; // 2.8%
export const DEFAULT_MAX_INDEBTEDNESS = 0.3; // 30%

export const FAQS: FAQItem[] = [
  {
    question: "¿Qué es el crédito por descuento de nómina?",
    answer: "Es una modalidad de préstamo donde las cuotas se descuentan automáticamente de tu salario mensual. Esto nos permite ofrecerte mejores tasas y un proceso más ágil."
  },
  {
    question: "¿Qué documentos necesito?",
    answer: "Básicamente necesitas tu documento de identidad, certificación laboral reciente (no mayor a 30 días) y tus últimos 2 desprendibles de nómina."
  },
  {
    question: "¿Reportan a centrales de riesgo?",
    answer: "Sí, reportamos el comportamiento de pago. Un buen hábito de pago con nosotros te ayudará a mejorar tu historial crediticio."
  },
  {
    question: "¿Cuánto tiempo tarda el desembolso?",
    answer: "Una vez aprobada la solicitud y firmado el contrato, el desembolso se realiza generalmente en menos de 24 horas hábiles a tu cuenta bancaria."
  }
];

export const CONTRACT_TYPES = [
  "Término Indefinido",
  "Término Fijo",
  "Obra o Labor",
  "Prestación de Servicios",
  "Carrera Administrativa",
  "Libre Nombramiento"
];
