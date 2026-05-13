import {
  streamText,
  tool,
  jsonSchema,
  convertToModelMessages,
  stepCountIs,
  type UIMessage,
} from 'ai';
import { bedrock } from '@ai-sdk/amazon-bedrock';
import { glossaryTerms } from '../../data/glossary';
import {
  DEFAULT_CHAT_MODEL,
  resolveModelId,
} from '../../../lib/bedrock-models';

// Edge runtime no es compatible con AWS Signature v4 nativa del SDK.
// Forzamos Node.js runtime para que `@ai-sdk/amazon-bedrock` funcione.
export const runtime = 'nodejs';
export const maxDuration = 60;

// ──────────────────────────────────────────────────────────────────
// CATÁLOGOS — referencias estáticas para las tools del modelo
// ──────────────────────────────────────────────────────────────────

const RESOURCES = [
  {
    title: 'Glosario de IA',
    desc: 'Más de 29 términos de IA explicados para educadores',
    href: 'https://komuny.org/#glosario',
  },
  {
    title: 'Herramientas gratuitas',
    desc: 'Canva, Khanmigo, NotebookLM, Perplexity y más',
    href: 'https://github.com/german-gimenez/komuny/blob/main/recursos/herramientas-gratuitas.md',
  },
  {
    title: 'Skills para Claude',
    desc: 'Configuraciones especializadas listas para el aula',
    href: 'https://github.com/german-gimenez/komuny/tree/main/skills',
  },
  {
    title: 'Templates de Prompts',
    desc: 'Tickets listos para planear clases y evaluar',
    href: 'https://github.com/german-gimenez/komuny/tree/main/templates',
  },
  {
    title: 'Guías paso a paso',
    desc: 'Tutoriales de IA para el aula, de principiante a avanzado',
    href: 'https://github.com/german-gimenez/komuny/tree/main/guides',
  },
];

const HERRAMIENTAS = [
  {
    nombre: 'Generador de Rúbrica',
    slug: 'rubrica',
    url: 'https://komuny.org/herramientas/rubrica',
    descripcion:
      'Genera una rúbrica completa de evaluación en formato tabla con 5-7 criterios y 4 niveles. Ideal para ensayos, proyectos, exposiciones, evaluaciones de proceso.',
    inputs: 'materia, nivel, tipo de actividad, criterios deseados',
  },
  {
    nombre: 'Planificador de Clases',
    slug: 'planificador',
    url: 'https://komuny.org/herramientas/planificador',
    descripcion:
      'Crea una planificación completa: objetivos Bloom, apertura, desarrollo, cierre, recursos, criterios de evaluación y adaptaciones.',
    inputs: 'tema, materia, nivel, duración, modalidad',
  },
  {
    nombre: 'Simplificador de Textos',
    slug: 'simplificador',
    url: 'https://komuny.org/herramientas/simplificador',
    descripcion:
      'Adapta cualquier texto al nivel de tus estudiantes. Outputs: resumen, explicación simple, preguntas de comprensión, o mapa conceptual.',
    inputs: 'texto, nivel destinatario, tipo de salida',
  },
  {
    nombre: 'Detector de Sesgos',
    slug: 'detector-sesgos',
    url: 'https://komuny.org/herramientas/detector-sesgos',
    descripcion:
      'Analiza materiales educativos en busca de sesgos de género, culturales, socioeconómicos y de capacidad. Devuelve versión revisada inclusiva.',
    inputs: 'texto o actividad a analizar',
  },
  {
    nombre: 'Banco de Preguntas Bloom',
    slug: 'preguntas',
    url: 'https://komuny.org/herramientas/preguntas',
    descripcion:
      'Genera preguntas para los 6 niveles de la Taxonomía de Bloom (Recordar, Comprender, Aplicar, Analizar, Evaluar, Crear).',
    inputs: 'tema, nivel, cantidad por nivel, tipo de pregunta',
  },
];

