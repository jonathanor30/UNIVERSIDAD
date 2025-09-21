import { Product } from "../App";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Pencil, Trash2, Coffee, UtensilsCrossed, Cookie, Sandwich } from "lucide-react";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const categoryLabels = {
  bebidas: "BEBIDAS",
  comidas: "COMIDAS", 
  postres: "POSTRES",
  snacks: "SNACKS"
};

export function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="border-2 dashed border-border p-8 text-center">
        <div className="wireframe-box w-16 h-16 mx-auto mb-4">[!]</div>
        <h3 className="mb-2 sketch-text">NO HAY PRODUCTOS REGISTRADOS</h3>
        <p className="text-muted-foreground text-sm">
          Comienza agregando tus primeros productos al menú.
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 dashed border-border">
      <div className="p-4 border-b-2 border-dashed border-border">
        <h3 className="sketch-text">PRODUCTOS DEL MENÚ</h3>
        <p className="text-muted-foreground text-sm">
          Gestiona todos los productos disponibles en tu cafetería
        </p>
      </div>
      
      <div className="p-2">
        {/* Encabezado de tabla - estilo wireframe */}
        <div className="grid grid-cols-6 gap-2 p-2 border-b border-dashed border-border text-xs sketch-text">
          <div>[PRODUCTO]</div>
          <div>[CATEGORÍA]</div>
          <div>[PRECIO]</div>
          <div>[ESTADO]</div>
          <div>[CREADO]</div>
          <div>[ACCIONES]</div>
        </div>
        
        {/* Lista de productos */}
        <div className="space-y-2">
          {products.map((product) => (
            <div key={product.id} className="grid grid-cols-6 gap-2 p-2 border-b border-dashed border-border hover:bg-secondary text-sm">
              <div>
                <div className="sketch-text">{product.name}</div>
                <div className="text-xs text-muted-foreground">
                  {product.description.substring(0, 30)}...
                </div>
              </div>
              
              <div>
                <span className="text-xs px-2 py-1 border dashed border-border bg-secondary">
                  {categoryLabels[product.category]}
                </span>
              </div>
              
              <div className="sketch-text">
                ${product.price.toLocaleString('es-ES')} COP
              </div>
              
              <div>
                <span className={`text-xs px-2 py-1 border dashed ${
                  product.available 
                    ? "border-green-500 bg-green-50 text-green-600" 
                    : "border-red-500 bg-red-50 text-red-600"
                }`}>
                  {product.available ? "✓ DISPONIBLE" : "✗ NO DISPONIBLE"}
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {product.createdAt.toLocaleDateString("es-ES")}
              </div>
              
              <div className="flex gap-1">
                <button
                  className="text-xs px-2 py-1 border dashed border-border bg-white hover:bg-secondary"
                  onClick={() => onEdit(product)}
                >
                  [✎ EDITAR]
                </button>
                
                <button
                  className="text-xs px-2 py-1 border dashed border-red-500 bg-red-50 text-red-600 hover:bg-red-100"
                  onClick={() => {
                    if (confirm(`¿Eliminar "${product.name}"?`)) {
                      onDelete(product.id);
                    }
                  }}
                >
                  [✗ ELIMINAR]
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}