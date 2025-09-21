import { useState, useEffect } from "react";
import { Product } from "../App";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Card, CardContent } from "./ui/card";

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (data: Omit<Product, "id" | "createdAt">) => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  category: "bebidas" | "comidas" | "postres" | "snacks";
  price: string;
  description: string;
  available: boolean;
}

const initialFormData: FormData = {
  name: "",
  category: "bebidas",
  price: "",
  description: "",
  available: true
};

export function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Preenche o formulário quando editando um produto
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        description: product.description,
        available: product.available
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.price.trim()) {
      newErrors.price = "El precio es obligatorio";
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        newErrors.price = "El precio debe ser un valor válido mayor que cero";
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const productData = {
      name: formData.name.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description.trim(),
      available: formData.available
    };

    onSubmit(productData);
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpia el error del campo cuando el usuario comienza a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="border-2 dashed border-border p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div className="space-y-2">
          <label className="text-sm sketch-text">NOMBRE DEL PRODUCTO</label>
          <input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Ej: Café Americano"
            className={`w-full p-3 border-2 dashed border-border ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Categoria */}
        <div className="space-y-2">
          <label className="text-sm sketch-text">CATEGORÍA</label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value as any)}
            className="w-full p-3 border-2 dashed border-border"
          >
            <option value="bebidas">🍺 BEBIDAS</option>
            <option value="comidas">🍽 COMIDAS</option>
            <option value="postres">🍰 POSTRES</option>
            <option value="snacks">🥐 SNACKS</option>
          </select>
        </div>

        {/* Preço */}
        <div className="space-y-2">
          <label className="text-sm sketch-text">PRECIO (COP)</label>
          <input
            id="price"
            type="number"
            step="1"
            min="0"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            placeholder="0"
            className={`w-full p-3 border-2 dashed border-border ${errors.price ? "border-red-500" : ""}`}
          />
          {errors.price && (
            <p className="text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        {/* Descrição */}
        <div className="space-y-2">
          <label className="text-sm sketch-text">DESCRIPCIÓN</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe el producto..."
            className={`w-full p-3 border-2 dashed border-border ${errors.description ? "border-red-500" : ""}`}
            rows={3}
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Disponibilidade */}
        <div className="flex items-center space-x-2 border-2 dashed border-border p-3">
          <input
            type="checkbox"
            id="available"
            checked={formData.available}
            onChange={(e) => handleInputChange("available", e.target.checked)}
          />
          <label htmlFor="available" className="text-sm sketch-text">
            PRODUCTO DISPONIBLE PARA VENTA
          </label>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 pt-4">
          <button 
            type="button" 
            className="border-2 dashed border-border px-4 py-2 text-xs sketch-text" 
            onClick={onCancel}
          >
            [CANCELAR]
          </button>
          <button 
            type="submit"
            className="border-2 dashed border-primary bg-primary text-white px-4 py-2 text-xs sketch-text"
          >
            [{product ? "ACTUALIZAR" : "CREAR"} PRODUCTO]
          </button>
        </div>
      </form>
    </div>
  );
}