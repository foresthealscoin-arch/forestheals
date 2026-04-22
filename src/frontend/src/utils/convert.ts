/** Convert bigint or number to JS number */
export function toNumber(v: bigint | number): number {
  return typeof v === "bigint" ? Number(v) : v;
}

/** Format a bigint/number price as ₹XX.XX string */
export function toPrice(v: bigint | number): string {
  const n = toNumber(v);
  return `₹${n.toLocaleString("en-IN")}`;
}

/** Convert a JS number to bigint for backend calls */
export function fromNumber(v: number): bigint {
  return BigInt(Math.round(v));
}

/** Convert nanosecond bigint timestamp to JS Date */
export function nsToDate(ns: bigint | number): Date {
  return new Date(Number(ns) / 1_000_000);
}

/** Format nanosecond timestamp as readable date string */
export function nsToDateStr(ns: bigint | number): string {
  return nsToDate(ns).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Convert ISO date string to nanosecond bigint */
export function dateStrToNs(dateStr: string): bigint {
  return BigInt(new Date(dateStr).getTime()) * BigInt(1_000_000);
}

/** Unwrap a Result<T, E> from backend */
export function unwrapResult<T>(
  result: { __kind__: "ok"; ok: T } | { __kind__: "err"; err: string },
): T {
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok;
}
