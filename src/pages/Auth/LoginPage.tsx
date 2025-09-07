import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Heart,
  User,
  Stethoscope,
  Shield,
  ArrowLeft
} from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Redirect based on role
      if (role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    }, 2000);
  };

  const roles = [
    { value: 'patient', label: 'Patient', icon: User, description: 'Book and manage appointments' },
    { value: 'doctor', label: 'Doctor', icon: Stethoscope, description: 'Manage patient consultations' },
    { value: 'admin', label: 'Administrator', icon: Shield, description: 'System administration' }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <Card className="p-8 shadow-glow animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary rounded-full">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to access your HealthEra account</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-foreground mb-3 block">
              Select your role
            </Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="transition-smooth hover:border-primary">
                <SelectValue placeholder="Choose your account type" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((roleOption) => (
                  <SelectItem key={roleOption.value} value={roleOption.value}>
                    <div className="flex items-center space-x-3">
                      <roleOption.icon className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{roleOption.label}</div>
                        <div className="text-xs text-muted-foreground">{roleOption.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10 transition-smooth hover:border-primary focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 transition-smooth hover:border-primary focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-primary hover:text-primary-glow transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full gradient-hero text-primary-foreground hover:shadow-glow transition-all disabled:opacity-50"
              size="lg"
              disabled={isLoading || !role}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="mt-6">
            <Separator className="mb-6" />
            
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Don't have an account?
              </p>
              <Button
                variant="outline"
                className="w-full hover:border-primary hover:text-primary transition-all"
                asChild
              >
                <Link to="/signup">Create New Account</Link>
              </Button>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Patient:</strong> patient@demo.com | password123</p>
              <p><strong>Doctor:</strong> doctor@demo.com | password123</p>
              <p><strong>Admin:</strong> admin@demo.com | password123</p>
            </div>
          </div>
        </Card>

        {/* Emergency Access */}
        <Card className="mt-6 p-4 text-center gradient-accent">
          <h3 className="font-semibold text-accent-foreground mb-2">Medical Emergency?</h3>
          <p className="text-sm text-accent-foreground/80 mb-3">
            For immediate medical assistance, call our emergency hotline
          </p>
          <Button 
            className="bg-white text-accent hover:bg-white/90"
            size="sm"
          >
            Call 911
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;