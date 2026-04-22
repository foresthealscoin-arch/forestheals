function toNumber(v) {
  return typeof v === "bigint" ? Number(v) : v;
}
function toPrice(v) {
  const n = toNumber(v);
  return `₹${n.toLocaleString("en-IN")}`;
}
function unwrapResult(result) {
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok;
}
export {
  toNumber as a,
  toPrice as t,
  unwrapResult as u
};
