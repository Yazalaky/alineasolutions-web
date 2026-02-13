# Alinea Soluciones Web

Sitio web corporativo y comercial de Alinea Soluciones para:
- captar solicitudes de credito por nomina,
- simular credito de primera vez,
- simular adelanto de factura (OPS),
- dirigir a pagos PSE.

## Stack

- `React 19` + `TypeScript`
- `Vite 6`
- `Tailwind (via CDN en index.html)`
- `lucide-react` para iconos

## Requisitos

- Node.js `>= 20`
- npm `>= 10`

## Ejecucion local

1. Instalar dependencias:
   ```bash
   npm ci
   ```
2. Crear archivo de entorno local (opcional):
   ```bash
   cp .env.example .env.local
   ```
3. Levantar entorno:
   ```bash
   npm run dev
   ```
4. Abrir: `http://localhost:3000`

## Scripts

- `npm run dev`: servidor local.
- `npm run build`: build de produccion.
- `npm run preview`: preview del build local.

## Navegacion de la app

La navegacion principal usa hash para mantener deep-linking en SPA sin backend:
- `/#` o sin hash: Inicio
- `/#simulator`: Simulador
- `/#apply`: Solicitud

Archivo clave: `App.tsx`.

## Estructura principal

```text
.
|-- App.tsx
|-- components/
|   |-- Header.tsx
|   |-- Footer.tsx
|   `-- FloatingButtons.tsx
|-- pages/
|   |-- LandingPage.tsx
|   |-- SimulatorPage.tsx
|   `-- LoanRequestPage.tsx
|-- utils/
|   `-- loanCalculator.ts
|-- constants.ts
|-- types.ts
|-- public/
|   |-- logo-alinea.png
|   `-- logo-alinea@2x.png
`-- docs/
```

## Variables de entorno

El proyecto define `GEMINI_API_KEY` en `vite.config.ts` por compatibilidad con plantilla base.
Actualmente no hay consumo activo de API de Gemini en la UI.

Variables soportadas:
- `GEMINI_API_KEY` (opcional)

## Documentacion interna

- `AGENTS.md`: guia operativa para colaboradores/Codex.
- `docs/arquitectura.md`: arquitectura de UI y flujo.
- `docs/reglas-negocio.md`: formulas y reglas funcionales.
- `docs/prompts-codex.md`: prompts sugeridos para sesiones nuevas.
- `docs/tareas.md`: backlog tecnico/funcional.

## Estado actual

- Formulario de solicitud simula envio local (no integra backend).
- Enlaces legales del footer estan en placeholder `#`.
- No hay suite de pruebas automatizadas todavia.
