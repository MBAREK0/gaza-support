export interface Product {
  id: number;
  name: string;
  category: string;
  alternativeBrands?: string[];
  logo?: string;
  description?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Sabra",
    category: "food",
    alternativeBrands: ["Local hummus brands", "Homemade hummus"],
    logo: "sabra.png",
    description: "Hummus, dips, and spreads"
  },
  {
    id: 2,
    name: "SodaStream",
    category: "beverages",
    alternativeBrands: ["Regular bottled sparkling water", "Manual soda makers"],
    logo: "sodastream.avif",
    description: "Home carbonation products"
  },
  {
    id: 3,
    name: "Ahava",
    category: "cosmetics",
    alternativeBrands: ["Local organic skincare", "Non-Israeli international brands"],
    logo: "ahava.png",
    description: "Dead Sea cosmetics and skincare"
  },
  {
    id: 4,
    name: "Teva Pharmaceutical",
    category: "pharmaceuticals",
    alternativeBrands: ["Generic alternatives (consult doctor)", "Local pharmaceutical companies"],
    logo: "teva.png",
    description: "Generic and specialty medications"
  },
  {
    id: 5,
    name: "Medjool Date Farms",
    category: "food",
    alternativeBrands: ["Dates from Morocco, Tunisia, Algeria", "Local date producers"],
    description: "Dates from occupied territories"
  },
  {
    id: 6,
    name: "Strauss Group",
    category: "food",
    alternativeBrands: ["Local dairy and coffee brands"],
    logo: "Strauss.png",
    description: "Dairy products, coffee, snacks"
  },
  {
    id: 7,
    name: "Wix",
    category: "technology",
    alternativeBrands: ["WordPress", "Shopify", "Squarespace"],
    logo: "wix.png",
    description: "Website building platform"
  },
  {
    id: 8,
    name: "Stanley Black & Decker",
    category: "tools",
    alternativeBrands: ["Bosch", "Makita", "DeWalt"],
    logo: "stanley_black_decker_israel_logo.jpeg",
    description: "Tools and home improvement products with Israeli subsidiaries"
  },
  {
    id: 9,
    name: "Puma",
    category: "clothing",
    alternativeBrands: ["Adidas", "Nike", "Local sports brands"],
    logo: "Puma-logo.png",
    description: "Sportswear sponsor of the Israel Football Association"
  },
  {
    id: 10,
    name: "HP (Hewlett Packard)",
    category: "technology",
    alternativeBrands: ["Lenovo", "Dell", "Acer"],
    logo: "hp.png",
    description: "Computers and technology services to Israeli government"
  }
];
