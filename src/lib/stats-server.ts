import { Redis } from "@upstash/redis";
import { STAT_KINDS, type StatKind, type Stats } from "@/types/stats";
import type { ColoringPage } from "@/types/coloring";

const url = process.env.COUNTER_TRACKER_KV_REST_API_URL;
const token = process.env.COUNTER_TRACKER_KV_REST_API_TOKEN;

export const redis = url && token ? new Redis({ url, token }) : null;

export const statKey = (kind: StatKind) => `stats:${kind}`;

const EMPTY: Stats = { views: {}, prints: {}, downloads: {} };

function toCounts(hash: Record<string, unknown> | null): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [slug, value] of Object.entries(hash ?? {})) out[slug] = Number(value) || 0;
  return out;
}

export async function readStats(): Promise<Stats | null> {
  if (!redis) return null;
  const pipe = redis.pipeline();
  for (const kind of STAT_KINDS) pipe.hgetall(statKey(kind));
  const results = await pipe.exec<(Record<string, unknown> | null)[]>();
  return Object.fromEntries(STAT_KINDS.map((kind, i) => [kind, toCounts(results[i])])) as Stats;
}

export async function getPopularPages<T extends ColoringPage>(pages: T[], limit: number): Promise<T[]> {
  let stats = EMPTY;
  try {
    stats = (await readStats()) ?? EMPTY;
  } catch {
    // Redis outage must not break the homepage — fall back to the featured order
  }

  const score = (p: T) => [
    stats.prints[p.slug] ?? 0,
    stats.views[p.slug] ?? 0,
    stats.downloads[p.slug] ?? 0,
    p.featured ? 1 : 0,
  ];

  return [...pages]
    .sort((a, b) => {
      const sa = score(a);
      const sb = score(b);
      for (let i = 0; i < sa.length; i++) if (sa[i] !== sb[i]) return sb[i] - sa[i];
      return 0;
    })
    .slice(0, limit);
}
