export const categories = [
  "crochet",
  "clay art",
  "pot painting",
  "candles",
  "keychains",
  "handmade jewelry"
];

export const slugifySeller = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const products = [
  {
    id: 1,
    title: "Blush Crochet Tulip Bouquet",
    category: "crochet",
    price: 1299,
    discount: 12,
    trend: true,
    description: "A forever-bloom bouquet handmade with soft cotton yarn, perfect for gifting and cozy room styling.",
    images: [
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?auto=format&fit=crop&w=900&q=80"
    ],
    seller: {
      name: "Thread & Bloom Studio",
      location: "Pune, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      story: "Started from a college desk and now ships crochet flowers across India.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.9,
    reviews: [
      { user: "Anaya", rating: 5, text: "So delicate and beautifully packed." },
      { user: "Meera", rating: 5, text: "Looks dreamy on my work desk." }
    ]
  },
  {
    id: 2,
    title: "Pastel Clay Trinket Tray",
    category: "clay art",
    price: 599,
    discount: 8,
    trend: true,
    description: "Hand-shaped air-dry clay tray with a glossy finish for rings, earrings, and tiny keepsakes.",
    images: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?auto=format&fit=crop&w=900&q=80"
    ],
    seller: {
      name: "Clay Cloud Co.",
      location: "Mumbai, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      story: "Creates playful clay accessories, keepsakes, and desk decor in soft pastel palettes.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.7,
    reviews: [{ user: "Riya", rating: 5, text: "The colors are even prettier in person." }]
  },
  {
    id: 3,
    title: "Mint Hand-Painted Terracotta Pot",
    category: "pot painting",
    price: 749,
    discount: 15,
    trend: false,
    description: "Terracotta planter painted with mint florals and sealed for long-lasting indoor charm.",
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80"
    ],
    seller: {
      name: "Pottery Palette",
      location: "Jaipur, India",
      verified: false,
      avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
      rating: 4.6,
      story: "Paints terracotta planters and home accents inspired by Indian floral motifs.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.6,
    reviews: [{ user: "Tara", rating: 4, text: "Great finish and quick shipping." }]
  },
  {
    id: 4,
    title: "Lavender Soy Wax Candle",
    category: "candles",
    price: 899,
    discount: 10,
    trend: true,
    description: "Slow-poured soy candle with lavender notes, dried flowers, and a reusable glass jar.",
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602526432604-029a709e131c?auto=format&fit=crop&w=900&q=80"
    ],
    seller: {
      name: "Glow Nest Candles",
      location: "Bengaluru, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      story: "Turns calming scents and reusable jars into small-batch candle collections.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.8,
    reviews: [{ user: "Nisha", rating: 5, text: "Soft scent and beautiful jar." }]
  },
  {
    id: 5,
    title: "Cute Resin Initial Keychain",
    category: "keychains",
    price: 349,
    discount: 5,
    trend: false,
    description: "Personalized resin initial keychain with pressed florals, gold flakes, and pastel charms.",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80"
    ],
    seller: {
      name: "Tiny Spark Studio",
      location: "Nagpur, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 4.5,
      story: "Designs personalized resin gifts, charms, and everyday accessories.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.5,
    reviews: [{ user: "Kavya", rating: 5, text: "Adorable gift for my sister." }]
  },
  {
    id: 6,
    title: "Pearl Bead Choker Necklace",
    category: "handmade jewelry",
    price: 999,
    discount: 18,
    trend: true,
    description: "Hand-strung pearl and pastel bead choker with an adjustable gold-plated clasp.",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80"
    ],
    seller: {
      name: "Luna Beads",
      location: "Delhi, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      story: "Creates delicate handmade jewelry for everyday outfits and special moments.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.9,
    reviews: [{ user: "Sara", rating: 5, text: "Premium quality and so elegant." }]
  },
  {
    id: 7,
    title: "Crochet Daisy Tote Charm",
    category: "crochet",
    price: 449,
    discount: 7,
    trend: false,
    description: "A soft crochet daisy charm for totes, backpacks, and keys.",
    images: [
      "https://images.unsplash.com/photo-1613843351058-1dd06fda7c80?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=900&q=80"
    ],
    seller: {
      name: "Thread & Bloom Studio",
      location: "Pune, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      story: "Started from a college desk and now ships crochet flowers across India.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.4,
    reviews: [{ user: "Isha", rating: 4, text: "Very cute and lightweight." }]
  },
  {
    id: 8,
    title: "Blush Floral Hoop Earrings",
    category: "handmade jewelry",
    price: 699,
    discount: 11,
    trend: true,
    description: "Lightweight floral hoop earrings made with polymer clay petals and hypoallergenic hooks.",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80"
    ],
    seller: {
      name: "Clay Cloud Co.",
      location: "Mumbai, India",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      story: "Creates playful clay accessories, keepsakes, and desk decor in soft pastel palettes.",
      socials: { instagram: "#", website: "#" }
    },
    rating: 4.7,
    reviews: [{ user: "Diya", rating: 5, text: "Comfortable and exactly my style." }]
  }
];

export const sellers = Array.from(
  products.reduce((map, product) => {
    if (!map.has(product.seller.name)) {
      map.set(product.seller.name, {
        ...product.seller,
        slug: slugifySeller(product.seller.name),
        cover: product.images[0],
        productsCount: 0
      });
    }
    map.get(product.seller.name).productsCount += 1;
    return map;
  }, new Map()).values()
);

export const testimonials = [
  { name: "Aarohi", text: "PastelNest makes discovering handmade gifts feel joyful and personal.", rating: 5 },
  { name: "Saanvi", text: "The seller stories helped me find artists I now buy from every month.", rating: 5 },
  { name: "Priya", text: "A beautiful shopping experience with thoughtful product details.", rating: 4 }
];

export const sellerStories = [
  {
    name: "Thread & Bloom Studio",
    slug: "thread-bloom-studio",
    story: "Started from a college desk and now ships crochet flowers across India.",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=700&q=80",
    rating: 4.9,
    verified: true
  },
  {
    name: "Glow Nest Candles",
    slug: "glow-nest-candles",
    story: "Turns calming scents and reusable jars into small-batch candle collections.",
    image: "https://images.unsplash.com/photo-1602526432604-029a709e131c?auto=format&fit=crop&w=700&q=80",
    rating: 4.8,
    verified: true
  },
  {
    name: "Luna Beads",
    slug: "luna-beads",
    story: "Creates delicate handmade jewelry for everyday outfits and special moments.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=80",
    rating: 4.9,
    verified: true
  }
];
