# Memoria del Proyecto — Komuny Edu
**Proyecto:** Komuny Web — komuny.org
**CTO:** German Gimenez — Napsix.AI

---

## Arquitectura de Repos — LEER SIEMPRE

Este proyecto vive en **DOS repositorios separados** que deben mantenerse sincronizados en cada actualizacion.

| Repo | Tipo | Contenido | Path local |
|------|------|-----------|------------|
| `german-gimenez/komuny-web` | Privado (app) | Codigo Next.js, componentes, API | `C:\dev_projects\Komuny\komuny-web` |
| `german-gimenez/komuny` | Publico (contenido) | Skills, guias, templates, glosario, README | `C:\dev_projects\Komuny\komuny` |

**Regla de oro:** Cada vez que se agrega una feature al web, el repo publico debe recibir el contenido equivalente (skill, guia, template o actualizacion de README).

---

## Workflow de Actualizacion — Seguir SIEMPRE este orden

### 1. Desarrollar en `komuny-web`
```
git checkout clean-main   # o crear feature branch
# ... desarrollar ...
npm run build             # verificar que compila sin errores
git add .
git commit -m "feat/fix/chore: descripcion"
git push origin clean-main
```

### 2. Merge a main y deploy
```
git checkout main
git reset --hard origin/main   # sincronizar con remoto si es necesario
git merge clean-main --no-ff -m "merge: descripcion"
git push origin main
vercel deploy --prod           # desde C:\dev_projects\Komuny\komuny-web
```

### 3. Actualizar repo publico `komuny`
```
# En C:\dev_projects\Komuny\komuny
git pull origin main           # traer cambios remotos primero

# Segun lo que se agrego al web, crear el equivalente en contenido:
# - Nueva herramienta IA   → nuevo skill en skills/ + guia en guides/ + templates en templates/
# - Nueva seccion/pagina   → actualizar README.md con el link
# - Nuevo recurso          → agregar en recursos/herramientas-gratuitas.md
# - Cambio en glosario web → reflejar en glosario/glosario-ia-docentes.md

git add .
git commit -m "feat: descripcion del contenido nuevo"
git push origin main
```

---

## Correspondencia Web → Contenido Publico

| Feature en `komuny-web` | Equivalente en `komuny` |
|------------------------|------------------------|
| Nueva herramienta IA en `/herramientas/*` | `skills/skill-0X-nombre.md` + `guides/0X-nombre.md` + templates en `templates/templates-herramientas-ia.md` |
| Nuevo termino en glosario web | Termino nuevo en `glosario/glosario-ia-docentes.md` |
| Nueva pagina o seccion principal | Entrada en tabla de `README.md` |
| Nueva ruta de recursos | Link en `recursos/herramientas-gratuitas.md` |
| Nuevo skill para KomIA | Documentarlo en `skills/` |

---

## Estructura del Proyecto Web (`komuny-web`)

```
app/
├── page.tsx                    ← Home (glosario + hero + recursos)
├── layout.tsx                  ← Root layout, fonts, metadata
├── globals.css                 ← CSS variables y estilos base
├── fundacion/page.tsx          ← Pagina institucional Fundacion
├── herramientas/
│   ├── page.tsx                ← Hub de herramientas (5 cards)
│   ├── rubrica/page.tsx        ← Generador de Rubrica
│   ├── planificador/page.tsx   ← Planificador de Clases
│   ├── simplificador/page.tsx  ← Simplificador de Textos
│   ├── detector-sesgos/page.tsx← Detector de Sesgos
│   └── preguntas/page.tsx      ← Banco de Preguntas Bloom
├── api/
│   ├── chat/route.ts           ← API para KomIA chatbot
│   └── herramientas/route.ts   ← API compartida para las 5 herramientas
├── components/
│   ├── KomIA.tsx               ← Chatbot flotante (drawer lateral)
│   ├── ToolLayout.tsx          ← Layout compartido para /herramientas/*
│   ├── Globe3D.tsx             ← Globo 3D con markers LATAM
│   └── TextFlip.tsx            ← Animacion de palabras en hero
└── data/
    └── glossary.ts             ← Terminos del glosario (estatico)
```

---

## Estructura del Repo Publico (`komuny`)

```
komuny/
├── README.md                   ← Indice principal del repo
├── CONTRIBUTING.md             ← Como contribuir
├── glosario/
│   └── glosario-ia-docentes.md ← 30+ terminos de IA para docentes
├── skills/
│   ├── skill-01-planificador-clases.md
│   ├── skill-02-evaluador-rubricas.md
│   ├── skill-03-comunicador-familias.md
│   ├── skill-04-adaptador-contenidos.md
│   ├── skill-05-tutor-socratico.md
│   ├── skill-06-simplificador-textos.md
│   └── skill-07-detector-sesgos.md
├── guides/
│   ├── 01-primera-clase-con-ia.md
│   ├── 02-evaluar-con-ia.md
│   ├── 03-comunicacion-con-familias.md
│   ├── 04-adaptar-para-diversidad.md
│   ├── 05-proyectos-interdisciplinarios.md
│   └── 06-herramientas-ia-komuny.md
├── templates/
│   ├── prompts-para-docentes.md
│   └── templates-herramientas-ia.md
├── recursos/
│   └── herramientas-gratuitas.md
├── fundacion/
│   ├── README.md
│   └── reconocimientos.md
└── examples/                   ← En construccion
```

