# ACS Roadmap

---

## Estado actual: Draft v1.0 (2026-03-10)

La especificación técnica está completa. El reto ahora es adopción y herramientas.

---

## Fase 0 — Consolidación (semanas 1-2)

Arreglar lo que está roto antes de cualquier otra cosa.

### Bugs conocidos

- [ ] **Fix CI validator** — `validate.yml` ejecuta `acs_validator.py` sin pasarle el directorio del ejemplo. El script usa `Path.cwd()` (raíz del repo), nunca valida los ejemplos reales. Hay que pasar el path como argumento.
- [ ] **Estabilizar GitHub Pages** — El CNAME fue creado y eliminado varias veces seguidas. Definir el dominio final y dejarlo fijo.

### Mejoras inmediatas

- [ ] Agregar `requirements.txt` al reference-impl Python (`pyyaml`)
- [ ] Agregar `package.json` al reference-impl TypeScript
- [ ] Validar los dos ejemplos existentes (`basic-dev-project`, `fullstack-team`) contra los schemas JSON reales — confirmar que pasan el validator
- [ ] Asegurarse de que el sitio (`docs/index.html`) está publicado y accesible

---

## Fase 1 — Primera adopción (semanas 2-8)

Sin adopters el estándar no existe. Esta fase es la más crítica.

### Dogfooding: usar ACS en proyectos propios

- [ ] Agregar `.agents/` completo al repositorio ACS mismo (auto-referencial, demuestra que funciona)
- [ ] Crear al menos 2 proyectos reales externos que usen ACS y agregarlos a `ADOPTERS.md`
- [ ] Documentar la experiencia real: ¿qué falta? ¿qué duele?

### Outreach a mantenedores de estándares relacionados

- [ ] Contactar mantenedores de **AGENTS.md** (Agentic AI Foundation / Linux Foundation) — proponer interoperabilidad formal
- [ ] Contactar **agentskills.io** — ya somos compatibles con SKILL.md, proponer mención mutua
- [ ] Abrir issue o propuesta formal en los repositorios de: Claude Code, Cursor, Windsurf, GitHub Copilot, Gemini CLI, OpenAI Codex, Kiro, JetBrains Junie, Trae, Zed, Roo Code, Codo, Antigravity, Firebase Studio

### Contenido de visibilidad

- [ ] Publicar post técnico explicando ACS vs AGENTS.md vs SKILL.md (dev.to / Medium / blog propio)
- [ ] Thread en X/Twitter mostrando cómo se ve un proyecto con `.agents/` completo
- [ ] Submittir a Hacker News (Show HN: ACS — A standard `.agents/` folder any AI tool can read)

---

## Fase 2 — CLI `acs` (meses 2-4)

El CLI es el punto de inflexión. Es lo que convierte una spec en una herramienta usable. Sin `acs init`, la fricción de adopción es demasiado alta.

### Comandos a implementar (en orden de prioridad)

```
acs init        # Scaffolding interactivo de .agents/ en el proyecto actual
acs validate    # Valida todos los archivos ACS contra los schemas
acs ls          # Lista layers activos, skills, commands, agents
acs compile     # Genera CLAUDE.md, .cursorrules, .windsurfrules, GEMINI.md, etc. desde .agents/
```

### Plan técnico

- [ ] Definir el CLI en un repositorio separado: `acs-cli`
- [ ] Implementar `acs init` primero — wizard que pregunta nombre, descripción, qué layers activar
- [ ] Implementar `acs validate` reutilizando el validator del reference-impl
- [ ] Publicar en **npm** (`@acs/cli`) y **pip** (`acs-cli`)
- [ ] Agregar instalación en el README principal: `npx @acs/cli init`

### `acs compile` — el comando killer

El compilador es lo que hace ACS irreversible para los que lo adoptan:
- Lee `.agents/` y genera los archivos específicos de cada tool
- Equipos que usan cualquier combinación de tools no duplican trabajo nunca más
- Targets: `CLAUDE.md`, `.cursorrules`, `.windsurfrules`, `GEMINI.md`, `CODEX.md`, `.junie/guidelines.md`, `.kiro/`, `.trae/rules/`, `.github/copilot-instructions.md`, `AGENTS.md`

---

## Fase 3 — Integraciones con herramientas (meses 3-6)

Una vez que el CLI existe, atacar las integraciones de alto impacto.

### Prioridad 1: Claude Code (mayor afinidad)

- [ ] Proponer integración nativa: Claude Code lee `.agents/acs.yaml` si existe
- [ ] Publicar guía detallada de cómo usar ACS con Claude Code hoy (sin integración nativa)
- [ ] `acs compile --target claude-code` genera `.claude/` y `CLAUDE.md`

### Prioridad 2: GitHub Actions

- [ ] Publicar Action oficial: `acs-org/validate-action`
- [ ] `uses: acs-org/validate-action@v1` — valida el proyecto en cada PR
- [ ] Esto da visibilidad orgánica en proyectos de otros

### Prioridad 3: VS Code Extension

- [ ] Extensión con IntelliSense para `acs.yaml` y SKILL.md
- [ ] Diagnósticos en tiempo real (campo faltante, formato inválido)
- [ ] Snippet pack para crear skills y commands rápido

