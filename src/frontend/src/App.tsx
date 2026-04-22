import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/layout/Layout";
import { PageSpinner } from "./components/ui/Spinner";
import { useBackend } from "./hooks/useBackend";
import { useAdminPStore } from "./pages/adminp/adminpStore";
import { useAuthStore } from "./stores/useAuthStore";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const OrderDetailPage = lazy(() => import("./pages/OrderDetailPage"));
const RecommendationPage = lazy(() => import("./pages/RecommendationPage"));
const B2BPage = lazy(() => import("./pages/B2BPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const BundlesPage = lazy(() => import("./pages/BundlesPage"));
const TermsPage = lazy(() => import("./pages/legal/TermsPage"));
const PrivacyPage = lazy(() => import("./pages/legal/PrivacyPage"));
const RefundPage = lazy(() => import("./pages/legal/RefundPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

// Admin-P pages (standalone, no site Layout)
const AdminPLoginPage = lazy(() => import("./pages/adminp/AdminPLoginPage"));
const AdminPDashboard = lazy(() => import("./pages/adminp/AdminPDashboard"));
const AdminPProducts = lazy(() => import("./pages/adminp/AdminPProducts"));
const AdminPOrders = lazy(() => import("./pages/adminp/AdminPOrders"));
const AdminPCustomers = lazy(() => import("./pages/adminp/AdminPCustomers"));
const AdminPAnalytics = lazy(() => import("./pages/adminp/AdminPAnalytics"));
const AdminPMarketing = lazy(() => import("./pages/adminp/AdminPMarketing"));
const AdminPTeam = lazy(() => import("./pages/adminp/AdminPTeam"));
const AdminPTasks = lazy(() => import("./pages/adminp/AdminPTasks"));
const AdminPInventory = lazy(() => import("./pages/adminp/AdminPInventory"));
const AdminPReviews = lazy(() => import("./pages/adminp/AdminPReviews"));
const AdminPBlog = lazy(() => import("./pages/adminp/AdminPBlog"));
const AdminPSettings = lazy(() => import("./pages/adminp/AdminPSettings"));

function AppRoot() {
  useBackend();
  return (
    <Layout>
      <Suspense fallback={<PageSpinner />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

const rootRoute = createRootRoute({ component: AppRoot });

function requireAuth() {
  const { isLoggedIn } = useAuthStore.getState();
  if (!isLoggedIn) throw redirect({ to: "/auth/login" });
}

function requireAdminP() {
  const { isLoggedIn } = useAdminPStore.getState();
  if (!isLoggedIn) throw redirect({ to: "/admin-p" });
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
});
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: () => <ProductsPage />,
});
const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: () => <ProductDetailPage />,
});
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => <CartPage />,
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => <CheckoutPage />,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/login",
  component: () => <LoginPage />,
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/signup",
  component: () => <SignupPage />,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  beforeLoad: requireAuth,
  component: () => <DashboardPage />,
});
const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard/orders/$id",
  beforeLoad: requireAuth,
  component: () => <OrderDetailPage />,
});
const recommendRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recommend",
  component: () => <RecommendationPage />,
});
const b2bRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/b2b",
  component: () => <B2BPage />,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => <AboutPage />,
});
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: () => <ServicesPage />,
});
const bundlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bundles",
  component: () => <BundlesPage />,
});
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/legal/terms",
  component: () => <TermsPage />,
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/legal/privacy",
  component: () => <PrivacyPage />,
});
const refundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/legal/refund",
  component: () => <RefundPage />,
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => <BlogPage />,
});
const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: () => <BlogPostPage />,
});

// Admin-P routes (standalone, no site Layout)
const adminPLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p",
  component: () => <AdminPLoginPage />,
});
const adminPDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p/dashboard",
  beforeLoad: requireAdminP,
  component: () => <AdminPDashboard />,
});
const adminPProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p/products",
  beforeLoad: requireAdminP,
  component: () => <AdminPProducts />,
});
const adminPOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p/orders",
  beforeLoad: requireAdminP,
  component: () => <AdminPOrders />,
});
const adminPCustomersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p/customers",
  beforeLoad: requireAdminP,
  component: () => <AdminPCustomers />,
});
const adminPAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p/analytics",
  beforeLoad: requireAdminP,
  component: () => <AdminPAnalytics />,
});
const adminPMarketingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p/marketing",
  beforeLoad: requireAdminP,
  component: () => <AdminPMarketing />,
});
const adminPTeamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p/team",
  beforeLoad: requireAdminP,
  component: () => <AdminPTeam />,
});
const adminPTasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p/tasks",
  beforeLoad: requireAdminP,
  component: () => <AdminPTasks />,
});
const adminPInventoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p/inventory",
  beforeLoad: requireAdminP,
  component: () => <AdminPInventory />,
});
const adminPCouponsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p/coupons",
  beforeLoad: requireAdminP,
  component: () => <AdminPMarketing />,
});
const adminPReviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p/reviews",
  beforeLoad: requireAdminP,
  component: () => <AdminPReviews />,
});
const adminPBlogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p/blog",
  beforeLoad: requireAdminP,
  component: () => <AdminPBlog />,
});
const adminPSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-p/settings",
  beforeLoad: requireAdminP,
  component: () => <AdminPSettings />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productsRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  loginRoute,
  signupRoute,
  dashboardRoute,
  orderDetailRoute,
  recommendRoute,
  b2bRoute,
  aboutRoute,
  servicesRoute,
  bundlesRoute,
  termsRoute,
  privacyRoute,
  refundRoute,
  blogRoute,
  blogPostRoute,
  // Admin-P standalone routes
  adminPLoginRoute,
  adminPDashboardRoute,
  adminPProductsRoute,
  adminPOrdersRoute,
  adminPCustomersRoute,
  adminPAnalyticsRoute,
  adminPMarketingRoute,
  adminPTeamRoute,
  adminPTasksRoute,
  adminPInventoryRoute,
  adminPCouponsRoute,
  adminPReviewsRoute,
  adminPBlogRoute,
  adminPSettingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
