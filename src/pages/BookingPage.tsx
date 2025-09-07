import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChevronLeft, 
  ChevronRight, 
  CalendarIcon, 
  Clock, 
  User, 
  Stethoscope,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface FormData {
  // Step 1: Patient Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  symptoms: string;
  
  // Step 2: Doctor Selection
  department: string;
  doctorId: string;
  
  // Step 3: Date & Time
  date: Date | undefined;
  timeSlot: string;
}

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    symptoms: '',
    department: '',
    doctorId: '',
    date: undefined,
    timeSlot: ''
  });

  const departments = [
    'Cardiology',
    'Neurology', 
    'General Medicine',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'Gynecology',
    'Psychiatry'
  ];

  const doctors = {
    'Cardiology': [
      { id: '1', name: 'Dr. Sarah Johnson', experience: '15 years', rating: 4.9 },
      { id: '2', name: 'Dr. Michael Chen', experience: '12 years', rating: 4.8 }
    ],
    'Neurology': [
      { id: '3', name: 'Dr. Emily Rodriguez', experience: '18 years', rating: 4.9 },
      { id: '4', name: 'Dr. James Wilson', experience: '20 years', rating: 4.7 }
    ],
    'General Medicine': [
      { id: '5', name: 'Dr. Lisa Anderson', experience: '10 years', rating: 4.8 },
      { id: '6', name: 'Dr. Robert Taylor', experience: '14 years', rating: 4.6 }
    ]
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getSelectedDoctor = () => {
    const departmentDoctors = doctors[formData.department as keyof typeof doctors];
    return departmentDoctors?.find(doc => doc.id === formData.doctorId);
  };

  const handleSubmit = () => {
    // Handle form submission
    alert('Appointment booked successfully!');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Book Your Appointment</h1>
          <p className="text-muted-foreground mt-2">Complete the form below to schedule your consultation</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                    step <= currentStep
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step
                  )}
                </div>
                {step < 4 && (
                  <div
                    className={cn(
                      "flex-1 h-1 mx-4 rounded transition-all",
                      step < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 text-sm text-center">
            <span className={currentStep >= 1 ? "text-primary font-medium" : "text-muted-foreground"}>Patient Details</span>
            <span className={currentStep >= 2 ? "text-primary font-medium" : "text-muted-foreground"}>Doctor Selection</span>
            <span className={currentStep >= 3 ? "text-primary font-medium" : "text-muted-foreground"}>Date & Time</span>
            <span className={currentStep >= 4 ? "text-primary font-medium" : "text-muted-foreground"}>Confirmation</span>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto p-8 shadow-card">
          {/* Step 1: Patient Details */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-semibold">Patient Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateFormData('age', e.target.value)}
                    placeholder="Enter your age"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
                <Textarea
                  id="symptoms"
                  value={formData.symptoms}
                  onChange={(e) => updateFormData('symptoms', e.target.value)}
                  placeholder="Describe your symptoms or reason for the appointment..."
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Step 2: Doctor Selection */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center mb-6">
                <Stethoscope className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-semibold">Select Doctor</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select value={formData.department} onValueChange={(value) => updateFormData('department', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.department && (
                  <div className="space-y-4">
                    <Label>Available Doctors</Label>
                    <div className="grid gap-4">
                      {doctors[formData.department as keyof typeof doctors]?.map((doctor) => (
                        <Card
                          key={doctor.id}
                          className={cn(
                            "p-4 cursor-pointer transition-all hover:shadow-card border-2",
                            formData.doctorId === doctor.id
                              ? "border-primary shadow-glow"
                              : "border-border hover:border-primary/50"
                          )}
                          onClick={() => updateFormData('doctorId', doctor.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{doctor.name}</h3>
                              <p className="text-muted-foreground">{doctor.experience} experience</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-accent">
                                <span className="font-medium">★ {doctor.rating}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">Rating</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center mb-6">
                <CalendarIcon className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-semibold">Select Date & Time</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => updateFormData('date', date)}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {formData.date && (
                  <div className="space-y-4">
                    <Label>Available Time Slots</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={formData.timeSlot === time ? "default" : "outline"}
                          className={cn(
                            "text-sm transition-all",
                            formData.timeSlot === time
                              ? "bg-primary text-primary-foreground shadow-glow"
                              : "hover:border-primary hover:text-primary"
                          )}
                          onClick={() => updateFormData('timeSlot', time)}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-2xl font-semibold">Confirm Your Appointment</h2>
              </div>

              <div className="space-y-6">
                <Card className="p-6 gradient-card">
                  <h3 className="text-xl font-semibold mb-4">Appointment Summary</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm text-muted-foreground">Patient</Label>
                        <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Email</Label>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Phone</Label>
                        <p className="font-medium">{formData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm text-muted-foreground">Doctor</Label>
                        <p className="font-medium">{getSelectedDoctor()?.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Department</Label>
                        <p className="font-medium">{formData.department}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Date & Time</Label>
                        <p className="font-medium">
                          {formData.date && format(formData.date, "PPP")} at {formData.timeSlot}
                        </p>
                      </div>
                    </div>
                  </div>

                  {formData.symptoms && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <Label className="text-sm text-muted-foreground">Symptoms / Reason</Label>
                      <p className="font-medium mt-1">{formData.symptoms}</p>
                    </div>
                  )}
                </Card>

                <Button 
                  onClick={handleSubmit}
                  className="w-full gradient-accent text-accent-foreground hover:shadow-accent text-lg py-6"
                  size="lg"
                >
                  Confirm Appointment
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                className="flex items-center gradient-hero text-primary-foreground hover:shadow-glow"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;