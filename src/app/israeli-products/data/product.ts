export interface Product {
  id: number;
  name: string;
  category: string;
  alternativeBrands?: string[];
  logo?: string;
  description?: string;
  productImages?: string[]; // Array of image paths for product images
}

export const products: Product[] = [
  {
    id: 1,
    name: "Sabra",
    category: "food",
    alternativeBrands: ["Local hummus brands", "Homemade hummus"],
    logo: "sabra.png",
    description: "Hummus, dips, and spreads",
    productImages: [
      "sabra-product-1.jpg",
      "sabra-product-2.jpg",
      "sabra-product-3.jpg"
    ]
  },
  {
    id: 2,
    name: "SodaStream",
    category: "beverages",
    alternativeBrands: ["Regular bottled sparkling water", "Manual soda makers"],
    logo: "sodastream.avif",
    description: "Home carbonation products",
    productImages: [
      "sodastream-product-1.jpg",
      "sodastream-product-2.jpg",
      "sodastream-product-3.jpg",
      "sodastream-product-4.jpg"
    ]
  },
  {
    id: 3,
    name: "Ahava",
    category: "cosmetics",
    alternativeBrands: ["Local organic skincare", "Non-Israeli international brands"],
    logo: "ahava.png",
    description: "Dead Sea cosmetics and skincare",
    productImages: [
      "ahava-product-1.jpg",
      "ahava-product-2.jpg",
      "ahava-product-3.jpg"
    ]
  },
  {
    id: 4,
    name: "Teva Pharmaceutical",
    category: "pharmaceuticals",
    alternativeBrands: ["Generic alternatives (consult doctor)", "Local pharmaceutical companies"],
    logo: "teva.png",
    description: "Generic and specialty medications",
    productImages: [
      "teva-product-1.jpg",
      "teva-product-2.jpg",
      "teva-product-3.jpg"
    ]
  },
  {
    id: 5,
    name: "Medjool Date Farms",
    category: "food",
    alternativeBrands: ["Dates from Morocco, Tunisia, Algeria", "Local date producers"],
    description: "Dates from occupied territories",
    productImages: [
      "medjool-product-1.jpg",
      "medjool-product-2.jpg"
    ]
  },
  {
    id: 6,
    name: "Strauss Group",
    category: "food",
    alternativeBrands: ["Local dairy and coffee brands"],
    logo: "Strauss.png",
    description: "Dairy products, coffee, snacks",
    productImages: [
      "strauss-product-1.jpg",
      "strauss-product-2.jpg",
      "strauss-product-3.jpg"
    ]
  },
  {
    id: 7,
    name: "Wix",
    category: "technology",
    alternativeBrands: ["WordPress", "Shopify", "Squarespace"],
    logo: "wix.png",
    description: "Website building platform",
    productImages: [
      "wix-product-1.jpg",
      "wix-product-2.jpg"
    ]
  },
  {
    id: 8,
    name: "Stanley Black & Decker",
    category: "tools",
    alternativeBrands: ["Bosch", "Makita", "DeWalt"],
    logo: "stanley_black_decker_israel_logo.jpeg",
    description: "Tools and home improvement products with Israeli subsidiaries",
    productImages: [
      "stanley-product-1.jpg",
      "stanley-product-2.jpg",
      "stanley-product-3.jpg",
      "stanley-product-4.jpg"
    ]
  },
  {
    id: 9,
    name: "Puma",
    category: "clothing",
    alternativeBrands: ["Adidas", "Nike", "Local sports brands"],
    logo: "Puma-logo.png",
    description: "Sportswear sponsor of the Israel Football Association",
    productImages: [
      "puma-product-1.jpg",
      "puma-product-2.jpg",
      "puma-product-3.jpg"
    ]
  },
  {
    id: 10,
    name: "HP (Hewlett Packard)",
    category: "technology",
    alternativeBrands: ["Lenovo", "Dell", "Acer"],
    logo: "hp.png",
    description: "Computers and technology services to Israeli government",
    productImages: [
      "hp-product-1.jpg",
      "hp-product-2.jpg",
      "hp-product-3.jpg"
    ]
  },
  {
    id: 11,
    name: "Coca-Cola",
    category: "beverages",
    alternativeBrands: ["le'cola", "le lemon", "le Porta", "laiko", "Glass'"],
    logo: "Coca-Cola.png",
    description: "Boycott Coca-Cola and other colas that support Israel to stand against injustice and show solidarity with the oppressed in Palestine.",
    productImages: [
      "beverages.png",
      "beverages.png",
      "beverages.png"
    ]
  }
];
