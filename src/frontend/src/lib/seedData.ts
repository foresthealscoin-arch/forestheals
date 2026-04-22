import type { Product } from "../types";

const IS_DEV = import.meta.env.DEV;

export const PRODUCTS_SEED_DATA: Product[] = IS_DEV
  ? [
      {
        id: 1,
        name: "Organic Ashwagandha Powder",
        description:
          "Premium adaptogenic herb for stress relief, energy, and hormonal balance. Sourced from organic farms in Rajasthan. 100% pure, no additives.",
        price: 299,
        category: "Ayurvedic Powders",
        imageUrl: "/assets/products/organic_ashwagandha_forestheals.jpg",
        imageKey: "ashwagandha",
        images: ["/assets/products/organic_ashwagandha_forestheals.jpg"],
        stock: 150,
        ratings: 4.8,
        reviewCount: 124,
        featured: true,
        bestseller: true,
        discount: 10,
        bundleIds: [],
        status: "active",
      },
      {
        id: 2,
        name: "Brahmi Powder",
        description:
          "Ancient brain tonic for memory, focus, and cognitive enhancement. Wildcrafted from pristine forests. Supports neural health and mental clarity.",
        price: 249,
        category: "Ayurvedic Powders",
        imageUrl: "/assets/products/brahmi_forestheals.jpg",
        imageKey: "brahmi",
        images: ["/assets/products/brahmi_forestheals.jpg"],
        stock: 120,
        ratings: 4.7,
        reviewCount: 89,
        featured: true,
        bestseller: false,
        discount: 0,
        bundleIds: [],
        status: "active",
      },
      {
        id: 3,
        name: "Organic Moringa Powder",
        description:
          "Superfood packed with 92 nutrients, 46 antioxidants, and 36 anti-inflammatories. Boosts immunity, energy, and overall vitality.",
        price: 279,
        category: "Ayurvedic Powders",
        imageUrl: "/assets/products/organic_moringa_forestheals.jpg",
        imageKey: "moringa",
        images: ["/assets/products/organic_moringa_forestheals.jpg"],
        stock: 200,
        ratings: 4.9,
        reviewCount: 156,
        featured: true,
        bestseller: true,
        discount: 15,
        bundleIds: [],
        status: "active",
      },
    ]
  : [];
