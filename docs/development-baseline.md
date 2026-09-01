# Alinea Development Baseline

Este documento define el baseline de desarrollo certificado para el proyecto Alinea. Su objetivo es garantizar un entorno reproducible, validable y alineado con las convenciones del equipo antes de cualquier entrega de código.

## Runtime

- `.nvmrc` = `20`
- Node certificado: `v20.20.2`
- npm certificado: `10.8.2`

> Usar la versión de Node indicada en `.nvmrc` y validar que npm corresponda a la versión certificada antes de ejecutar comandos del proyecto.

## Installation

La instalación de dependencias debe realizarse exclusivamente mediante:

```bash
npm ci
```

No está permitido usar `npm install` para sincronizar dependencias en entornos de desarrollo o integración.

## Validation Commands

Los comandos obligatorios para validar el estado del baseline son:

| Comando | Propósito |
| --- | --- |
| `npm ci` | Instalación reproducible de dependencias |
| `npm run typecheck` | Verificación de tipos de TypeScript |
| `npm test` | Ejecución de la suite de tests |
| `npm run build` | Generación del build de producción |

### Estado de lint

- **lint:** `NOT_DEFINED`

No existe un comando de lint certificado como parte de este baseline.

## Test Baseline

- Framework de tests: **Vitest**
- Baseline certificado:
  - **4 archivos de test**
  - **15 tests passed**

Este baseline debe mantenerse como referencia mínima en cada cambio. Cualquier regresión en el número de tests passed o en la cantidad de archivos de test debe ser revisada antes de considerar el cambio válido.

## Branch Policy

### Convención de ramas

Las ramas de trabajo deben seguir el formato:

```
agent/<task-id>-<short-description>
```

Ejemplo:

```
agent/abc123-fix-calculator-rounding
```

### Restricciones sobre `main`

- La implementación directa por agentes sobre `main` **no está permitida**.
- El commit directo por agentes sobre `main` **no está permitido**.
- El push directo por agentes a `main` **no está permitido**.

Todo cambio debe pasar por una rama de trabajo siguiendo la convención definida y ser integrado a `main` mediante el flujo de revisión correspondiente.

## Deploy Readiness

Deploy readiness es una etapa separada del development baseline/check readiness. Este documento certifica únicamente el entorno de desarrollo, instalación, validación de tipos, tests y build.

**Este documento no certifica deploy readiness.**