const FUNDACION_INFO = {
  nombre: 'Fundación Napsix AI',
  resumen:
    'Persona jurídica sin fines de lucro registrada en AFIP Argentina, declarada de Interés Legislativo por la Cámara de Senadores de Mendoza (2022). Trabaja en alfabetización en IA para docentes de LATAM.',
  cuit: '30-71735388-5',
  tipo: 'Asociación civil sin fines de lucro · IVA Exento',
  actividad: 'AFIP 854990 — Servicios de Enseñanza N.C.P.',
  inscripta: 'Noviembre 2021',
  legislativo:
    'Declaración de Interés Legislativo · Cámara de Senadores de Mendoza · Septiembre 2022',
  ofrece: [
    'Capacitación gratuita en IA para docentes',
    'Recursos open source (glosario, skills, templates, guías) en español',
    'Convenios con instituciones educativas',
    'Materiales para equipos pedagógicos de fundaciones',
    'Asesoría en alfabetización digital con IA',
  ],
  contacto: {
    web: 'https://komuny.org/fundacion',
    repoPublico: 'https://github.com/german-gimenez/komuny',
  },
};

// ──────────────────────────────────────────────────────────────────
// SYSTEM PROMPT
// ──────────────────────────────────────────────────────────────────

const glossaryContext = glossaryTerms
  .map(t => `- ${t.term} (${t.tag ?? 'general'}): ${t.definition}`)
  .join('\n');

const resourcesContext = RESOURCES.map(
  r => `- ${r.title}: ${r.desc} → ${r.href}`,
).join('\n');

const herramientasContext = HERRAMIENTAS.map(
  h => `- ${h.nombre} (${h.url}): ${h.descripcion}`,
).join('\n');

const SYSTEM_PROMPT = `Eres KomIA, el asistente de Komuny Edu, creado por Napsix.AI.
Tu misión principal es ayudar a docentes y a equipos de fundaciones educativas latinoamericanas a integrar IA en sus clases, pero también podés responder cualquier pregunta que el usuario tenga — sobre educación, pedagogía, planificación de clases, herramientas, tecnología, o cualquier tema en el que puedas ser útil.

CÓMO RESPONDER:
- Siempre en español rioplatense neutro (uso de "vos" está bien). Concisa, cálida y práctica.
- Usá un tono amigable y cercano. Podés usar emojis para organizar secciones: 🎯 💡 📚 ✅ 🚀 👀
- Priorizá respuestas accionables: qué puede hacer el docente HOY.
- Si no sabés algo con certeza, decilo honestamente.
- Para preguntas de IA en educación, usá los recursos de Komuny Edu.
- Para cualquier otra pregunta, respondé directamente con tu conocimiento.

FORMATO OBLIGATORIO — seguí estas reglas siempre:
- PROHIBIDO usar ## o ### para títulos. En su lugar usá un emoji + negrita: **🎯 Título de sección**
- Para listas usá guiones (-) o numeración (1. 2. 3.)
- Para ejemplos de prompts o código, SIEMPRE usá bloques con triple backtick:
\`\`\`
Ejemplo de prompt aquí
\`\`\`
- Los links deben tener formato markdown: [texto del link](https://url.com)
- Mantené las respuestas concisas — mejor cortas y accionables que largas y densas.
- No uses separadores --- ni ___

HERRAMIENTAS IA DISPONIBLES EN KOMUNY EDU (5 herramientas gratuitas):
${herramientasContext}

RECURSOS DOCUMENTALES:
${resourcesContext}

GLOSARIO DE IA PARA DOCENTES (usalo como referencia):
${glossaryContext}

FUNCIONES QUE PODÉS LLAMAR:
- Si el usuario pregunta por un término de IA → usá buscar_termino
- Si pide recursos, materiales, documentación o links → usá listar_recursos
- Si pregunta por las herramientas IA, o necesita generar contenido (rúbrica, plan, simplificar texto, detectar sesgos, banco de preguntas) → usá listar_herramientas
- Si pregunta por la Fundación, convenios, registro legal, declaración de interés, oferta institucional, contacto → usá info_fundacion
- Para todo lo demás → respondé directamente`;

// ──────────────────────────────────────────────────────────────────
// HANDLER
// ──────────────────────────────────────────────────────────────────

interface ChatBody {
  messages: UIMessage[];
  /** modelId opcional enviado por la UI (selector de modelo). */
  modelId?: string;
}

