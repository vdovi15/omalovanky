import { NextResponse } from "next/server";
import { getColoringPages } from "@/lib/content";
import { readStats, redis, statKey } from "@/lib/stats-server";
import { STAT_KINDS, type StatKind } from "@/types/stats";

const validSlugs = new Set(getColoringPages().map(p => p.slug));
const MAX_SLUGS_PER_REQUEST = 10;

export async function GET() {
  const stats = await readStats();
  if (!stats) return NextResponse.json({ error: "stats unavailable" }, { status: 503 });

  // CDN caches the totals briefly so page views don't each cost Redis reads
  return NextResponse.json(stats, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
  });
}

export async function POST(request: Request) {
  if (!redis) return NextResponse.json({ error: "stats unavailable" }, { status: 503 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const { kind, slugs } = (body ?? {}) as { kind?: unknown; slugs?: unknown };
  if (typeof kind !== "string" || !(STAT_KINDS as readonly string[]).includes(kind)) {
    return NextResponse.json({ error: "invalid kind" }, { status: 400 });
  }
  if (!Array.isArray(slugs) || slugs.length === 0 || slugs.length > MAX_SLUGS_PER_REQUEST) {
    return NextResponse.json({ error: "invalid slugs" }, { status: 400 });
  }

  const unique = [...new Set(slugs)].filter((s): s is string => typeof s === "string" && validSlugs.has(s));
  if (unique.length === 0) return NextResponse.json({ error: "unknown slugs" }, { status: 400 });

  const pipe = redis.pipeline();
  for (const slug of unique) pipe.hincrby(statKey(kind as StatKind), slug, 1);
  await pipe.exec();

  return NextResponse.json({ ok: true });
}
