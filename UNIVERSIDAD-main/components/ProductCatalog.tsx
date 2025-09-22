import { useState } from "react";
import { Product, User, ViewType } from "../App";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Coffee, Search, Filter, ShoppingCart, User as UserIcon, LogOut, Grid, List, Plus, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCatalogProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onNavigate: (view: ViewType) => void;
  user: User | null;
  onLogout: () => void;
}

const categoryLabels = {
  bebidas: "Bebidas",
  comidas: "Comidas", 
  postres: "Postres",
  snacks: "Snacks"
};

const categoryColors = {
  bebidas: "bg-blue-100 text-blue-800 border-blue-200",
  comidas: "bg-green-100 text-green-800 border-green-200", 
  postres: "bg-pink-100 text-pink-800 border-pink-200",
  snacks: "bg-orange-100 text-orange-800 border-orange-200"
};

const categoryIcons = {
  bebidas: "☕",
  comidas: "🍽️", 
  postres: "🍰",
  snacks: "🥨"
};

export function ProductCatalog({ products, onProductSelect, onNavigate, user, onLogout }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cart, setCart] = useState<Product[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const isAvailable = product.available;
    
    return matchesSearch && matchesCategory && isAvailable;
  });

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString('es-CO')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 coffee-gradient rounded-lg flex items-center justify-center">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary">Cafetería Aroma</h1>
                <p className="text-xs text-muted-foreground">Catálogo de productos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Cart */}
              <Button variant="outline" className="relative">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Carrito
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center bg-accent">
                    {cart.length}
                  </Badge>
                )}
              </Button>
              
              {/* User Menu */}
              {user && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md">
                    <UserIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                    {user.role === "admin" && (
                      <Badge variant="destructive" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </div>
                  {user.role === "admin" && (
                    <Button 
                      variant="default"
                      onClick={() => onNavigate("admin")}
                      className="bg-accent hover:bg-accent/90"
                    >
                      Panel Admin
                    </Button>
                  )}
                  <Button 
                    variant="ghost"
                    size="icon"
                    onClick={onLogout}
                    title="Cerrar sesión"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              {!user && (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onNavigate("login")}>
                    Ingresar
                  </Button>
                  <Button onClick={() => onNavigate("register")}>
                    Registrarse
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div 
          className="relative rounded-xl overflow-hidden mb-8"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1646681828239-843f5ed340de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzU4Mjk4NTQyfDA&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '200px'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Nuestro Menú</h1>
              <p className="text-lg text-white/90">Descubre nuestros deliciosos productos</p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="coffee-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 coffee-input"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    <SelectItem value="bebidas">☕ Bebidas</SelectItem>
                    <SelectItem value="comidas">🍽️ Comidas</SelectItem>
                    <SelectItem value="postres">🍰 Postres</SelectItem>
                    <SelectItem value="snacks">🥨 Snacks</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex border border-border rounded-md overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredProducts.length} productos encontrados
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <Card className="coffee-card">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
              <p className="text-muted-foreground">Intenta cambiar los filtros de búsqueda</p>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="coffee-card cursor-pointer group"
                onClick={() => onProductSelect(product)}
              >
                {viewMode === "grid" ? (
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-image"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className={categoryColors[product.category]}>
                          {categoryIcons[product.category]} {categoryLabels[product.category]}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="text-xs">4.8</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="price-tag text-lg">
                          {formatPrice(product.price)}
                        </span>
                        <Button 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Agregar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                ) : (
                  <CardContent className="p-4">
                    <div className="flex gap-4 items-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                              <Badge className={categoryColors[product.category]}>
                                {categoryIcons[product.category]} {categoryLabels[product.category]}
                              </Badge>
                              <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="text-xs">4.8</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {product.description}
                            </p>
                          </div>
                          <div className="text-right ml-4 flex flex-col items-end gap-2">
                            <span className="price-tag text-lg">
                              {formatPrice(product.price)}
                            </span>
                            <Button 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Agregar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}