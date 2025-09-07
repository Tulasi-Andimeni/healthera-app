import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Heart, 
  Calendar, 
  Users, 
  MessageSquare,
  User,
  LogIn
} from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Heart },
    { name: 'Book Appointment', href: '/book', icon: Calendar },
    { name: 'Doctors', href: '/doctors', icon: Users },
    { name: 'Dashboard', href: '/dashboard', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-primary rounded-lg group-hover:shadow-glow transition-shadow">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">
                Health<span className="text-primary">Era</span>
              </h1>
              <p className="text-xs text-muted-foreground">Smart Hospital System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              className="transition-smooth hover:shadow-accent"
              asChild
            >
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </Button>
            <Button 
              size="sm" 
              className="gradient-accent text-accent-foreground hover:shadow-accent transition-all"
              asChild
            >
              <Link to="/book">Book Now</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center space-x-3 ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <div className="pt-4 mt-4 border-t border-border">
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <LogIn className="h-4 w-4 mr-3" />
                      Login
                    </Link>
                  </Button>
                  <Button className="gradient-accent text-accent-foreground justify-start" asChild>
                    <Link to="/book" onClick={() => setIsMobileMenuOpen(false)}>
                      <Calendar className="h-4 w-4 mr-3" />
                      Book Appointment
                    </Link>
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;