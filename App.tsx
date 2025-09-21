import { useState } from "react";
import { ProductList } from "./components/ProductList";
import { ProductForm } from "./components/ProductForm";
import { HomePage } from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { ProductCatalog } from "./components/ProductCatalog";
import { ProductDetail } from "./components/ProductDetail";
import { AdminPage } from "./components/AdminPage";
import { Toaster } from "./components/ui/sonner";

export interface Product {
  id: string;
  name: string;
  category: "bebidas" | "comidas" | "postres" | "snacks";
  price: number;
  description: string;
  available: boolean;
  image?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "customer";
}

export type ViewType = "home" | "login" | "register" | "products" | "product-detail" | "admin";

// Datos iniciales de ejemplo
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Café Americano",
    category: "bebidas",
    price: 4500,
    description: "Café negro tradicional, fuerte y aromático",
    available: true,
    image: "https://images.unsplash.com/photo-1669872484166-e11b9638b50e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBhbWVyaWNhbm8lMjBibGFja3xlbnwxfHx8fDE3NTgzNzg3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    createdAt: new Date("2024-01-15")
  },
  {
    id: "2",
    name: "Cappuccino",
    category: "bebidas",
    price: 6500,
    description: "Café espresso con leche vaporizada y espuma cremosa",
    available: true,
    image: "https://images.unsplash.com/photo-1643909618082-d916d591c2a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwZm9hbSUyMGFydHxlbnwxfHx8fDE3NTgzNjA4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    createdAt: new Date("2024-01-15")
  },
  {
    id: "3",
    name: "Croissant de Jamón",
    category: "snacks",
    price: 8500,
    description: "Croissant francés relleno de jamón y queso",
    available: true,
    image: "https://images.unsplash.com/photo-1627915863490-74d51279f87b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBoYW0lMjBjaGVlc2V8ZW58MXx8fHwxNzU4Mzc4NzIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    createdAt: new Date("2024-01-16")
  },
  {
    id: "4",
    name: "Tiramisú",
    category: "postres",
    price: 12500,
    description: "Postre italiano con mascarpone y café",
    available: true,
    image: "https://images.unsplash.com/photo-1710106519622-8c49d0bcff2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnR8ZW58MXx8fHwxNzU4Mjc4MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    createdAt: new Date("2024-01-17")
  },
  {
    id: "5",
    name: "Sandwich Clásico",
    category: "comidas",
    price: 15500,
    description: "Sandwich de pollo con vegetales frescos",
    available: true,
    image: "https://images.unsplash.com/photo-1703219342329-fce8488cf443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzU4MjczOTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    createdAt: new Date("2024-01-18")
  },
  {
    id: "6",
    name: "Latte Vainilla",
    category: "bebidas",
    price: 7500,
    description: "Café latte con sirope de vainilla",
    available: true,
    image: "https://images.unsplash.com/photo-1683122925249-8b15d807db4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwbGF0dGUlMjBjb2ZmZWV8ZW58MXx8fHwxNzU4Mzc4NzIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    createdAt: new Date("2024-01-19")
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("home");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Simulación de login - en producción sería una llamada a API
    if (email === "admin@cafeteria.com" && password === "admin123") {
      setUser({
        id: "1",
        email: "admin@cafeteria.com",
        name: "Administrador",
        role: "admin"
      });
      setCurrentView("admin");
    } else {
      setUser({
        id: "2", 
        email: email,
        name: "Cliente",
        role: "customer"
      });
      setCurrentView("products");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("home");
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // Simulación de registro
    setUser({
      id: Date.now().toString(),
      email,
      name,
      role: "customer"
    });
    setCurrentView("products");
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView("product-detail");
  };

  const handleProductUpdate = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomePage onNavigate={setCurrentView} />;
      case "login":
        return <LoginPage onLogin={handleLogin} onNavigate={setCurrentView} />;
      case "register":
        return <RegisterPage onRegister={handleRegister} onNavigate={setCurrentView} />;
      case "products":
        return (
          <ProductCatalog 
            products={products}
            onProductSelect={handleProductSelect}
            onNavigate={setCurrentView}
            user={user}
            onLogout={handleLogout}
          />
        );
      case "product-detail":
        return (
          <ProductDetail 
            product={selectedProduct}
            onBack={() => setCurrentView("products")}
            onNavigate={setCurrentView}
            user={user}
            onLogout={handleLogout}
          />
        );
      case "admin":
        return (
          <AdminPage 
            products={products}
            onProductsUpdate={handleProductUpdate}
            onNavigate={setCurrentView}
            user={user}
            onLogout={handleLogout}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentView()}
      <Toaster />
    </div>
  );
}