export const STAT_KINDS = ["views", "prints", "downloads"] as const;
export type StatKind = typeof STAT_KINDS[number];
export type Stats = Record<StatKind, Record<string, number>>;
