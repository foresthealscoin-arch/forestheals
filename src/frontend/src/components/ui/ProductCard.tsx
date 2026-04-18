import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Check, ShoppingBag, Star, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice, getDiscountedPrice } from "../../lib/formatters";
import { useCartStore } from "../../stores/useCartStore";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
  badge?: string;
}

export function ProductCard({
  product,
  index = 0,
  className,
  badge,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const finalPrice =
    product.discount > 0
      ? getDiscountedPrice(product.price, product.discount)
      : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdded) return;
    addItem({ productId: product.id, quantity: 1, price: finalPrice });
    toast.success(`${product.name} added to cart`, { duration: 2500 });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn("group", className)}
      data-ocid={`product.card.${product.id}`}
    >
      <Link to="/products/$id" params={{ id: String(product.id) }}>
        <div className="glass-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-smooth hover:-translate-y-1">
          {/* Image */}
          <div className="relative overflow-hidden bg-muted aspect-square">
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-500"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=400&q=80";
              }}
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.discount > 0 && (
                <Badge className="bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-0.5">
                  <Tag className="w-3 h-3 mr-1" />
                  {product.discount}% OFF
                </Badge>
              )}
              {badge && (
                <Badge className="bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-0.5">
                  {badge}
                </Badge>
              )}
              {!badge && product.featured && (
                <Badge className="bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-0.5">
                  Featured
                </Badge>
              )}
            </div>
            {/* Quick add */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-smooth" />
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.9 }}
              animate={isAdded ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.3 }}
              className={cn(
                "absolute bottom-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-green opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-smooth",
                isAdded
                  ? "bg-green-600 text-white"
                  : "bg-primary text-primary-foreground",
              )}
              aria-label={`Add ${product.name} to cart`}
              data-ocid={`product.card.${product.id}.add_button`}
            >
              {isAdded ? (
                <Check className="w-4 h-4" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </motion.button>
          </div>

          {/* Info */}
          <div className="p-4">
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">
              {product.category}
            </p>
            <h3 className="font-semibold text-foreground line-clamp-2 text-sm leading-snug mb-2 group-hover:text-primary transition-smooth">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span className="text-xs font-semibold text-foreground">
                {product.ratings.toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-primary text-base">
                  {formatPrice(finalPrice)}
                </span>
                {product.discount > 0 && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              <motion.div
                whileTap={{ scale: 0.92 }}
                animate={isAdded ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className={cn(
                    "text-xs h-8 px-3 shrink-0 transition-all duration-300",
                    isAdded && "bg-green-600 hover:bg-green-600",
                  )}
                  data-ocid={`product.card.${product.id}.cart_button`}
                >
                  {isAdded ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Added!
                    </span>
                  ) : (
                    "Add"
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
