# AGENTS.md - Guia de trabajo del proyecto

## Contexto rapido

Este repositorio contiene la web de Alinea Soluciones (React + TypeScript + Vite), enfocada en captacion comercial y simulacion financiera.

Objetivos de producto:
- Mostrar propuesta de valor y confianza de marca.
- Simular credito por nomina y adelanto de factura.
- Recibir solicitudes de credito.
- Facilitar acceso a pagos PSE.

## Reglas de colaboracion

1. Mantener cambios acotados al requerimiento del ticket/sesion.
2. No romper estilos y lenguaje comercial en espanol.
3. Preservar experiencia responsive (mobile y desktop).
4. No eliminar reglas de negocio del simulador sin aprobacion explicita.
5. No tocar branding (logo, colores, textos legales) sin solicitud.

## Arquitectura funcional minima

- Routing de vistas por hash en `App.tsx`: `home`, `simulator`, `apply`.
- Paginas:
  - `pages/LandingPage.tsx`
  - `pages/SimulatorPage.tsx`
  - `pages/LoanRequestPage.tsx`
- Componentes globales:
  - `components/Header.tsx`
  - `components/Footer.tsx`
  - `components/FloatingButtons.tsx`
- Calculos financieros:
  - `utils/loanCalculator.ts`

## Reglas de negocio criticas

- Simulador de credito:
  - Plazo 12 meses siempre disponible.
  - Plazo 18 meses: edad >= 35 y vinculacion > 2 anos.
  - Plazo 24 meses: edad >= 35 y vinculacion > 3 anos.
  - Redondeos definidos en `utils/loanCalculator.ts`.
- Simulador adelanto:
  - Comision base 5%.
  - 4x1000 sobre valor despues de comision.
  - Resultado final redondeado al 1000.

## Convenciones tecnicas

- Lenguaje: TypeScript estricto y componentes funcionales.
- Estilos: clases Tailwind existentes del proyecto.
- Tipos compartidos: `types.ts`.
- Constantes de negocio/texto: `constants.ts`.
- Evitar introducir dependencias nuevas sin justificacion.

## Definicion de terminado

Para considerar una tarea terminada:
1. El flujo principal funciona manualmente en `npm run dev`.
2. `npm run build` compila sin errores.
3. No se rompen navegacion ni botones principales.
4. Si se cambian reglas del simulador, se documentan en `docs/reglas-negocio.md`.

## Prompt sugerido para nuevas sesiones

Ver `docs/prompts-codex.md`.
