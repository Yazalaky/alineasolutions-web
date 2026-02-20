# Guia de Migracion a Windows 11 - Alinea Soluciones Web

## Objetivo
Esta guia documenta una estructura ideal de documentacion tecnica y su aplicacion practica para migrar este proyecto a un entorno Windows 11 sin perder productividad.

## 1) Plantilla recomendada (guia ideal por proyecto)

Usa esta plantilla base para cualquier repo:

````md
# Nombre del proyecto

## 1. Descripcion
Breve explicacion de que hace el proyecto.

## 2. Requisitos del entorno
- Node.js vXX
- Python vX.X (si aplica)
- Firebase CLI (si aplica)
- Docker (si aplica)

## 3. Variables de entorno
Archivo .env requerido:
- VAR_1=
- VAR_2=

## 4. Instalacion
```bash
npm install
# o
pip install -r requirements.txt
```

## 5. Ejecucion
```bash
npm run dev
# o
python app.py
```

## 6. Build / Deploy
```bash
npm run build
firebase deploy
```

## 7. Notas importantes
- Rutas usadas
- Puertos
- Advertencias
````

## 2) Guia aplicada a este proyecto (Alinea Soluciones Web)

### 2.1 Descripcion
SPA comercial (React + TypeScript + Vite) para:
- captar solicitudes de credito por nomina,
- simular credito de primera vez,
- simular adelanto de factura (OPS),
- facilitar acceso a pagos PSE.

### 2.2 Requisitos del entorno (Windows 11)
- Windows 11 actualizado.
- Git for Windows.
- Node.js `>= 20`.
- npm `>= 10`.
- Editor recomendado: VS Code.
- Terminal recomendada: PowerShell o Git Bash.

Comandos de validacion:

```bash
node -v
npm -v
git --version
```

### 2.3 Variables de entorno
Variables soportadas por el proyecto:
- `GEMINI_API_KEY` (opcional, compatibilidad de plantilla base).

Archivo recomendado:
- `.env.local` (opcional para local).

Si existe `.env.example`:

```bash
copy .env.example .env.local
```

En Git Bash tambien funciona:

```bash
cp .env.example .env.local
```

### 2.4 Instalacion
Desde la raiz del repo:

```bash
npm ci
```

### 2.5 Ejecucion
Servidor de desarrollo:

```bash
npm run dev
```

Abrir en navegador:
- `http://localhost:3000`

### 2.6 Build / verificacion de release
Generar build:

```bash
npm run build
```

Previsualizar build local:

```bash
npm run preview
```

### 2.7 Notas importantes para migracion a Windows 11

#### Rutas y estructura clave
- Vistas: `App.tsx` (`home`, `simulator`, `apply` por hash).
- Paginas: `pages/LandingPage.tsx`, `pages/SimulatorPage.tsx`, `pages/LoanRequestPage.tsx`.
- Calculos: `utils/loanCalculator.ts`.

#### Puerto por defecto
- Desarrollo: `3000`.

Si el puerto esta ocupado:

```bash
npm run dev -- --port 3001
```

#### Line endings (recomendado en Windows)
Para evitar cambios de fin de linea no deseados:

```bash
git config --global core.autocrlf false
```

#### Reglas funcionales que no se deben romper
- Simulador credito:
  - 12 meses siempre.
  - 18 meses: edad >= 35 y vinculacion > 2 anos.
  - 24 meses: edad >= 35 y vinculacion > 3 anos.
- Simulador adelanto:
  - Comision base 5%.
  - 4x1000 despues de comision.
  - Redondeo final al 1000.

#### Criterio de validacion post-migracion
Checklist minimo:
1. `npm run dev` levanta sin errores.
2. Navegacion hash funciona (`/#`, `/#simulator`, `/#apply`).
3. Simulador de credito y adelanto calculan correctamente.
4. Formulario de solicitud muestra flujo de envio simulado.
5. `npm run build` compila sin errores.

## 3) Recomendacion operativa
Si el equipo trabaja mixto (Windows/macOS/Linux), mantener esta guia actualizada junto con `README.md` cada vez que cambien:
- versiones minimas de runtime,
- variables de entorno,
- scripts,
- puertos o forma de despliegue.
