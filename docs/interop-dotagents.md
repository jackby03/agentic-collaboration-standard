# Interoperabilidad: ACS ↔ `.agents` / dot-agents

## Resumen

Este documento describe una linea de interoperabilidad entre ACS y una estructura `.agents/` basada en frontmatter, inspirada por propuestas del ecosistema como `dot-agents` y `dotagentsprotocol`.

La meta no es competir con otros formatos ni forzar convergencia artificial. La meta es permitir compatibilidad real, migracion gradual y adopcion deliberada de ideas buenas, aunque nazcan fuera de ACS.

## Posicion de ACS

ACS quiere ser un punto de convergencia:

- compatible con iniciativas existentes cuando eso reduzca friccion;
- abierto a incorporar propuestas externas cuando mejoren la experiencia de desarrollo, la interoperabilidad o la claridad del estandar;
- cuidadoso al normalizar nuevas ideas, con validacion, pruebas y gobernanza antes de convertirlas en comportamiento normativo.

En otras palabras: compatibilidad cuando aporta continuidad; adopcion cuando aporta una solucion mejor.

## Aclaracion importante sobre ACS v1

ACS v1 hoy define una estructura canonica basada en `.agents/main.yaml` y capas como `context/`, `skills/`, `agents/` y `permissions/`.

La estructura descrita en este documento no reemplaza automaticamente esa definicion. Por ahora debe leerse como:

1. una propuesta de interoperabilidad;
2. un experimento de modelado;
3. una posible fuente de insumos para una futura extension o revision del estandar.

## Principios

- No competir por formato: buscar convergencia y compatibilidad.
- Mantener portabilidad: evitar atar configuracion critica a un solo proveedor o runtime.
- Adoptar buenas ideas del ecosistema cuando esten mejor resueltas que el estado actual.
- Priorizar validacion y seguridad desde el principio.
- Diseñar para migracion incremental, no para reescrituras bruscas.

## Mapeo de conceptos

| Estructura propuesta | Concepto ACS relacionado | Estado |
|---|---|---|
| `.agents/mcp.json` | `main.yaml` / manifest ACS | Prototipo de manifest JSON para interop |
| `.agents/agents/*/agent.md` | Definiciones de agentes | Mapeo directo de frontmatter + cuerpo Markdown |
| `.agents/skills/*/skill.md` | Skills ACS | Cercano al modelo actual; cambia la convencion del archivo |
| `.agents/tasks/*/task.md` | Posible futura capa de tareas | No normativo en ACS v1 |
| `.agents/memories/*.md` | Posible futura capa de memoria | No normativo en ACS v1; requiere politica de privacidad |

## Mapeo rapido de archivos

- `.agents/agents/*/agent.md` ↔ `schemas/v1/agent.schema.json`
- `.agents/mcp.json` ↔ `schemas/v1/manifest.schema.json` con reglas adicionales de interoperabilidad
- `.agents/skills/*/skill.md` ↔ `schemas/v1/skill.schema.json`
- `.agents/tasks/*/task.md` ↔ futuro `schemas/v1/task.schema.json`
- `.agents/memories/*.md` ↔ futuro `schemas/v1/memory.schema.json`

## Mejoras que vale la pena tomar del ecosistema

Estas son las areas donde ACS puede beneficiarse de propuestas externas:

- Artefactos mas granulares: un archivo por agente, skill, task o memory mejora inspeccion, reuso y tooling.
- Frontmatter como capa de metadatos portable: permite validacion sin perder expresividad en Markdown.
- Tareas y memorias como objetos de primer nivel: hacen visible lo que hoy muchos equipos modelan de forma informal.
- Experiencias de inicializacion y linking mas ergonomicas: utiles para CLI y adopcion en equipos grandes.

ACS no deberia copiar estos patrones de manera automatica. Deberia evaluarlos y adoptarlos donde resuelvan un problema real mejor que la solucion vigente.

## Semantica de merge a especificar

Si ACS incorpora o formaliza esta estructura, hace falta definir merge semantics explicitamente:

- precedencia entre workspace, monorepo, carpeta actual y configuracion global del usuario;
- resolucion de IDs duplicados para agents, skills, tasks y memories;
- borrados intencionales u overrides negativos;
- herencia parcial frente a reemplazo completo;
- comportamiento cuando coexisten `main.yaml` y manifests alternativos como `mcp.json`.

Esta semantica deberia documentarse antes de considerar el modelo como parte estable del estandar.

## Seguridad y privacidad

Las memorias merecen tratamiento especial:

- opt-in por defecto;
- metadatos de sensibilidad;
- reglas claras de exportacion o enmascarado;
- capacidad de exclusión en tooling y bundles;
- validacion automatica basica para evitar exposicion accidental.

La interoperabilidad no debe abrir una via para normalizar almacenamiento persistente sin controles.

## Bundles y distribucion

Tambien es razonable explorar un formato de bundle versionado, por ejemplo `.dotagents`, con:

- manifest interno;
- integridad verificable;
- firma recomendada;
- soporte para compartir skills, agentes y configuraciones entre proyectos.

Esto se alinea bien con el interes de ACS en portabilidad, pero requiere schema, tooling y politica de confianza.

## Artefactos iniciales en este repo

- [examples/dotagents-example](../examples/dotagents-example/) muestra una estructura `.agents/` frontmatter-first mapeada conceptualmente a ACS.
- Ese ejemplo incluye `mcp.json`, un agente, una skill, una task y una memory para hacer visible el espacio de diseño completo.

## Plan de trabajo sugerido

1. Aterrizar un ejemplo de interoperabilidad legible y autocontenido.
2. Definir schemas prototipo para `task`, `memory` y `bundle`, y extender validacion para frontmatter.
3. Probar merge semantics y reglas de precedencia con tests de integracion.
4. Documentar migracion desde formatos adyacentes y flujo local de validacion.
5. Preparar una propuesta AAIF que explique compatibilidad, adopcion selectiva y gobernanza.

## Criterio de adopcion

Una propuesta externa deberia entrar en ACS cuando cumpla la mayor parte de estos criterios:

- mejora claridad o ergonomia sin comprometer portabilidad;
- puede validarse de forma mecanica;
- no rompe la base conceptual de ACS;
- tiene una historia de migracion razonable;
- aporta interoperabilidad con herramientas o comunidades reales.

## Estado actual

- Documento de interoperabilidad ampliado.
- Ejemplo de referencia agregado en `examples/dotagents-example/`.
- Proximo bloque recomendado: validacion minima, schemas nuevos y pruebas.
