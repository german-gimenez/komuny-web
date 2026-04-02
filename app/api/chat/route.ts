import { streamText, tool, jsonSchema, convertToModelMessages } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { glossaryTerms } from '../../data/glossary';

const RESOURCES = [
  { title: 'Glosario de IA', desc: 'Más de 29 términos de IA explicados para educadores', href: 'https://komuny.org/#glosario' },
  { title: 'Herramientas gratuitas', desc: 'Canva, Khanmigo, NotebookLM, Perplexity y más', href: 'https://github.com/german-gimenez/komuny/blob/main/recursos/herramientas-gratuitas.md' },
  { title: 'Skills para Claude', desc: 'Configuraciones especializadas listas para el aula', href: 'https://github.com/german-gimenez/komuny/tree/main/skills' },
  { title: 'Templates de Prompts', desc: 'Tickets listos para planear clases y evaluar', href: 'https://github.com/german-gimenez/komuny/tree/main/templates' },
  { title: 'Guías paso a paso', desc: 'Tutoriales de IA para el aula, de principiante a avanzado', href: 'https://github.com/german-gimenez/komuny/tree/main/guides' },
];

const glossaryContext = glossaryTerms
  .map(t => `- ${t.term} (${t.tag ?? 'general'}): ${t.definition}`)
  .join('\n');

const resourcesContext = RESOURCES
  .map(r => `- ${r.title}: ${r.desc} → ${r.href}`)
  .join('\n');

const SYSTEM_PROMPT = `Eres KomIA, el asistente de Komuny Edu, creado por Napsix.AI.
Tu misión principal es ayudar a docentes latinoamericanos a integrar IA en sus clases, pero también podés responder cualquier pregunta que el usuario tenga — sobre educación, pedagogía, planificación de clases, herramientas, tecnología, o cualquier tema en el que puedas ser útil.

CÓMO RESPONDER:
- Siempre en español, de forma concisa, cálida y práctica.
- Prioriza respuestas accionables: qué puede hacer el docente HOY.
- Si no sabés algo con certeza, decilo honestamente.
- Para preguntas de IA en educación, usa los recursos de Komuny Edu.
- Para cualquier otra pregunta, respondé directamente con tu conocimiento.

RECURSOS DISPONIBLES EN KOMUNY EDU:
${resourcesContext}

GLOSARIO DE IA PARA DOCENTES (usalo como referencia):
${glossaryContext}

HERRAMIENTAS ÚTILES:
- Cuando el usuario pregunte por un término de IA → usa buscar_termino
- Cuando pida recursos, herramientas o materiales → usa listar_recursos
- Para todo lo demás → respondé directamente`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const result = streamText({
      model: gateway('zai/glm-4.7-flash'),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      tools: {
        buscar_termino: tool({
          description: 'Busca y devuelve definiciones de términos de IA del glosario de Komuny Edu',
          inputSchema: jsonSchema<{ query: string }>({
          type: 'object',
          properties: {
            query: { type: 'string', description: 'El término o concepto de IA a buscar' },
          },
          required: ['query'],
        }),
        execute: async ({ query }) => {
          const q = query.toLowerCase();
          const results = glossaryTerms
            .filter(t =>
              t.term.toLowerCase().includes(q) ||
              t.definition.toLowerCase().includes(q) ||
              (t.tip ?? '').toLowerCase().includes(q)
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
            : [{ term: 'Sin resultados', definition: `No encontré "${query}" en el glosario. Podés proponer el término en github.com/german-gimenez/komuny`, tag: null }];
        },
      }),
      listar_recursos: tool({
        description: 'Lista todos los recursos disponibles en Komuny Edu con sus links',
        inputSchema: jsonSchema<Record<string, never>>({
          type: 'object',
          properties: {},
        }),
        execute: async () => RESOURCES,
      }),
    },
  });

  return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('[KomIA API error]', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return new Response(
      JSON.stringify({ error: 'Error al conectar con el modelo de IA', detail: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
