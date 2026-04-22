function formatPrice(paise) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(paise);
}
function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(timestamp));
}
function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(timestamp));
}
function getDiscountedPrice(price, discount) {
  return Math.round(price * (1 - discount / 100));
}
export {
  formatDate as a,
  formatDateTime as b,
  formatPrice as f,
  getDiscountedPrice as g
};
