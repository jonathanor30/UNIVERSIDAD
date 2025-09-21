import { useState } from "react";
import { ViewType } from "../App";
import { toast } from "sonner@2.0.3";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Coffee, ArrowLeft, Mail, Lock, Eye, EyeOff, Shield, User } from "lucide-react";

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onNavigate: (view: ViewType) => void;
}

export function LoginPage({ onLogin, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor, completa todos los campos");
      return;
    }

    setIsLoading(true);
    
    // Simulación de carga
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
      toast.success("¡Acceso autorizado!");
    }, 1000);
  };

  const fillAdminCredentials = () => {
    setEmail("admin@cafeteria.com");
    setPassword("admin123");
  };

  const fillCustomerCredentials = () => {
    setEmail("cliente@ejemplo.com");
    setPassword("cliente123");
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
        <div className="w-full max-w-md space-y-6">
          
          {/* Login Title */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 coffee-gradient rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Iniciar Sesión
            </h1>
            <p className="text-muted-foreground">
              Acceso al sistema de cafetería
            </p>
          </div>

          {/* Login Form */}
          <Card className="coffee-card">
            <CardHeader>
              <CardTitle>Credenciales de acceso</CardTitle>
              <CardDescription>
                Ingresa tu email y contraseña para continuar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="•••••••••"
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

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? "Verificando..." : "Entrar al Sistema"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Accounts */}
          <Card className="coffee-card">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Cuentas de Prueba</CardTitle>
              <CardDescription>
                Haz clic para usar credenciales de demostración
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={fillAdminCredentials}
                disabled={isLoading}
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold text-primary">Administrador</div>
                    <div className="text-xs text-muted-foreground">
                      admin@cafeteria.com / admin123
                    </div>
                  </div>
                </div>
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start text-left"
                onClick={fillCustomerCredentials}
                disabled={isLoading}
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-accent" />
                  <div>
                    <div className="font-semibold text-accent">Cliente</div>
                    <div className="text-xs text-muted-foreground">
                      cualquier email y contraseña válidos
                    </div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Navigation Links */}
          <div className="text-center space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast.info("Funcionalidad no implementada en la demostración")}
              className="text-muted-foreground hover:text-primary"
            >
              ¿Olvidaste tu contraseña?
            </Button>
            
            <div className="text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-primary hover:underline"
                onClick={() => onNavigate("register")}
              >
                Crear cuenta
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Sistema Cafetería Aroma - Demo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}