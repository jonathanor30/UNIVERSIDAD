import { useState } from "react";
import { ViewType } from "../App";
import { toast } from "sonner@2.0.3";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Coffee, ArrowLeft, Mail, Lock, Eye, EyeOff, User, FileText, CheckCircle } from "lucide-react";

interface RegisterPageProps {
  onRegister: (name: string, email: string, password: string) => void;
  onNavigate: (view: ViewType) => void;
}

export function RegisterPage({ onRegister, onNavigate }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("El nombre es obligatorio");
      return false;
    }
    
    if (!formData.email.trim()) {
      toast.error("El correo electrónico es obligatorio");
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("El formato del correo electrónico no es válido");
      return false;
    }
    
    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return false;
    }
    
    if (!acceptTerms) {
      toast.error("Debes aceptar los términos y condiciones");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulación de registro
    setTimeout(() => {
      onRegister(formData.name, formData.email, formData.password);
      setIsLoading(false);
      toast.success("¡Usuario registrado exitosamente!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 coffee-gradient rounded-lg flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-primary">Cafetería Aroma</span>
            </div>
            
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-lg space-y-6">
          
          {/* Register Title */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 coffee-gradient rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Crear Cuenta
            </h1>
            <p className="text-muted-foreground">
              Únete al sistema de cafetería
            </p>
          </div>

          {/* Register Form */}
          <Card className="coffee-card">
            <CardHeader>
              <CardTitle>Información personal</CardTitle>
              <CardDescription>
                Completa los datos para crear tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Tu nombre completo"
                    disabled={isLoading}
                    className="coffee-input"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="usuario@email.com"
                    disabled={isLoading}
                    className="coffee-input"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="mínimo 6 caracteres"
                      disabled={isLoading}
                      className="coffee-input pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirmar contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="repite tu contraseña"
                      disabled={isLoading}
                      className="coffee-input pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <Card className="bg-secondary/50">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="terms"
                        checked={acceptTerms}
                        onCheckedChange={setAcceptTerms}
                        className="mt-1"
                      />
                      <div className="space-y-1">
                        <Label htmlFor="terms" className="flex items-center gap-2 text-sm font-medium">
                          <FileText className="w-4 h-4" />
                          Términos y condiciones
                        </Label>
                        <div className="text-xs text-muted-foreground">
                          Acepto los{" "}
                          <Button
                            type="button"
                            variant="link"
                            className="p-0 h-auto text-xs text-primary hover:underline"
                            onClick={() => toast.info("Términos y condiciones - Demo")}
                          >
                            términos y condiciones
                          </Button>
                          {" "}y la{" "}
                          <Button
                            type="button"
                            variant="link"
                            className="p-0 h-auto text-xs text-primary hover:underline"
                            onClick={() => toast.info("Política de privacidad - Demo")}
                          >
                            política de privacidad
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? "Procesando..." : "Crear cuenta"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Section */}
          <Card className="coffee-card">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Información del registro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Los usuarios se registran automáticamente como clientes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Acceso inmediato al catálogo de productos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Funcionalidad de carrito de compras</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Links */}
          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-primary hover:underline"
                onClick={() => onNavigate("login")}
              >
                Iniciar sesión
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Sistema Cafetería Aroma - Registro de usuarios
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}