---

## Stack Tecnico

| Capa | Tecnologia |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + Framer Motion + Tailwind CSS |
| 3D | Three.js + React Three Fiber |
| AI SDK | Vercel AI SDK v6 (`ai`, `@ai-sdk/react`) |
| Modelo IA | `zai/glm-4.7-flash` via `@ai-sdk/gateway` |
| Deploy | Vercel (proyecto: `napsixai/komuny-web`) |
| Dominio | komuny.org |

---

## Estilo Visual

```css
--bg:           #F5F0E8   /* crema calido, fondo principal */
--bg-warm:      #EDE8DC   /* crema oscuro, cards y secciones */
--ink:          #1A1208   /* casi negro calido, texto primario */
--ink-muted:    #5C5040   /* marron medio, texto secundario */
--accent:       #D4622A   /* naranja terracota — COLOR DE MARCA */
--accent-light: #F2936A   /* naranja claro */
--accent-pale:  #FBE9DF   /* naranja palido, fondos de badge */
--green:        #3A6B4A   /* verde bosque */
--border:       #D8D0C0   /* beige calido */
```

Tipografias: **Fraunces** (titulos serif) + **DM Sans** (cuerpo sans-serif)
Animaciones: Framer Motion con `whileInView` + `opacity/y` fade-up

---

## Branches

| Branch | Uso |
|--------|-----|
| `main` | Produccion — conectado a Vercel deploy |
| `clean-main` | Desarrollo principal — hacer PR/merge a main |

Siempre desarrollar en `clean-main` o branches `feature/*`, nunca directamente en `main`.

---

## Herramientas IA Disponibles

| Herramienta | URL | Color | API param |
|-------------|-----|-------|-----------|
| Generador de Rubrica | `/herramientas/rubrica` | `#D4622A` | `rubrica` |
| Planificador de Clases | `/herramientas/planificador` | `#1A5C9A` | `planificador` |
| Simplificador de Textos | `/herramientas/simplificador` | `#3A6B4A` | `simplificador` |
| Detector de Sesgos | `/herramientas/detector-sesgos` | `#8B2FC9` | `detector-sesgos` |
| Banco de Preguntas | `/herramientas/preguntas` | `#C9A227` | `preguntas` |

Para agregar una nueva herramienta:
1. Crear `app/herramientas/nombre/page.tsx` usando el patron de las existentes
2. Agregar el case en `app/api/herramientas/route.ts` → funcion `buildPrompt()`
3. Agregar la card en `app/herramientas/page.tsx` → array `tools`
4. Agregar entrada en nav/features de `app/page.tsx`
5. Crear `skills/skill-0X-nombre.md` en repo publico
6. Agregar templates en `templates/templates-herramientas-ia.md`
7. Actualizar `guides/06-herramientas-ia-komuny.md`
8. Actualizar `README.md` del repo publico

---

## Comandos Frecuentes

```bash
# Desarrollo local
npm run dev                    # http://localhost:3000

# Build y verificacion
npm run build                  # verifica tipos y compila

# Deploy a produccion
git checkout main
git merge clean-main --no-ff
git push origin main
vercel deploy --prod           # desde komuny-web/

# Paths locales
C:\dev_projects\Komuny\komuny-web    # app Next.js
C:\dev_projects\Komuny\komuny        # contenido publico
```

---

## Credenciales y Servicios

- **Vercel proyecto:** `napsixai/komuny-web`
- **GitHub repos:** `german-gimenez/komuny-web` (privado) + `german-gimenez/komuny` (publico)
- **Dominio:** komuny.org → apunta a Vercel
- **AI Gateway:** `zai/glm-4.7-flash` via `@ai-sdk/gateway`
- Todas las credenciales en variables de entorno de Windows (ver CLAUDE.md global)

---

## Progreso — Sesion PWA (Abril 2026)

- [x] 5 herramientas IA para docentes completadas y deployadas
- [x] API endpoint compartido `/api/herramientas`
- [x] ToolLayout componente compartido
- [x] Nav y features section actualizados en home
- [x] Repo publico actualizado (skills 06-07, guide 06, templates)
- [x] Merge clean-main → main → Vercel deploy
- [x] **PWA completa implementada y deployada**
  - next-pwa v5.6 con Workbox service worker
  - manifest.json con shortcuts a herramientas principales
  - 12 iconos PNG (72–512px) + 2 maskable para Android
  - apple-touch-icon 180x180 + favicons 16/32px para iOS Safari
  - Pagina offline `/offline` con deteccion de reconexion automatica
  - Cache strategies: NetworkFirst (pages), CacheFirst (fonts/images), StaleWhileRevalidate (JS/CSS), NetworkOnly (APIs IA)
  - meta tags completos: viewport, metadataBase, apple-mobile-web-app-capable, theme-color dual, MS Tiles
  - Deploy: https://komuny-web.vercel.app
- [ ] Pendiente: configurar dominio custom komuny.org en Vercel si no esta apuntando

---

*Komuny Edu — Napsix.AI — German Gimenez*