### Prioridad 4: Guías de compatibilidad por tool

Un documento `compatibility/` por cada herramienta popular:

| Tool | Target file | Status |
|---|---|---|
| Cursor | `.cursorrules` | `acs compile --target cursor` |
| Windsurf | `.windsurfrules` | `acs compile --target windsurf` |
| GitHub Copilot | `.github/copilot-instructions.md` | `acs compile --target copilot` |
| Gemini CLI | `GEMINI.md` | `acs compile --target gemini-cli` |
| OpenAI Codex | `CODEX.md` | `acs compile --target codex` |
| JetBrains Junie | `.junie/guidelines.md` | `acs compile --target junie` |
| Kiro | `.kiro/` | `acs compile --target kiro` |
| Trae | `.trae/rules/` | `acs compile --target trae` |
| Zed | `.zed/settings.json` rules | `acs compile --target zed` |
| Roo Code | `.roo/` | `acs compile --target roo-code` |
| Codo | TBD | `acs compile --target codo` |
| Antigravity | TBD | `acs compile --target antigravity` |
| Firebase Studio | TBD | `acs compile --target firebase-studio` |

- [ ] Crear guía de compatibilidad para cada tool (en `compatibility/`)
- [ ] Abrir issues en cada repositorio proponiendo soporte nativo

---

## Fase 4 — v1.0 estable (mes 4-5)

Antes de declarar v1.0 estable se necesita:

- [ ] Al menos **3 herramientas** con soporte documentado
- [ ] Al menos **10 proyectos** en `ADOPTERS.md`
- [ ] Período de comentarios públicos de 30 días sobre la spec
- [ ] Resolución de todos los issues abiertos de tipo `spec-change`
- [ ] Tag `v1.0.0` en el repositorio

---

## Fase 5 — v2.0: Nuevas capas (meses 5-10)

Con adopción real, expandir la spec con las capas planificadas.

### Workflows layer

Procesos multi-paso deterministas. Ejemplo real: review de PR en pasos definidos.

```
.agents/workflows/
└── review-pr.md   # trigger: on_pr / steps: read-diff → check → write-review
```

- [ ] Diseñar el formato de frontmatter de workflows
- [ ] Especificar semántica de `steps` y `trigger`
- [ ] Actualizar behavior spec con W1–W4 behaviors requeridos

### Hooks layer

Triggers de ciclo de vida del agente.

```
.agents/hooks/
├── pre-edit.md    # antes de modificar archivos
└── post-commit.md # después de hacer commit
```

- [ ] Definir eventos disponibles (pre-edit, post-edit, pre-commit, session-start, session-end)
- [ ] Especificar cómo los hooks reciben contexto del evento

### Profiles layer

Sets de capacidades nombrados que combinan permisos + skills.

```
.agents/profiles/
├── developer.md   # acceso total
├── reviewer.md    # solo lectura + skills de review
└── junior.md      # acceso restringido + contexto extra de onboarding
```

### Toolsets layer (MCP)

Declaración de qué MCP servers espera el proyecto.

```
.agents/tools/
└── toolset.yaml   # declara servidores MCP requeridos/opcionales
```

---

## Fase 6 — Ecosistema y gobernanza (mes 8 en adelante)

### Registry de skills

- [ ] Crear `registry.acs-standard.org` (o similar) — directorio público de skills compartibles
- [ ] Formato: cualquiera puede publicar un skill que otros proyectos pueden importar
- [ ] `acs add <skill-name>` descarga e instala el skill en `.agents/skills/`

### Transferencia de gobernanza

- [ ] Mover el proyecto a una organización GitHub neutral (`acs-standard` o similar)
- [ ] Incorporar al menos 3 co-mantenedores de organizaciones distintas
- [ ] Proponer afiliación con Agentic AI Foundation / Linux Foundation (como hizo AGENTS.md)

### Programa de certificación

- [ ] Definir los niveles formales de compatibilidad:
  - **ACS Basic** — implementa B1, B2, B4 (discovery + manifest + context)
  - **ACS Standard** — implementa B1–B6 (todo v1.0)
  - **ACS Extended** — Standard + soporte v2.0 layers
- [ ] Publicar badge y proceso de auto-declaración

---

## Resumen de hitos

| Hito | Target | Criterio |
|---|---|---|
| Fase 0 completa | semana 2 | CI pasa, sitio accesible, ejemplos válidos |
| Primer adopter externo | semana 6 | al menos 1 proyecto en ADOPTERS.md |
| `acs init` publicado | mes 3 | disponible en npm + pip |
| `acs compile` publicado | mes 4 | genera CLAUDE.md y .cursorrules |
| v1.0 stable | mes 5 | 3 tools + 10 proyectos + 30 días de comentarios |
| GitHub Action publicada | mes 4 | disponible en marketplace |
| v2.0 spec completa | mes 9 | workflows + hooks + profiles + toolsets |
| Registry público | mes 10 | al menos 20 skills publicados |
| Gobernanza neutral | mes 12 | org multistakeholder activa |
