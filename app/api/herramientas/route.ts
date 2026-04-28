import { streamText } from 'ai';
import { gateway } from '@ai-sdk/gateway';

type Herramienta = 'rubrica' | 'planificador' | 'simplificador' | 'detector-sesgos' | 'preguntas';

function buildPrompt(herramienta: Herramienta, datos: Record<string, string>): string {
  switch (herramienta) {
    case 'rubrica':
      return `Eres un experto en evaluación educativa para América Latina. Genera una rúbrica completa y lista para usar en el aula.

DATOS DE LA ACTIVIDAD:
- Materia: ${datos.materia}
- Nivel/Grado: ${datos.nivel}
- Tipo de actividad: ${datos.actividad}
- Criterios importantes (del docente): ${datos.criterios || 'No especificados — usá criterios estándar para esta actividad'}
- Idioma de instrucción: ${datos.idioma || 'Español'}

INSTRUCCIONES:
1. Genera una rúbrica en formato tabla Markdown con estas columnas exactas:
| Criterio | Excelente (4) | Bueno (3) | Regular (2) | Insuficiente (1) |
2. Incluye entre 5 y 7 criterios relevantes y específicos para la actividad.
3. Cada celda debe ser descriptiva y accionable (no solo "muy bien" o "bien").
4. Después de la tabla, agrega:
   - **Puntuación total**: rango, y cómo interpretarlo (ej: 20-17 = Excelente, 16-13 = Bueno...)
   - **Cómo usar esta rúbrica**: 2-3 consejos prácticos para el docente
   - **Sugerencia de feedback**: una frase de retroalimentación modelo para cada nivel

Respondé en español, con tono profesional pero accesible para docentes de nivel primario, secundario o universitario según el nivel indicado.`;

    case 'planificador':
      return `Eres un experto en planificación didáctica y diseño curricular para América Latina. Genera una planificación de clase completa y lista para implementar.

DATOS DE LA CLASE:
- Tema: ${datos.tema}
- Materia/Área: ${datos.materia}
- Nivel/Grado: ${datos.nivel}
- Duración total: ${datos.duracion}
- Modalidad: ${datos.modalidad}
- Objetivos del docente: ${datos.objetivos || 'Desarrollar comprensión y aplicación del tema'}
- Recursos disponibles: ${datos.recursos || 'Pizarrón, cuadernos, dispositivos si están disponibles'}

ESTRUCTURA REQUERIDA (seguí este formato exacto con headers markdown):

## Datos Generales
[tabla con materia, nivel, duración, modalidad, fecha sugerida]

## Objetivos de Aprendizaje
[3-4 objetivos específicos con verbos de acción de la Taxonomía de Bloom]

## Contenidos
[conceptuales, procedimentales y actitudinales]

## Desarrollo de la Clase

### Apertura (${Math.round(parseInt(datos.duracion) * 0.15) || 10} min)
[actividad de inicio, pregunta disparadora o dinámica motivacional]

### Desarrollo (${Math.round(parseInt(datos.duracion) * 0.65) || 35} min)
[actividad principal con explicación, ejemplos y práctica guiada]

### Cierre (${Math.round(parseInt(datos.duracion) * 0.20) || 10} min)
[síntesis, reflexión y evaluación formativa]

## Recursos y Materiales
[lista de todo lo necesario]

## Criterios de Evaluación
[cómo se evaluará el aprendizaje logrado]

## Tarea para Casa (opcional)
[actividad de consolidación si aplica]

## Adaptaciones
[sugerencias para estudiantes con diferentes necesidades]

Respondé en español, con lenguaje profesional y práctico.`;

    case 'simplificador':
      return `Eres un experto en adaptación pedagógica de textos para América Latina. Tu misión es transformar el siguiente texto según el nivel y formato solicitado.

TEXTO ORIGINAL:
${datos.texto}

PARÁMETROS DE ADAPTACIÓN:
- Nivel destinatario: ${datos.nivel}
- Tipo de salida: ${datos.tipo}
- Área/Materia: ${datos.materia || 'General'}

INSTRUCCIONES SEGÚN EL TIPO DE SALIDA:

${datos.tipo === 'resumen' ? `**RESUMEN:**
- Extensión: máximo 150 palabras
- Incluye solo las ideas principales
- Usa vocabulario apropiado para ${datos.nivel}
- Estructura: párrafos cortos y claros
- Al final: "Ideas clave en una oración:" seguido de una síntesis de 1 sola oración` : ''}

${datos.tipo === 'explicacion-simple' ? `**EXPLICACIÓN SIMPLE:**
- Reescribí el texto completo con vocabulario de ${datos.nivel}
- Reemplazá términos técnicos con explicaciones entre paréntesis
- Usá ejemplos cotidianos cercanos a la realidad latinoamericana
- Oraciones cortas (máximo 20 palabras)
- Podés usar analogías o comparaciones simples` : ''}

${datos.tipo === 'preguntas' ? `**PREGUNTAS DE COMPRENSIÓN:**
Generá 8 preguntas variadas organizadas así:
1. **Comprensión literal** (3 preguntas): ¿Qué dice el texto?
2. **Comprensión inferencial** (3 preguntas): ¿Qué significa / por qué?
3. **Comprensión crítica** (2 preguntas): ¿Qué opinás / cómo lo relacionás?

Para cada pregunta indica el tipo y el nivel de dificultad.` : ''}

${datos.tipo === 'mapa-conceptual' ? `**MAPA CONCEPTUAL EN TEXTO:**
Estructura jerárquica con este formato:

**CONCEPTO CENTRAL:** [nombre]
├── **Rama 1:** [concepto]
│   ├── Detalle: [explicación breve]
│   └── Ejemplo: [caso concreto]
├── **Rama 2:** [concepto]
...

Incluye: concepto central, 4-6 ramas principales, y 2-3 detalles por rama.
Al final agrega: "Cómo usar este mapa: [instrucción para el docente]"` : ''}

Respondé en español. Asegurate de que el resultado sea apropiado para ${datos.nivel}.`;

    case 'detector-sesgos':
      return `Eres un experto en educación inclusiva, diversidad y equidad en América Latina. Tu misión es analizar el siguiente material educativo en busca de sesgos y proponer mejoras constructivas.

TEXTO/ACTIVIDAD A ANALIZAR:
${datos.texto}

CONTEXTO:
- Nivel educativo: ${datos.nivel || 'No especificado'}
- Materia/Área: ${datos.materia || 'General'}

REALIZA UN ANÁLISIS PROFUNDO buscando estos tipos de sesgos:

**1. SESGOS DE GÉNERO**
- Lenguaje no inclusivo (uso exclusivo del masculino genérico)
- Roles estereotipados (ej: "el científico", "la enfermera")
- Ejemplos que excluyen perspectivas femeninas, no binarias o diversas

**2. SESGOS CULTURALES**
- Etnocentrismo (presentar una cultura como norma universal)
- Referencias que no resonarían en toda América Latina
- Invisibilización de pueblos originarios o afrodescendientes

**3. SESGOS SOCIOECONÓMICOS**
- Suposiciones sobre acceso a recursos (internet, libros, viajes)
- Ejemplos que asumen un contexto económico específico
- Lenguaje que marginaliza contextos de pobreza

**4. SESGOS COGNITIVOS Y DE CAPACIDAD**
- Suposiciones sobre ritmos de aprendizaje uniformes
- Ausencia de adaptaciones para diversidad funcional
- Lenguaje que etiqueta o categoriza habilidades

FORMATO DE RESPUESTA:

### Resumen del Análisis
[2-3 oraciones sobre el estado general del material]

### Sesgos Encontrados
Para cada sesgo:
> **Fragmento original:** "[texto exacto]"
> **Tipo de sesgo:** [categoría]
> **Por qué es problemático:** [explicación breve]
> **Versión mejorada:** "[texto alternativo inclusivo]"

### Aspectos Positivos
[Lo que el material hace bien en términos de inclusión]

### Recomendaciones Generales
[3-5 sugerencias para mejorar el material en su conjunto]

### Versión Revisada Completa
[El texto/actividad completo con todas las mejoras aplicadas]

Sé constructivo, empático y concreto. El objetivo es ayudar al docente a mejorar, no juzgar.`;

    case 'preguntas':
      return `Eres un experto en pedagogía crítica y Taxonomía de Bloom para educadores de América Latina. Genera un banco de preguntas completo y diverso.

TEMA/TEXTO BASE:
${datos.tema}

PARÁMETROS:
- Nivel educativo: ${datos.nivel}
- Materia/Área: ${datos.materia || 'General'}
- Cantidad de preguntas por nivel: ${datos.cantidad || '2'}
- Tipo de preguntas preferido: ${datos.tipoPregunta || 'Mixto (abiertas y cerradas)'}

GENERA PREGUNTAS PARA LOS 6 NIVELES DE BLOOM:

---

## 1. RECORDAR — Conocimiento y memoria
*Verbos clave: nombrar, listar, definir, identificar, reconocer*
[${datos.cantidad || '2'} preguntas de este nivel]
Para cada pregunta indica:
- La pregunta
- Tipo: [abierta / opción múltiple / verdadero-falso]
- Cómo usarla: [sugerencia de 1 oración]

---

## 2. COMPRENDER — Interpretación y explicación
*Verbos clave: explicar, describir, clasificar, comparar, resumir*
[${datos.cantidad || '2'} preguntas]

---

## 3. APLICAR — Uso en situaciones nuevas
*Verbos clave: usar, resolver, demostrar, calcular, aplicar*
[${datos.cantidad || '2'} preguntas]

---

## 4. ANALIZAR — Descomposición y relaciones
*Verbos clave: diferenciar, organizar, atribuir, examinar, contrastar*
[${datos.cantidad || '2'} preguntas]

---

## 5. EVALUAR — Juicio y valoración crítica
*Verbos clave: juzgar, defender, criticar, valorar, argumentar*
[${datos.cantidad || '2'} preguntas]

---

## 6. CREAR — Síntesis y producción original
*Verbos clave: diseñar, construir, planear, inventar, producir*
[${datos.cantidad || '2'} preguntas]

---

## Sugerencias de Uso en el Aula
[3-4 estrategias para usar este banco de preguntas: debate, evaluación, trabajo grupal, etc.]

## Nota Pedagógica
[Breve reflexión sobre cómo este tema se conecta con los 6 niveles de pensamiento]

Respondé en español. Asegurate de que las preguntas sean apropiadas para ${datos.nivel} y contextualizadas para América Latina cuando sea posible.`;

    default:
      return 'Respondé en español de forma clara y concisa.';
  }
}

export async function POST(req: Request) {
  try {
    const { herramienta, datos } = await req.json() as {
      herramienta: Herramienta;
      datos: Record<string, string>;
    };

    if (!herramienta || !datos) {
      return new Response(
        JSON.stringify({ error: 'Faltan parámetros: herramienta y datos son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const prompt = buildPrompt(herramienta, datos);

    const result = streamText({
      model: gateway('zai/glm-4.7-flash'),
      system: `Eres un asistente educativo de Komuny Edu, creado por Napsix.AI para docentes de América Latina. 
Respondés siempre en español, con tono profesional, cálido y práctico. 
Usás formato Markdown para estructurar tus respuestas (headers ##, tablas, listas).
Nunca usás separadores --- o ___. 
Priorizás ejemplos y contextos relevantes para América Latina.`,
      prompt,
      maxOutputTokens: 4000,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('[Herramientas API error]', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return new Response(
      JSON.stringify({ error: 'Error al generar el contenido', detail: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