export async function POST(req: Request) {
  let body: ChatBody;
  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return jsonError(400, 'invalid_json', 'El cuerpo de la petición no es JSON válido.');
  }

  const { messages, modelId } = body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return jsonError(400, 'missing_messages', 'Faltan mensajes en la petición.');
  }

  const resolvedModel = resolveModelId(modelId, DEFAULT_CHAT_MODEL);

  try {
    const result = streamText({
      model: bedrock(resolvedModel),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      stopWhen: stepCountIs(3),
      tools: {
        buscar_termino: tool({
          description:
            'Busca y devuelve definiciones de términos de IA del glosario de Komuny Edu',
          inputSchema: jsonSchema<{ query: string }>({
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'El término o concepto de IA a buscar',
              },
            },
            required: ['query'],
          }),
          execute: async ({ query }) => {
            const q = String(query).toLowerCase();
            const results = glossaryTerms
              .filter(
                t =>
                  t.term.toLowerCase().includes(q) ||
                  t.definition.toLowerCase().includes(q) ||
                  (t.tip ?? '').toLowerCase().includes(q),
              )
              .slice(0, 3)
              .map(t => ({
                term: t.term,
                definition: t.definition,
                example: t.example,
                tip: t.tip,
                tag: t.tag,
              }));
            return results.length > 0
              ? results
              : [
                  {
                    term: 'Sin resultados',
                    definition: `No encontré "${query}" en el glosario. Podés proponer el término en github.com/german-gimenez/komuny`,
                    tag: null,
                  },
                ];
          },
        }),

        listar_recursos: tool({
          description:
            'Lista todos los recursos documentales disponibles en Komuny Edu (glosario, skills, templates, guías, herramientas gratuitas externas) con sus links',
          inputSchema: jsonSchema<Record<string, never>>({
            type: 'object',
            properties: {},
          }),
          execute: async () => RESOURCES,
        }),

        listar_herramientas: tool({
          description:
            'Lista las 5 herramientas IA gratuitas de Komuny Edu (generador de rúbrica, planificador de clases, simplificador de textos, detector de sesgos, banco de preguntas Bloom). Devuelve nombre, URL, descripción e inputs requeridos para cada una.',
          inputSchema: jsonSchema<Record<string, never>>({
            type: 'object',
            properties: {},
          }),
          execute: async () => HERRAMIENTAS,
        }),

        info_fundacion: tool({
          description:
            'Información institucional sobre la Fundación Napsix AI / Komuny: registro legal, CUIT, declaración de interés legislativo, oferta para fundaciones y equipos educativos, contacto.',
          inputSchema: jsonSchema<Record<string, never>>({
            type: 'object',
            properties: {},
          }),
          execute: async () => FUNDACION_INFO,
        }),
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    return logAndRespond(error, resolvedModel);
  }
}

// ──────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────

function jsonError(status: number, code: string, detail: string) {
  return new Response(JSON.stringify({ error: code, detail }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function logAndRespond(error: unknown, modelId: string) {
  const err = error as { name?: string; message?: string; statusCode?: number };
  const name = err?.name ?? 'UnknownError';
  const message = err?.message ?? 'Error desconocido';

  console.error('[KomIA API error]', {
    modelId,
    name,
    message,
    statusCode: err?.statusCode,
  });

  // Mapear errores de AWS Bedrock a códigos HTTP útiles
  if (name === 'AccessDeniedException' || /access denied/i.test(message)) {
    return jsonError(
      403,
      'bedrock_access_denied',
      'Permiso denegado para invocar el modelo en Bedrock. Verifica los permisos IAM o el acceso al modelo.',
    );
  }
  if (name === 'ThrottlingException' || /throttl/i.test(message)) {
    return jsonError(
      429,
      'bedrock_throttling',
      'Demasiadas peticiones a Bedrock. Reintenta en unos segundos.',
    );
  }
  if (name === 'ValidationException' || /validation/i.test(message)) {
    return jsonError(
      400,
      'bedrock_validation',
      `Petición inválida a Bedrock: ${message}`,
    );
  }
  if (name === 'ModelNotReadyException' || name === 'ModelTimeoutException') {
    return jsonError(
      503,
      'bedrock_model_not_ready',
      'El modelo no está disponible temporalmente. Reintenta.',
    );
  }
  if (name === 'CredentialsProviderError' || /credentials/i.test(message)) {
    return jsonError(
      500,
      'bedrock_no_credentials',
      'Credenciales AWS no configuradas en el servidor.',
    );
  }

  return jsonError(500, 'bedrock_unknown', message);
}
