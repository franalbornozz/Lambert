# Team Ensemble — Guia de Usuario

## Formacion del Equipo

El Team Ensemble es un equipo freelance de 4 agentes de IA especializados, orquestados bajo OpenCode. Cada agente corre sobre un modelo distinto optimizado para su funcion.

```
                          USUARIO
                             |
                       @architect (PRIMARY)
                      Claude 4.5 Opus · Zen
                       /        |        \
                      /         |         \
              @context    @developer    @guardian
          Gemini 1.5 Flash  DeepSeek V4 Pro  MiniMax M2.5
             (Subagent)      (Subagent)     (Subagent)
```

### Miembros

| # | Agente | Modelo | Proveedor | Color | Funcion |
|---|--------|--------|-----------|-------|---------|
| 1 | `@architect` | Claude 4.5 Opus | Zen | `#7c3aed` | Estratega de Sistemas |
| 2 | `@context` | Gemini 1.5 Flash | Gemini | `#f59e0b` | Gestor de Conocimiento |
| 3 | `@developer` | DeepSeek V4 Pro | Go | `#10b981` | Ingeniero de Implementacion |
| 4 | `@guardian` | MiniMax M2.5 | Free | `#ef4444` | Control de Calidad |

---

## Como Iniciar

```bash
cd C:\MisSkillsIA
opencode
```

El agente por defecto es `@architect`. Escribi tu requerimiento y el equipo se organiza solo. Para cambiar manualmente de agente, usa **Tab**.

---

## Flujo de Trabajo (Inalterable)

Toda tarea sigue este pipeline secuencial. No se puede saltear pasos.

```
FASE 1              FASE 2              FASE 3              FASE 4
@context  --------> @architect --------> @developer --------> @guardian
Descubrimiento      Diseno              Construccion         Blindaje
```

### Fase 1 — Descubrimiento (`@context`)
- Confirma versiones de librerias desde lockfiles (`package.json`, `requirements.txt`, etc.).
- Lee documentacion externa usando `webfetch` con `https://r.jina.ai/` como prefijo (Clean Scraper).
- Busca patrones y convenciones en el codigo existente.
- **Regla de Oro**: No alucina. Si no hay datos, reporta `INSUFICIENTE`.

### Fase 2 — Diseno (`@architect`)
- Define Input / Output / Transformacion de la tarea.
- Selecciona stack, librerias y patrones.
- Delega a `@developer` con especificaciones precisas.
- **Solo el Architect toma decisiones de estructura.**

### Fase 3 — Construccion (`@developer`)
- Implementa codigo siguiendo estandares (Clean Code, DRY, tipado fuerte).
- Modularizacion obligatoria: funciones <= 20 lineas, componentes <= 150 lineas.
- Usa **FORMATO DIFF** (nunca reescribe archivos enteros).
- Si usa una libreria nueva, invoca a `@context` antes.

### Fase 4 — Blindaje (`@guardian`)
- Ejecuta linter automaticamente (`flake8` o `npm run lint`).
- Revisa bugs, seguridad (OWASP Top 10), tipado Python.
- **Poder de veto**: FAIL automatico si falta `try/except` o `try/catch`.
- Emite `PASS` o `FAIL`. Sin PASS, la tarea no se entrega.

---

## Regla de Bloqueo

```
@developer NO confirma tarea sin PASS de @guardian.
Si @guardian emite FAIL -> @developer corrige -> @guardian revisa de nuevo.
Ciclo repetido hasta obtener PASS.
```

---

## Herramientas por Agente

### `@developer`
| Herramienta | Uso |
|-------------|-----|
| `bash` | Scripts Python/Node, `pip install`, `npm install`, `pytest`, servidores |
| `skill: sql-executor` | DESCRIBE de tablas, queries reales, verificacion de constraints |
| `skill: api-client` | curl, requests, payloads de prueba a webhooks y APIs |
| `read / write / edit` | Manipulacion directa de archivos en disco |
| `task: context` | Delegar investigacion de librerias nuevas |

### `@context`
| Herramienta | Uso |
|-------------|-----|
| `webfetch` | Navegar documentacion (con prefijo `r.jina.ai`) |
| `websearch` | Buscar informacion actualizada |
| `read / grep / glob` | Analizar codebase, logs, PDFs |

### `@guardian`
| Herramienta | Uso |
|-------------|-----|
| `read / grep / glob` | Inspeccion de codigo |
| `bash: flake8` | Linter Python |
| `bash: npm run lint` | Linter JS/TS |
| `bash: ruff check` | Linter Python alternativo |

---

## Estandares Globales

| Estandar | Detalle |
|----------|---------|
| **Idioma** | Respuestas, UI y docs en espanol |
| **Python** | Type hints en TODAS las funciones. `mypy` como referencia. Sin `Any` injustificado |
| **Estilos** | Tailwind CSS exclusivamente. Nada de CSS custom |
| **DIFF** | Solo bloques `<<<< BUSQUEDA / ==== / >>>> REEMPLAZO`. Sin archivos enteros |
| **Clean Scraper** | `https://r.jina.ai/` antepuesto a toda URL |
| **Auto-Linter** | Linter ejecutado por guardian antes de aprobar |

---

## Ejemplo de Sesion

```
Usuario: Necesito una API REST de productos con CRUD en FastAPI + PostgreSQL

@context: Verifica versiones de fastapi, sqlalchemy, pydantic instaladas.
          Reporta: fastapi 0.115.0, sqlalchemy 2.0.35, compatibles.

@architect: Define Input/Output. Disena modelo Producto con campos tipados.
            Delega implementacion a @developer.

@developer: Crea modelos SQLAlchemy, schemas Pydantic, endpoints CRUD.
            Usa skill sql-executor para verificar columnas en la DB.
            Entrega usando FORMATO DIFF.

@guardian: Ejecuta flake8. Revisa try/except en operaciones DB.
           Verifica tipado fuerte. Emite PASS.

@architect: Tarea completada. Entrega resumen al usuario.
```
