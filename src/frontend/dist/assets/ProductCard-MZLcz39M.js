import { u as useCartStore, r as reactExports, j as jsxRuntimeExports, m as motion, L as Link, B as Badge, S as ShoppingBag, h as cn, a as Button, d as ue } from "./index-Oxc-_oxi.js";
import { g as getDiscountedPrice, f as formatPrice } from "./formatters-C5vW1ZnJ.js";
import { T as Tag } from "./tag-CStEkWET.js";
import { C as Check } from "./check-DKcnpQxu.js";
import { S as Star } from "./star-DV5fN0x3.js";
function ProductCard({
  product,
  index = 0,
  className,
  badge
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [isAdded, setIsAdded] = reactExports.useState(false);
  const finalPrice = product.discount > 0 ? getDiscountedPrice(product.price, product.discount) : product.price;
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdded) return;
    addItem({ productId: product.id, quantity: 1, price: finalPrice });
    ue.success(`${product.name} added to cart`, { duration: 2500 });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.05 },
      className: cn("group", className),
      "data-ocid": `product.card.${product.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products/$id", params: { id: String(product.id) }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth hover:-translate-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative overflow-hidden bg-muted",
            style: { height: "192px" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.imageUrl,
                  alt: product.name,
                  loading: "lazy",
                  className: "w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500",
                  onError: (e) => {
                    e.currentTarget.src = "/assets/products/brahmi_forestheals.jpg";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 left-3 flex flex-col gap-1.5", children: [
                product.discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3 mr-1" }),
                  product.discount,
                  "% OFF"
                ] }),
                badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-0.5", children: badge }),
                !badge && product.featured && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-0.5", children: "Featured" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-smooth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  onClick: handleAddToCart,
                  whileTap: { scale: 0.9 },
                  animate: isAdded ? { scale: [1, 1.15, 1] } : {},
                  transition: { duration: 0.3 },
                  className: cn(
                    "absolute bottom-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-green opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-smooth",
                    isAdded ? "bg-green-600 text-white" : "bg-primary text-primary-foreground"
                  ),
                  "aria-label": `Add ${product.name} to cart`,
                  "data-ocid": `product.card.${product.id}.add_button`,
                  children: isAdded ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium", children: product.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground line-clamp-2 text-sm leading-snug mb-2 group-hover:text-primary transition-smooth", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-accent text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: product.ratings.toFixed(1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "(",
              product.reviewCount,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary text-base", children: formatPrice(finalPrice) }),
              product.discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground line-through", children: formatPrice(product.price) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                whileTap: { scale: 0.92 },
                animate: isAdded ? { scale: [1, 1.1, 1] } : {},
                transition: { duration: 0.3 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    onClick: handleAddToCart,
                    className: cn(
                      "text-xs h-8 px-3 shrink-0 transition-all duration-300",
                      isAdded && "bg-green-600 hover:bg-green-600"
                    ),
                    "data-ocid": `product.card.${product.id}.cart_button`,
                    children: isAdded ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }),
                      "Added!"
                    ] }) : "Add"
                  }
                )
              }
            )
          ] })
        ] })
      ] }) })
    }
  );
}
export {
  ProductCard as P
};
