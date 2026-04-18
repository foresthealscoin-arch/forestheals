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
function getOrderStatusColor(status) {
  const map = {
    pending: "bg-secondary text-secondary-foreground",
    confirmed: "bg-primary/10 text-primary",
    shipped: "bg-accent/20 text-accent-foreground",
    delivered: "bg-primary/20 text-primary",
    cancelled: "bg-destructive/10 text-destructive"
  };
  return map[status] ?? "bg-muted text-muted-foreground";
}
export {
  formatDate as a,
  getOrderStatusColor as b,
  formatDateTime as c,
  formatPrice as f,
  getDiscountedPrice as g
};
