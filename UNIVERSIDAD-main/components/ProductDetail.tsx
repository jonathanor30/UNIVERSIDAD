import { useState } from "react";
import { Product, User, ViewType } from "../App";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Coffee, ArrowLeft, ShoppingCart, Heart, Share2, Star, Clock, Users, Minus, Plus, UserIcon, LogOut } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ProductDetailProps {
  product: Product | null;
  onBack: () => void;
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

// Datos simulados adicionales para el producto
const getProductDetails = (product: Product) => {
  const baseDetails = {
    rating: 4.8,
    reviews: Math.floor(Math.random() * 100) + 20,
    preparationTime: Math.floor(Math.random() * 10) + 5,
    ingredients: [] as string[],
    nutritionalInfo: {
      calories: Math.floor(Math.random() * 300) + 100,
      protein: Math.floor(Math.random() * 15) + 2,
      carbs: Math.floor(Math.random() * 40) + 10,
      fat: Math.floor(Math.random() * 20) + 2
    }
  };

  // Ingredientes según categoría
  switch (product.category) {
    case "bebidas":
      baseDetails.ingredients = ["Café premium", "Agua filtrada", "Leche fresca", "Azúcar"];
      break;
    case "comidas":
      baseDetails.ingredients = ["Pan artesanal", "Pollo orgánico", "Vegetales frescos", "Queso", "Salsas caseras"];
      break;
    case "postres":
      baseDetails.ingredients = ["Mascarpone", "Café espresso", "Bizcochos", "Cacao", "Huevos frescos"];
      break;
    case "snacks":
      baseDetails.ingredients = ["Harina francesa", "Mantequilla", "Jamón premium", "Queso gruyere"];
      break;
  }

  return baseDetails;
};

export function ProductDetail({ product, onBack, onNavigate, user, onLogout }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="coffee-card">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Producto no encontrado</h2>
            <Button onClick={onBack} className="bg-primary hover:bg-primary/90">
              Volver al catálogo
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const details = getProductDetails(product);
  const formatPrice = (price: number) => `$${price.toLocaleString('es-CO')}`;

  const handleAddToCart = () => {
    toast.success(`${quantity}x ${product.name} agregado al carrito`);
  };

  const handleShare = () => {
    toast.info("Funcionalidad de compartir disponible próximamente");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 coffee-gradient rounded-lg flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-primary">Cafetería Aroma</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className={isFavorite ? "text-red-500" : ""}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              
              {/* User info */}
              {user && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md">
                    <UserIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
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
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Imagen del producto */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={categoryColors[product.category]}>
                  {categoryLabels[product.category]}
                </Badge>
              </div>
            </div>
            
            {/* Galería simulada */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                  <span className="text-xs text-muted-foreground">Vista {i}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Información del producto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className={categoryColors[product.category]}>
                  {categoryLabels[product.category]}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-medium">{details.rating}</span>
                  <span className="text-sm text-muted-foreground">({details.reviews} reseñas)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-muted-foreground text-lg mb-6">{product.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{details.preparationTime} minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Muy popular</span>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-primary mb-8">
                {formatPrice(product.price)}
              </div>
            </div>

            <Separator />

            {/* Selector de cantidad */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Cantidad:</span>
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="rounded-none"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 border-x border-border font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-none"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <Button 
                onClick={handleAddToCart} 
                className="flex-1 bg-primary hover:bg-primary/90"
                size="lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Agregar al carrito - {formatPrice(product.price * quantity)}
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Comprar ahora
              </Button>
            </div>

            <Separator />

            {/* Ingredientes */}
            <Card className="coffee-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Ingredientes</h3>
                <div className="flex flex-wrap gap-2">
                  {details.ingredients.map((ingredient, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Información nutricional */}
            <Card className="coffee-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Información nutricional</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-2xl font-bold text-primary">{details.nutritionalInfo.calories}</div>
                    <div className="text-sm text-muted-foreground">Calorías</div>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-2xl font-bold text-primary">{details.nutritionalInfo.protein}g</div>
                    <div className="text-sm text-muted-foreground">Proteína</div>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-2xl font-bold text-primary">{details.nutritionalInfo.carbs}g</div>
                    <div className="text-sm text-muted-foreground">Carbohidratos</div>
                  </div>
                  <div className="text-center p-4 bg-secondary rounded-lg">
                    <div className="text-2xl font-bold text-primary">{details.nutritionalInfo.fat}g</div>
                    <div className="text-sm text-muted-foreground">Grasas</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Productos relacionados */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Productos relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="coffee-card cursor-pointer group">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Producto {i}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      Producto Relacionado {i}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Descripción del producto relacionado...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="price-tag">$12,500</span>
                      <Button size="sm" variant="outline">Ver</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}