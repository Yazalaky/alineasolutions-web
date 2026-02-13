# Arquitectura del proyecto

## Vision general

Aplicacion SPA sin backend propio en este repo.
La UI se organiza por vistas y componentes reutilizables.

## Flujo principal

1. Header permite navegar entre Inicio, Simulador y Solicitud.
2. Landing informa propuesta de valor y convierte a simulador/solicitud.
3. Simulador calcula escenarios de credito y adelanto.
4. Formulario de solicitud recoge datos del prospecto.
5. Footer complementa informacion de contacto, legal y pagos PSE.

## Navegacion

Se usa estado local + hash (`window.location.hash`) en `App.tsx`.
Vistas disponibles:
- `home`
- `simulator`
- `apply`

Deep links:
- `/#`
- `/#simulator`
- `/#apply`

## Modulos y responsabilidades

- `App.tsx`
  - Orquestacion de layout global.
  - Resolucion de vista desde hash.
- `components/Header.tsx`
  - Navegacion desktop/mobile.
  - Logo corporativo y acceso PSE.
- `components/Footer.tsx`
  - Bloques de contacto, pagos y enlaces legales.
- `components/FloatingButtons.tsx`
  - Boton WhatsApp y volver arriba.
- `pages/LandingPage.tsx`
  - Hero, beneficios, FAQ, CTA.
- `pages/SimulatorPage.tsx`
  - Tabs de simulador de credito y adelanto.
  - Captura de datos y visualizacion de resultados.
- `pages/LoanRequestPage.tsx`
  - Formulario comercial y confirmacion de envio.
- `utils/loanCalculator.ts`
  - Formulas de credito y adelanto.
- `constants.ts`
  - FAQs, tipos de contrato y defaults.
- `types.ts`
  - Tipado comun de app.

## Estado y datos

- Sin store global.
- Estado local por componente (`useState`, `useEffect`).
- No hay persistencia externa ni API real para solicitud.

## Activos visuales

- Logo principal:
  - `public/logo-alinea.png`
  - `public/logo-alinea@2x.png`

## Consideraciones para evolucion

- Si se integra backend:
  - extraer capa de servicios (`services/`).
  - validar y sanear payload del formulario.
- Si crece navegacion:
  - migrar a `react-router-dom` para rutas formales.
