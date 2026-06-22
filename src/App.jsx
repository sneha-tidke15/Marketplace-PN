import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/About";
import { AddressesPage, OrdersPage, ProfilePage, WishlistPage } from "./pages/AccountPages";
import AdminLogin from "./pages/AdminLogin";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import CustomerDashboard from "./pages/CustomerDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import PolicyPage from "./pages/PolicyPage";
import Register from "./pages/Register";
import SellerDashboard from "./pages/SellerDashboard";
import SellerLogin from "./pages/SellerLogin";
import SellerRegister from "./pages/SellerRegister";
import SellerStore from "./pages/SellerStore";
import Shop from "./pages/Shop";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

const AdminDashboardHome = lazy(() => import("./pages/AdminPages").then((module) => ({ default: module.AdminDashboardHome })));
const CustomersPage = lazy(() => import("./pages/AdminPages").then((module) => ({ default: module.CustomersPage })));
const DeliveryPage = lazy(() => import("./pages/AdminPages").then((module) => ({ default: module.DeliveryPage })));
const NotificationsPage = lazy(() => import("./pages/AdminPages").then((module) => ({ default: module.NotificationsPage })));
const OrdersManagementPage = lazy(() => import("./pages/AdminPages").then((module) => ({ default: module.OrdersManagementPage })));
const ProductApprovalsPage = lazy(() => import("./pages/AdminPages").then((module) => ({ default: module.ProductApprovalsPage })));
const ProductsManagementPage = lazy(() => import("./pages/AdminPages").then((module) => ({ default: module.ProductsManagementPage })));
const ReportsPage = lazy(() => import("./pages/AdminPages").then((module) => ({ default: module.ReportsPage })));
const ReviewsPage = lazy(() => import("./pages/AdminPages").then((module) => ({ default: module.ReviewsPage })));
const SellerApprovalsPage = lazy(() => import("./pages/AdminPages").then((module) => ({ default: module.SellerApprovalsPage })));
const SimpleAdminPage = lazy(() => import("./pages/AdminPages").then((module) => ({ default: module.SimpleAdminPage })));

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="container-soft py-20 text-center font-black">Loading...</div>}>
      <Routes location={location}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<ProtectedRoute role="customer"><Checkout /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/seller-register" element={<SellerRegister />} />
          <Route path="/seller/:slug" element={<SellerStore />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/seller-dashboard" element={<ProtectedRoute role="seller"><SellerDashboard /></ProtectedRoute>} />
          <Route path="/customer-dashboard" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/customer-dashboard/:section" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/account/orders" element={<ProtectedRoute role="customer"><OrdersPage /></ProtectedRoute>} />
          <Route path="/account/wishlist" element={<ProtectedRoute role="customer"><WishlistPage /></ProtectedRoute>} />
          <Route path="/account/addresses" element={<ProtectedRoute role="customer"><AddressesPage /></ProtectedRoute>} />
          <Route path="/account/profile" element={<ProtectedRoute role="customer"><ProfilePage /></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<Navigate to="/admin" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policies/:slug" element={<PolicyPage />} />
        </Route>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
          <Route index element={<AdminDashboardHome />} />
          <Route path="products" element={<ProductsManagementPage />} />
          <Route path="product-approvals" element={<ProductApprovalsPage />} />
          <Route path="sellers" element={<SimpleAdminPage title="Sellers" />} />
          <Route path="seller-approvals" element={<SellerApprovalsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="orders" element={<OrdersManagementPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="coupons" element={<SimpleAdminPage title="Coupons" />} />
          <Route path="delivery" element={<DeliveryPage />} />
          <Route path="payouts" element={<SimpleAdminPage title="Payouts" />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SimpleAdminPage title="Settings" />} />
        </Route>
      </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
