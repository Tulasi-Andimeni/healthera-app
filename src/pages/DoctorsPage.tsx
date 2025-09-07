import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  MapPin, 
  Phone,
  Mail,
  Clock,
  Award,
  Users,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  email: string;
  availability: string[];
  languages: string[];
  education: string;
  image: string;
  consultationFee: string;
}

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      experience: '15 years',
      rating: 4.9,
      reviews: 324,
      location: 'Downtown Medical Center',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@healthera.com',
      availability: ['Mon', 'Tue', 'Wed', 'Fri'],
      languages: ['English', 'Spanish'],
      education: 'Harvard Medical School',
      image: '👩‍⚕️',
      consultationFee: '$200'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialization: 'Cardiology',
      experience: '12 years',
      rating: 4.8,
      reviews: 287,
      location: 'Central Hospital',
      phone: '+1 (555) 234-5678',
      email: 'michael.chen@healthera.com',
      availability: ['Mon', 'Wed', 'Thu', 'Sat'],
      languages: ['English', 'Mandarin'],
      education: 'Johns Hopkins University',
      image: '👨‍⚕️',
      consultationFee: '$180'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialization: 'Neurology',
      experience: '18 years',
      rating: 4.9,
      reviews: 412,
      location: 'Neurological Institute',
      phone: '+1 (555) 345-6789',
      email: 'emily.rodriguez@healthera.com',
      availability: ['Tue', 'Thu', 'Fri', 'Sat'],
      languages: ['English', 'Spanish', 'Portuguese'],
      education: 'Mayo Clinic College',
      image: '👩‍⚕️',
      consultationFee: '$250'
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialization: 'Orthopedics',
      experience: '20 years',
      rating: 4.7,
      reviews: 298,
      location: 'Sports Medicine Center',
      phone: '+1 (555) 456-7890',
      email: 'james.wilson@healthera.com',
      availability: ['Mon', 'Tue', 'Thu', 'Fri'],
      languages: ['English'],
      education: 'Stanford Medical School',
      image: '👨‍⚕️',
      consultationFee: '$220'
    },
    {
      id: '5',
      name: 'Dr. Lisa Anderson',
      specialization: 'Pediatrics',
      experience: '10 years',
      rating: 4.8,
      reviews: 356,
      location: "Children's Hospital",
      phone: '+1 (555) 567-8901',
      email: 'lisa.anderson@healthera.com',
      availability: ['Mon', 'Wed', 'Fri', 'Sat'],
      languages: ['English', 'French'],
      education: 'UCLA Medical Center',
      image: '👩‍⚕️',
      consultationFee: '$160'
    },
    {
      id: '6',
      name: 'Dr. Robert Taylor',
      specialization: 'Dermatology',
      experience: '14 years',
      rating: 4.6,
      reviews: 189,
      location: 'Skin Care Clinic',
      phone: '+1 (555) 678-9012',
      email: 'robert.taylor@healthera.com',
      availability: ['Tue', 'Wed', 'Thu', 'Sat'],
      languages: ['English', 'German'],
      education: 'Columbia University',
      image: '👨‍⚕️',
      consultationFee: '$190'
    }
  ];

  const departments = [
    'All Departments',
    'Cardiology',
    'Neurology', 
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'General Medicine',
    'Gynecology'
  ];

  const locations = [
    'All Locations',
    'Downtown Medical Center',
    'Central Hospital',
    'Neurological Institute',
    'Sports Medicine Center',
    "Children's Hospital",
    'Skin Care Clinic'
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || 
                             selectedDepartment === 'All Departments' ||
                             doctor.specialization === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || 
                           selectedLocation === 'All Locations' ||
                           doctor.location === selectedLocation;
    
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Our Expert Doctors</h1>
          <p className="text-xl text-muted-foreground">Find the right specialist for your healthcare needs</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8 shadow-card">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by doctor name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} 
            {(selectedDepartment !== 'all' && selectedDepartment !== 'All Departments') && ` in ${selectedDepartment}`}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden card-hover shadow-card">
              <div className="p-6">
                {/* Doctor Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                      {doctor.image}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{doctor.name}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {doctor.specialization}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Rating & Reviews */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center text-accent">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium ml-1">{doctor.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({doctor.reviews} reviews)
                  </span>
                </div>

                {/* Doctor Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Award className="h-4 w-4 mr-2" />
                    <span>{doctor.experience} experience</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{doctor.location}</span>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{doctor.education}</span>
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Available Days:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.availability.map((day) => (
                      <Badge key={day} variant="outline" className="text-xs">
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-foreground mb-2">Languages:</p>
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.map((lang) => (
                      <Badge key={lang} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Consultation Fee */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-muted-foreground">Consultation Fee:</span>
                  <span className="text-lg font-semibold text-primary">{doctor.consultationFee}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full gradient-hero text-primary-foreground hover:shadow-glow"
                    asChild
                  >
                    <Link to="/book">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Link>
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:border-primary hover:text-primary"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:border-primary hover:text-primary"
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <Card className="p-12 text-center">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Doctors Found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or browse all available doctors
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedDepartment('all');
                setSelectedLocation('all');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </Card>
        )}

        {/* Emergency Contact */}
        <Card className="mt-12 p-8 gradient-accent text-center">
          <h3 className="text-2xl font-bold text-accent-foreground mb-4">
            Need Immediate Medical Attention?
          </h3>
          <p className="text-accent-foreground/80 mb-6">
            For medical emergencies, contact our 24/7 emergency services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-accent hover:bg-white/90 hover:shadow-accent"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Emergency: 911
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-accent"
            >
              <Clock className="h-5 w-5 mr-2" />
              24/7 Helpline
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorsPage;