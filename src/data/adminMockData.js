import { products, sellers } from "./products";

const names = ["Aarohi Sharma", "Meera Iyer", "Kabir Malhotra", "Nisha Rao", "Tara Singh", "Isha Kapoor", "Diya Menon", "Leena Das"];
const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export const revenueSummary = {
  totalRevenue: 124560,
  todaysRevenue: 18450,
  totalOrders: 342,
  pendingOrders: 28,
  activeSellers: sellers.length,
  pendingApprovals: 14
};

export const revenueByMonth = [
  { month: "Jan", revenue: 52000, orders: 78 },
  { month: "Feb", revenue: 61000, orders: 92 },
  { month: "Mar", revenue: 74000, orders: 105 },
  { month: "Apr", revenue: 68000, orders: 98 },
  { month: "May", revenue: 98000, orders: 132 },
  { month: "Jun", revenue: 124560, orders: 158 }
];

export const categoryPerformance = [
  { name: "Jewelry", value: 45 },
  { name: "Candles", value: 20 },
  { name: "Art", value: 15 },
  { name: "Others", value: 20 }
];

export const adminSellers = sellers.map((seller, index) => ({
  id: `seller-${index + 1}`,
  name: seller.name,
  storeName: seller.name,
  email: `${seller.slug}@pastelnest.in`,
  mobile: `+91 98${String(76543000 + index).slice(0, 8)}`,
  appliedDate: `2026-06-${String(10 + index).padStart(2, "0")}`,
  status: index % 4 === 0 ? "Pending" : index % 5 === 0 ? "Rejected" : "Approved",
  location: seller.location,
  rating: seller.rating
}));

export const adminProducts = products.slice(0, 24).map((product, index) => ({
  ...product,
  sellerName: product.seller?.name || "PastelNest Seller",
  stock: product.stock ?? 18 + index,
  status: index % 5 === 0 ? "Pending" : index % 7 === 0 ? "Rejected" : "Published",
  submittedDate: `2026-06-${String(1 + (index % 18)).padStart(2, "0")}`,
  featured: index % 4 === 0
}));

export const adminOrders = Array.from({ length: 28 }, (_, index) => {
  const product = products[index % products.length];
  return {
    id: `PN-${202600 + index}`,
    customer: names[index % names.length],
    seller: product.seller.name,
    amount: product.price + 69,
    date: `2026-06-${String(1 + (index % 19)).padStart(2, "0")}`,
    status: statuses[index % statuses.length]
  };
});

export const adminCustomers = names.map((name, index) => ({
  id: `cust-${index + 1}`,
  name,
  phone: `+91 9${String(876543210 - index * 3317).slice(0, 9)}`,
  orders: 2 + index * 3,
  joinedDate: `2026-0${(index % 5) + 1}-${String(6 + index).padStart(2, "0")}`,
  status: index === 6 ? "Suspended" : "Active"
}));

export const adminReviews = products.slice(0, 12).map((product, index) => ({
  id: `rev-${index + 1}`,
  product: product.title,
  customer: names[index % names.length],
  rating: Number((4.1 + (index % 8) / 10).toFixed(1)),
  review: product.reviews?.[0]?.text || "Good handmade quality and reliable packaging.",
  status: index % 4 === 0 ? "Pending" : "Approved"
}));

export const deliveryProviders = [
  { name: "Delhivery", status: "Connected", coverage: "All India" },
  { name: "Blue Dart", status: "Connected", coverage: "Metro + Tier 1" },
  { name: "DTDC", status: "Disconnected", coverage: "All India" },
  { name: "Xpressbees", status: "Connected", coverage: "All India" }
];

export const notificationTemplates = ["Festival Sale", "Platform Update", "New Feature"];

export const adminSearchItems = [
  ...adminProducts.slice(0, 8).map((item) => ({ type: "Product", label: item.title, to: "/admin/products" })),
  ...adminOrders.slice(0, 8).map((item) => ({ type: "Order", label: item.id, to: "/admin/orders" })),
  ...adminSellers.slice(0, 8).map((item) => ({ type: "Seller", label: item.storeName, to: "/admin/sellers" })),
  ...adminCustomers.slice(0, 8).map((item) => ({ type: "Customer", label: item.name, to: "/admin/customers" }))
];
