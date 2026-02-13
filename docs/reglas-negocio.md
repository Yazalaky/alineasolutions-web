# Reglas de negocio

## Simulador de credito por nomina

Fuente de verdad: `utils/loanCalculator.ts`.

Parametros base:
- Tasa mensual por defecto: `2.8%` (`DEFAULT_MONTHLY_RATE = 0.028`).
- Endeudamiento maximo por defecto: `30%` (`DEFAULT_MAX_INDEBTEDNESS = 0.3`).
- Anios de vinculacion: diferencia de fechas con base 360.

### Elegibilidad por plazo

1. `12 meses`: siempre disponible.
2. `18 meses`: requiere `edad >= 35` y `aniosServicio > 2`.
3. `24 meses`: requiere `edad >= 35` y `aniosServicio > 3`.

### Reglas de calculo

- Capacidad maxima mensual:
  - `maxCapacity = netSalary * maxIndebtedness`
- Uso de funciones financieras:
  - `PV` para capital.
  - `PMT` para cuota.
- Redondeos:
  - Capital 12 meses redondeado a `100000`.
  - Cuotas redondeadas a `1000`.

## Simulador de adelanto de factura (OPS)

Fuente de verdad: `utils/loanCalculator.ts`.

Parametros:
- Valor factura (ingresado por usuario).
- Comision por defecto: `5%`.
- Impuesto: `4 x 1000`.

Secuencia:
1. `commissionValue = invoiceValue * (commissionRate / 100)`
2. `valueAfterCommission = invoiceValue - commissionValue`
3. `tax4x1000Value = (valueAfterCommission * taxRate) / 1000`
4. `finalConsignment = valueAfterCommission - tax4x1000Value`
5. Redondeo final de consignacion a `1000`.

## Formulario de solicitud

Estado actual:
- Envio simulado (sin backend real).
- Muestra pantalla de exito al finalizar timeout local.

Campos principales:
- Identificacion, contacto, info laboral y monto solicitado.

## Reglas de copy y legales

- Idioma principal: espanol.
- Footer incluye enlaces legales (actualmente placeholders `#`).
- Textos de advertencia visibles en simulador y formulario.

## No cambiar sin aprobacion

- Tasa mensual base y formulas del simulador.
- Criterios de elegibilidad por plazo.
- Mensajes legales/comerciales sensibles.
