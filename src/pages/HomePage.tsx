import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Calendar, 
  Users, 
  Clock, 
  Shield, 
  Heart, 
  Stethoscope,
  Activity,
  Star,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import heroImage from '@/assets/hero-medical.jpg';

const HomePage = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book appointments with just a few clicks. Available 24/7 online.'
    },
    {
      icon: Users,
      title: 'Expert Doctors',
      description: 'Connect with certified specialists and experienced physicians.'
    },
    {
      icon: Clock,
      title: 'Quick Service',
      description: 'Fast appointment scheduling and minimal waiting times.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your medical data is protected with advanced encryption.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Patients' },
    { number: '500+', label: 'Expert Doctors' },
    { number: '50+', label: 'Specializations' },
    { number: '24/7', label: 'Support Available' }
  ];

  const specializations = [
    { name: 'Cardiology', icon: Heart, color: 'text-red-500' },
    { name: 'Neurology', icon: Activity, color: 'text-blue-500' },
    { name: 'General Medicine', icon: Stethoscope, color: 'text-green-500' },
    { name: 'Pediatrics', icon: Users, color: 'text-purple-500' },
    { name: 'Orthopedics', icon: Shield, color: 'text-orange-500' },
    { name: 'Dermatology', icon: Star, color: 'text-pink-500' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Smart Hospital 
                <span className="block text-accent-glow">Appointment System</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Book, manage, and track your appointments with AI assistance. 
                Connect with the best doctors and get the care you deserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 hover:shadow-glow transition-all text-lg px-8 py-4"
                  asChild
                >
                  <Link to="/book">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary transition-all text-lg px-8 py-4"
                  asChild
                >
                  <Link to="/doctors">
                    <Users className="mr-2 h-5 w-5" />
                    Find Doctors
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-float">
              <img
                src={heroImage}
                alt="Professional medical team"
                className="rounded-2xl shadow-glow w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float" style={{animationDelay: '1s'}}>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{animationDelay: '2s'}}>
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose HealthEra?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience modern healthcare with our advanced appointment system designed for your convenience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 card-hover gradient-card border-0">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Medical Specializations
            </h2>
            <p className="text-xl text-muted-foreground">
              Find specialists across all major medical fields
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specializations.map((spec, index) => (
              <Card key={index} className="p-6 text-center card-hover cursor-pointer">
                <spec.icon className={`h-12 w-12 mx-auto mb-4 ${spec.color}`} />
                <h3 className="font-semibold text-foreground">{spec.name}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust HealthEra for their healthcare needs. 
            Book your first appointment today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-accent hover:bg-white/90 text-lg px-8 py-4"
              asChild
            >
              <Link to="/book">Start Booking Now</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-accent text-lg px-8 py-4"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Info Footer */}
      <footer className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span className="text-muted-foreground">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span className="text-muted-foreground">info@healthera.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <span className="text-muted-foreground">123 Medical Center Dr.</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/doctors" className="block text-muted-foreground hover:text-primary transition-colors">Find Doctors</Link>
                <Link to="/book" className="block text-muted-foreground hover:text-primary transition-colors">Book Appointment</Link>
                <Link to="/dashboard" className="block text-muted-foreground hover:text-primary transition-colors">Patient Portal</Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Emergency</h3>
              <p className="text-muted-foreground mb-4">24/7 Emergency Services Available</p>
              <Button className="gradient-hero text-primary-foreground hover:shadow-glow">
                <Phone className="mr-2 h-4 w-4" />
                Call Emergency
              </Button>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 HealthEra. All rights reserved. | Modern Healthcare Technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;