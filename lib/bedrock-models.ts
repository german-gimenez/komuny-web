/**
 * Catálogo de modelos Anthropic disponibles en AWS Bedrock (us-east-1).
 *
 * Inference profile IDs (us.*) — son los que se usan al invocar el modelo.
 * Verificado contra `aws bedrock list-inference-profiles` el 2026-05.
 */

export type ModelTier = 'fast' | 'balanced' | 'flagship';

export interface BedrockModel {
  /** Inference profile ID que se pasa al SDK */
  id: string;
  /** Nombre legible para la UI */
  name: string;
  /** Familia (haiku=rápido, sonnet=equilibrado, opus=top) */
  tier: ModelTier;
  /** Versión visible */
  version: string;
  /** Descripción corta para UI */
  description: string;
  /** Si soporta imágenes (multimodal) */
  vision: boolean;
}

export const BEDROCK_MODELS: BedrockModel[] = [
  // ────────── FAST (Haiku) ──────────
  {
    id: 'us.anthropic.claude-haiku-4-5-20251001-v1:0',
    name: 'Claude Haiku 4.5',
    tier: 'fast',
    version: '4.5',
    description: 'Rápido y económico. Ideal para chat conversacional.',
    vision: true,
  },
  {
    id: 'us.anthropic.claude-3-5-haiku-20241022-v1:0',
    name: 'Claude 3.5 Haiku',
    tier: 'fast',
    version: '3.5',
    description: 'Versión anterior de Haiku, solo texto.',
    vision: false,
  },

  // ────────── BALANCED (Sonnet) ──────────
  {
    id: 'us.anthropic.claude-sonnet-4-6',
    name: 'Claude Sonnet 4.6',
    tier: 'balanced',
    version: '4.6',
    description: 'Equilibrio máximo entre velocidad y profundidad.',
    vision: true,
  },
  {
    id: 'us.anthropic.claude-sonnet-4-5-20250929-v1:0',
    name: 'Claude Sonnet 4.5',
    tier: 'balanced',
    version: '4.5',
    description: 'Excelente para generación de contenido educativo.',
    vision: true,
  },
  {
    id: 'us.anthropic.claude-sonnet-4-20250514-v1:0',
    name: 'Claude Sonnet 4',
    tier: 'balanced',
    version: '4.0',
    description: 'Modelo equilibrado estable.',
    vision: true,
  },

  // ────────── FLAGSHIP (Opus) ──────────
  {
    id: 'us.anthropic.claude-opus-4-7',
    name: 'Claude Opus 4.7',
    tier: 'flagship',
    version: '4.7',
    description: 'Máxima calidad de razonamiento, lo último de Anthropic.',
    vision: true,
  },
  {
    id: 'us.anthropic.claude-opus-4-6-v1',
    name: 'Claude Opus 4.6',
    tier: 'flagship',
    version: '4.6',
    description: 'Razonamiento profundo, alto en análisis complejos.',
    vision: true,
  },
  {
    id: 'us.anthropic.claude-opus-4-5-20251101-v1:0',
    name: 'Claude Opus 4.5',
    tier: 'flagship',
    version: '4.5',
    description: 'Opus estable, gran capacidad de contexto.',
    vision: true,
  },
];

/** Default para el chatbot KomIA (priorizar velocidad). */
export const DEFAULT_CHAT_MODEL =
  process.env.BEDROCK_MODEL_CHAT ??
  'us.anthropic.claude-haiku-4-5-20251001-v1:0';

/** Default para las 5 herramientas IA (priorizar calidad de contenido). */
export const DEFAULT_TOOLS_MODEL =
  process.env.BEDROCK_MODEL_TOOLS ??
  'us.anthropic.claude-sonnet-4-5-20250929-v1:0';

/** Set de IDs válidos para validación rápida. */
const VALID_IDS = new Set(BEDROCK_MODELS.map(m => m.id));

/**
 * Valida y resuelve un modelId. Si es inválido o vacío, devuelve el fallback.
 * Esto previene que un cliente malicioso o un bug envíe un modelId arbitrario.
 */
export function resolveModelId(
  requested: string | undefined | null,
  fallback: string,
): string {
  if (!requested) return fallback;
  if (VALID_IDS.has(requested)) return requested;
  return fallback;
}

/** Devuelve el modelo por tier (primer match). Útil para UI. */
export function getModelByTier(tier: ModelTier): BedrockModel {
  return BEDROCK_MODELS.find(m => m.tier === tier) ?? BEDROCK_MODELS[0];
}

/** Lista pública (sin datos sensibles) para enviar al cliente si se necesita. */
export const PUBLIC_MODELS = BEDROCK_MODELS.map(({ id, name, tier, version, description, vision }) => ({
  id,
  name,
  tier,
  version,
  description,
  vision,
}));
