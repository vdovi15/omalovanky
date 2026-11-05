"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { StatKind, Stats } from "@/types/stats";

type State = { status: "idle" | "loading" | "ready" | "error"; data: Stats | null };

let state: State = { status: "idle", data: null };
const listeners = new Set<() => void>();
const SERVER_STATE: State = { status: "idle", data: null };

function setState(next: State) {
  state = next;
  listeners.forEach(l => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function load() {
  if (state.status !== "idle") return;
  setState({ status: "loading", data: null });
  fetch("/api/stats")
    .then(res => (res.ok ? (res.json() as Promise<Stats>) : Promise.reject(res.status)))
    .then(data => setState({ status: "ready", data }))
    .catch(() => setState({ status: "error", data: null }));
}

export function useStats(): State {
  useEffect(load, []);
  return useSyncExternalStore(subscribe, () => state, () => SERVER_STATE);
}

export function recordStat(kind: StatKind, slugs: string[]) {
  if (slugs.length === 0) return;

  fetch("/api/stats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ kind, slugs }),
    keepalive: true,
  }).catch(() => {});

  if (state.data) {
    const counts = { ...state.data[kind] };
    for (const slug of slugs) counts[slug] = (counts[slug] ?? 0) + 1;
    setState({ ...state, data: { ...state.data, [kind]: counts } });
  }
}
