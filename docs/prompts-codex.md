# Prompts sugeridos para Codex

## Prompt base de sesion

```txt
Actua como mi coding partner en este repositorio.
Antes de editar, lee AGENTS.md y README.md y resume en 5 puntos el contexto tecnico y funcional.

Objetivo de esta sesion:
[describe aqui el cambio]

Alcance:
- SI tocar: [archivos o modulos]
- NO tocar: [archivos o modulos]

Criterios de aceptacion:
1) [criterio 1]
2) [criterio 2]
3) Debe compilar con npm run build

Entrega esperada:
- Cambios implementados
- Lista de archivos modificados
- Supuestos/riesgos
- Siguientes pasos opcionales
```

## Prompt para mejoras visuales

```txt
Necesito ajustar UI sin romper estilos existentes.
Trabaja sobre los componentes actuales y preserva el lenguaje visual de marca.
Valida desktop y mobile.
No cambies reglas de negocio del simulador.
```

## Prompt para tareas tecnicas

```txt
Quiero [refactor/pruebas/performance] en este proyecto.
Mantener comportamiento funcional actual.
Si detectas riesgos, listalos primero y propone mitigacion.
Finaliza con verificacion usando npm run build.
```
