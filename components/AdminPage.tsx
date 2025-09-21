import { useState } from "react";
import { Product, User, ViewType } from "../App";
import { ProductList } from "./ProductList";
import { ProductForm } from "./ProductForm";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { PlusCircle, Coffee, BarChart3, Users, Package, LogOut, Eye, TrendingUp, UserIcon, Download } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface AdminPageProps {
  products: Product[];
  onProductsUpdate: (products: Product[]) => void;
  onNavigate: (view: ViewType) => void;
  user: User | null;
  onLogout: () => void;
}

export function AdminPage({ products, onProductsUpdate, onNavigate, user, onLogout }: AdminPageProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleCreateProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    
    const updatedProducts = [...products, newProduct];
    onProductsUpdate(updatedProducts);
    setIsDialogOpen(false);
    toast.success("Producto creado exitosamente");
  };

  const handleUpdateProduct = (id: string, productData: Omit<Product, "id" | "createdAt">) => {
    const updatedProducts = products.map(product => 
      product.id === id 
        ? { ...product, ...productData }
        : product
    );
    onProductsUpdate(updatedProducts);
    setEditingProduct(null);
    setIsDialogOpen(false);
    toast.success("Producto actualizado exitosamente");
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    onProductsUpdate(updatedProducts);
    toast.success("Producto eliminado exitosamente");
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleExportReports = () => {
    toast.info("Función de exportar reportes disponible próximamente");
  };

  // Estadísticas calculadas
  const stats = {
    totalProducts: products.length,
    availableProducts: products.filter(p => p.available).length,
    unavailableProducts: products.filter(p => !p.available).length,
    categories: {
      bebidas: products.filter(p => p.category === "bebidas").length,
      comidas: products.filter(p => p.category === "comidas").length,
      postres: products.filter(p => p.category === "postres").length,
      snacks: products.filter(p => p.category === "snacks").length,
    },
    averagePrice: products.length > 0 
      ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length)
      : 0
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 coffee-gradient rounded-lg flex items-center justify-center">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary">Panel Administrativo</h1>
                <p className="text-xs text-muted-foreground">Cafetería Aroma - Gestión</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => onNavigate("products")}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Ver Catálogo
              </Button>
              
              {user && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md">
                    <UserIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{user.name}</span>
                    <Badge variant="destructive" className="text-xs">Admin</Badge>
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
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bienvenido al Panel Administrativo
            </h1>
            <p className="text-muted-foreground">
              Gestiona tu cafetería de manera eficiente y profesional
            </p>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="coffee-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Total Productos</span>
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">{stats.totalProducts}</div>
                <p className="text-sm text-muted-foreground">
                  {stats.availableProducts} disponibles
                </p>
              </CardContent>
            </Card>

            <Card className="coffee-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Precio Promedio</span>
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div className="text-3xl font-bold text-primary">${stats.averagePrice}</div>
                <p className="text-sm text-muted-foreground">
                  Por producto
                </p>
              </CardContent>
            </Card>

            <Card className="coffee-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Disponibles</span>
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-3xl font-bold text-green-600">{stats.availableProducts}</div>
                <p className="text-sm text-muted-foreground">
                  {stats.totalProducts > 0 ? Math.round((stats.availableProducts / stats.totalProducts) * 100) : 0}% del total
                </p>
              </CardContent>
            </Card>

            <Card className="coffee-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">No Disponibles</span>
                  <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                </div>
                <div className="text-3xl font-bold text-red-600">{stats.unavailableProducts}</div>
                <p className="text-sm text-muted-foreground">
                  Requieren atención
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Category Distribution */}
          <Card className="coffee-card">
            <CardHeader>
              <CardTitle>Distribución por Categorías</CardTitle>
              <CardDescription>
                Productos organizados por tipo de categoría
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stats.categories.bebidas}</div>
                  <div className="text-sm font-medium text-blue-800">☕ Bebidas</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">{stats.categories.comidas}</div>
                  <div className="text-sm font-medium text-green-800">🍽️ Comidas</div>
                </div>
                <div className="text-center p-6 bg-pink-50 rounded-lg">
                  <div className="text-3xl font-bold text-pink-600 mb-2">{stats.categories.postres}</div>
                  <div className="text-sm font-medium text-pink-800">🍰 Postres</div>
                </div>
                <div className="text-center p-6 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{stats.categories.snacks}</div>
                  <div className="text-sm font-medium text-orange-800">🥨 Snacks</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="coffee-card">
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>
                Herramientas principales para gestionar tu cafetería
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Nuevo Producto
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>
                        {editingProduct ? "Editar Producto" : "Nuevo Producto"}
                      </DialogTitle>
                    </DialogHeader>
                    <ProductForm
                      product={editingProduct}
                      onSubmit={editingProduct 
                        ? (data) => handleUpdateProduct(editingProduct.id, data)
                        : handleCreateProduct
                      }
                      onCancel={handleCloseDialog}
                    />
                  </DialogContent>
                </Dialog>

                <Button 
                  variant="outline"
                  onClick={() => onNavigate("products")}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Ver Catálogo Público
                </Button>

                <Button 
                  variant="outline"
                  onClick={handleExportReports}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Exportar Reportes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Product Management */}
          <Card className="coffee-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Gestión de Productos</CardTitle>
                  <CardDescription>
                    Administra el catálogo completo de tu cafetería
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {stats.totalProducts} productos
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ProductList
                products={products}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}