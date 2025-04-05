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
    logo: "../../assets/logos/sabra.jpg",
    description: "Hummus, dips, and spreads"
  },
  {
    id: 2,
    name: "SodaStream",
    category: "beverages",
    alternativeBrands: ["Regular bottled sparkling water", "Manual soda makers"],
    logo: "../../assets/logos/sodastream.jpg",
    description: "Home carbonation products"
  },
  {
    id: 3,
    name: "Ahava",
    category: "cosmetics",
    alternativeBrands: ["Local organic skincare", "Non-Israeli international brands"],
    logo: "../../assets/logos/ahava.jpg",
    description: "Dead Sea cosmetics and skincare"
  },
  {
    id: 4,
    name: "Teva Pharmaceutical",
    category: "pharmaceuticals",
    alternativeBrands: ["Generic alternatives (consult doctor)", "Local pharmaceutical companies"],
    logo: "../../assets/logos/teva.jpg",
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
    logo: "../../assets/logos/strauss.jpg",
    description: "Dairy products, coffee, snacks"
  },
  {
    id: 7,
    name: "Wix",
    category: "technology",
    alternativeBrands: ["WordPress", "Shopify", "Squarespace"],
    logo: "../../assets/logos/wix.jpg",
    description: "Website building platform"
  },
  {
    id: 8,
    name: "Stanley Black & Decker",
    category: "tools",
    alternativeBrands: ["Bosch", "Makita", "DeWalt"],
    logo: "../../assets/logos/stanley.jpg",
    description: "Tools and home improvement products with Israeli subsidiaries"
  },
  {
    id: 9,
    name: "Puma",
    category: "clothing",
    alternativeBrands: ["Adidas", "Nike", "Local sports brands"],
    logo: "../../assets/logos/puma.jpg",
    description: "Sportswear sponsor of the Israel Football Association"
  },
  {
    id: 10,
    name: "HP (Hewlett Packard)",
    category: "technology",
    alternativeBrands: ["Lenovo", "Dell", "Acer"],
    logo: "../../assets/logos/hp.jpg",
    description: "Computers and technology services to Israeli government"
  }
];
