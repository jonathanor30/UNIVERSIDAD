import { useState, useEffect } from "react";
import { ViewType } from "../App";
import { Button } from "./ui/button";
import { Coffee, Menu, Users, ShieldCheck, Settings, Star, Rocket, Mail, Key, Globe, Smartphone } from "lucide-react";

interface HomePageProps {
  onNavigate: (view: ViewType) => void;
}

const sliderContent = [
  {
    title: "CAFETERÍA AROMA",
    subtitle: "Tu lugar favorito para el mejor café",
    description: "Ambiente acogedor y café de especialidad preparado con amor"
  },
  {
    title: "PRODUCTOS FRESCOS",
    subtitle: "Snacks, comidas y bebidas deliciosas",
    description: "Preparados diariamente con ingredientes frescos y de alta calidad"
  },
  {
    title: "ÚNETE HOY",
    subtitle: "Registrate y descubre nuestro menú",
    description: "Acceso completo al catálogo de productos y ofertas especiales"
  }
];

export function HomePage({ onNavigate }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderContent.length) % sliderContent.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navbar */}
      <header className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 coffee-gradient rounded-lg flex items-center justify-center">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Cafetería Aroma</h1>
                <p className="text-xs text-muted-foreground">Sistema de gestión</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button className="text-foreground hover:text-primary transition-colors">
                Inicio
              </button>
              <button 
                onClick={() => onNavigate("products")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Menú
              </button>
              <button className="text-foreground hover:text-primary transition-colors">
                Nosotros
              </button>
              <button className="text-foreground hover:text-primary transition-colors">
                Contacto
              </button>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => onNavigate("login")}
                className="hidden sm:flex"
              >
                Ingresar
              </Button>
              <Button 
                onClick={() => onNavigate("register")}
                className="bg-primary hover:bg-primary/90"
              >
                Registro
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Slider */}
      <section className="relative h-[500px] hero-section">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Slider Content */}
        <div className="relative h-full flex items-center justify-center text-center z-10">
          <div className="max-w-4xl mx-auto px-4 text-white">
            <div className="fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {sliderContent[currentSlide].title}
              </h1>
              <h2 className="text-xl md:text-2xl text-white/90 mb-4">
                {sliderContent[currentSlide].subtitle}
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                {sliderContent[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => onNavigate("products")}
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Ver Productos
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate("register")}
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Crear Cuenta
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          ◀
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          ▶
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
          {sliderContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">Nuestra Empresa</h2>
              <div className="space-y-4">
                <p className="text-foreground leading-relaxed text-lg">
                  Cafetería Aroma es un sistema completo de gestión para cafeterías que incluye 
                  tanto una vista pública para clientes como un panel de administración para gestionar productos.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Ofrecemos una experiencia completa con catálogo de productos, sistema de autenticación, 
                  carrito de compras y gestión administrativa. Todo diseñado para ser simple y funcional.
                </p>
              </div>
              <div className="mt-8">
                <Button 
                  size="lg"
                  onClick={() => onNavigate("products")}
                  className="bg-accent hover:bg-accent/90"
                >
                  Explorar Catálogo
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="coffee-card p-6 text-center">
                <Coffee className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-primary mb-2">Bebidas</h3>
                <p className="text-sm text-muted-foreground">Café, té y bebidas especiales</p>
              </div>
              <div className="coffee-card p-6 text-center">
                <Menu className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-semibold text-accent mb-2">Comidas</h3>
                <p className="text-sm text-muted-foreground">Snacks y comidas frescas</p>
              </div>
              <div className="coffee-card p-6 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                <h3 className="font-semibold text-orange-500 mb-2">Postres</h3>
                <p className="text-sm text-muted-foreground">Dulces y postres caseros</p>
              </div>
              <div className="coffee-card p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                <h3 className="font-semibold text-yellow-600 mb-2">Snacks</h3>
                <p className="text-sm text-muted-foreground">Aperitivos y bocadillos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Star className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-4xl font-bold text-primary mb-4">
              Características del Sistema
            </h2>
            <p className="text-muted-foreground text-lg">Funcionalidades completas para la gestión de tu cafetería</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="coffee-card p-8 text-center">
              <Users className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="text-xl font-semibold text-primary mb-4">Vista Pública</h3>
              <ul className="text-sm text-muted-foreground space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Catálogo de productos</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Filtros por categoría</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Detalles de productos</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Carrito de compras</span>
                </li>
              </ul>
            </div>

            <div className="coffee-card p-8 text-center">
              <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h3 className="text-xl font-semibold text-accent mb-4">Autenticación</h3>
              <ul className="text-sm text-muted-foreground space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Registro de usuarios</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Login con validación</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Roles de usuario</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Sesiones seguras</span>
                </li>
              </ul>
            </div>

            <div className="coffee-card p-8 text-center">
              <Settings className="w-16 h-16 mx-auto mb-6 text-orange-500" />
              <h3 className="text-xl font-semibold text-orange-500 mb-4">Administración</h3>
              <ul className="text-sm text-muted-foreground space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>CRUD de productos</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Gestión de categorías</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Control de inventario</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Panel administrativo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 coffee-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Estadísticas del Sistema
            </h2>
            <p className="text-white/90 text-lg">Números que respaldan nuestra propuesta</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-xl font-semibold mb-2">Productos</div>
              <p className="text-sm text-white/80">En el catálogo inicial</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <div className="text-4xl font-bold mb-2">4</div>
              <div className="text-xl font-semibold mb-2">Categorías</div>
              <p className="text-sm text-white/80">Bebidas, comidas, postres, snacks</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <div className="text-4xl font-bold mb-2">2</div>
              <div className="text-xl font-semibold mb-2">Roles</div>
              <p className="text-sm text-white/80">Administrador y cliente</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-xl font-semibold mb-2">Vistas</div>
              <p className="text-sm text-white/80">Sistema completo implementado</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Rocket className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-5xl font-bold mb-6">¿Listo para comenzar?</h2>
            <p className="text-xl mb-8 text-white/90">
              Únete al sistema de Cafetería Aroma y explora todas las funcionalidades 
              de nuestro sistema completo de gestión.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => onNavigate("register")}
                className="bg-white text-accent hover:bg-white/90"
              >
                Registrarse Ahora
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate("products")}
                className="border-white text-white hover:bg-white hover:text-accent"
              >
                Ver Catálogo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 coffee-gradient rounded-lg flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Cafetería Aroma</h3>
                  <p className="text-xs text-white/75">Sistema de gestión</p>
                </div>
              </div>
              <p className="text-sm text-white/75 leading-relaxed">
                Sistema completo para cafetería con gestión 
                de productos y autenticación de usuarios.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold text-white mb-4">Navegación</h4>
              <ul className="space-y-2">
                <li>
                  <button className="text-sm text-white/75 hover:text-white transition-colors">
                    Inicio
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate("products")}
                    className="text-sm text-white/75 hover:text-white transition-colors"
                  >
                    Productos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate("login")}
                    className="text-sm text-white/75 hover:text-white transition-colors"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate("register")}
                    className="text-sm text-white/75 hover:text-white transition-colors"
                  >
                    Registro
                  </button>
                </li>
              </ul>
            </div>

            {/* System Info */}
            <div>
              <h4 className="font-semibold text-white mb-4">Sistema</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-white/75">Vista pública</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-white/75">Panel admin</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-white/75">Autenticación</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-white/75">CRUD productos</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Demo</h4>
              <div className="space-y-3 text-sm text-white/75">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>admin@cafeteria.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  <span>admin123 (Admin)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Sistema en Español</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Diseño responsivo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-white/75">
                © 2024 Cafetería Aroma - Sistema de Gestión
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <button className="text-sm text-white/75 hover:text-white transition-colors">
                  Términos
                </button>
                <button className="text-sm text-white/75 hover:text-white transition-colors">
                  Privacidad
                </button>
                <button className="text-sm text-white/75 hover:text-white transition-colors">
                  Soporte
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}