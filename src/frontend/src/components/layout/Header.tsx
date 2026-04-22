import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Shield,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../stores/useAuthStore";
import { useCartStore } from "../../stores/useCartStore";
import { useUIStore } from "../../stores/useUIStore";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "Bundles", to: "/bundles" },
  { label: "Recommend", to: "/recommend" },
  { label: "B2B", to: "/b2b" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
];

export function Header() {
  const location = useLocation();
  const itemCount = useCartStore((s) => s.itemCount)();
  const { isLoggedIn, isAdmin } = useAuthStore();
  const { isMenuOpen, toggleMenu, closeMenu } = useUIStore();
  const { login, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenuRef = useRef(closeMenu);
  closeMenuRef.current = closeMenu;
  const pathnameRef = useRef(location.pathname);
  useEffect(() => {
    if (pathnameRef.current !== location.pathname) {
      pathnameRef.current = location.pathname;
      closeMenuRef.current();
      setUserMenuOpen(false);
    }
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-header shadow-soft"
            : "bg-card border-b border-border",
        )}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo — large, borderless, plain img */}
            <Link
              to="/"
              className="flex items-center shrink-0"
              data-ocid="header.logo.link"
            >
              <img
                src="/assets/logo.png"
                alt="Forestheals"
                className="h-10 sm:h-14 lg:h-16 w-auto object-contain drop-shadow-md"
                style={{ maxWidth: "180px" }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              data-ocid="header.nav"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
                    location.pathname === link.to
                      ? "text-primary bg-primary/8"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted",
                  )}
                  data-ocid={`header.nav.${link.label.toLowerCase()}.link`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <a
                  href="/admin-p"
                  className="px-3 py-2 rounded-lg text-sm font-medium text-primary bg-primary/8 hover:bg-primary/15 transition-smooth"
                  data-ocid="header.nav.admin.link"
                >
                  Admin
                </a>
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <Link
                to="/products"
                className="p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted transition-smooth hidden sm:flex"
                aria-label="Search products"
                data-ocid="header.search.button"
              >
                <Search className="w-5 h-5" />
              </Link>

              {isLoggedIn && (
                <Link
                  to="/dashboard"
                  className="p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted transition-smooth hidden sm:flex"
                  aria-label="Wishlist"
                  data-ocid="header.wishlist.button"
                >
                  <Heart className="w-5 h-5" />
                </Link>
              )}

              <Link
                to="/cart"
                className="relative p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted transition-smooth"
                aria-label="Shopping cart"
                data-ocid="header.cart.button"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <Badge
                    className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-primary text-primary-foreground border-0"
                    data-ocid="header.cart.count"
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </Badge>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() =>
                    isLoggedIn ? setUserMenuOpen(!userMenuOpen) : login()
                  }
                  className="flex items-center gap-1 p-2 rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted transition-smooth"
                  aria-label="User account"
                  data-ocid="header.user.button"
                >
                  <User className="w-5 h-5" />
                  {isLoggedIn && (
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 transition-smooth",
                        userMenuOpen && "rotate-180",
                      )}
                    />
                  )}
                </button>
                <AnimatePresence>
                  {userMenuOpen && isLoggedIn && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 w-48 glass-card rounded-xl shadow-elevated overflow-hidden"
                      data-ocid="header.user.dropdown_menu"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted transition-smooth"
                        data-ocid="header.user.dashboard.link"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        My Dashboard
                      </Link>
                      {isAdmin && (
                        <a
                          href="/admin-p"
                          className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted transition-smooth text-primary"
                          data-ocid="header.user.admin.link"
                        >
                          <Shield className="w-4 h-4" />
                          Admin Panel
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-muted transition-smooth text-destructive"
                        data-ocid="header.user.logout.button"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!isLoggedIn && (
                <Button
                  size="sm"
                  onClick={login}
                  className="hidden sm:flex"
                  data-ocid="header.login.button"
                >
                  Sign In
                </Button>
              )}

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={toggleMenu}
                className="lg:hidden p-2.5 rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted transition-smooth min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
                data-ocid="header.mobile_menu.toggle"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMenu}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-72 bg-card border-r border-border shadow-elevated z-50 lg:hidden overflow-y-auto"
              data-ocid="header.mobile_menu.sheet"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <Link to="/" className="flex items-center">
                  <img
                    src="/assets/logo.png"
                    alt="Forestheals"
                    className="h-12 w-auto object-contain drop-shadow"
                  />
                </Link>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-1.5 rounded-lg hover:bg-muted"
                  data-ocid="header.mobile_menu.close_button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                      location.pathname === link.to
                        ? "text-primary bg-primary/8"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted",
                    )}
                    data-ocid={`header.mobile.${link.label.toLowerCase()}.link`}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAdmin && (
                  <a
                    href="/admin-p"
                    className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-primary bg-primary/8"
                    data-ocid="header.mobile.admin.link"
                  >
                    Admin Panel
                  </a>
                )}
              </nav>
              <div className="p-4 border-t border-border">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-smooth"
                      data-ocid="header.mobile.dashboard.link"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      My Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-smooth text-destructive"
                      data-ocid="header.mobile.logout.button"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Button
                    onClick={login}
                    className="w-full"
                    data-ocid="header.mobile.login.button"
                  >
                    Sign In with Internet Identity
                  </Button>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
