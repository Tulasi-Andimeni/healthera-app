import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  User, 
  Bell,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Activity,
  Heart,
  Pill,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Appointment {
  id: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: string;
}

interface Prescription {
  id: string;
  doctorName: string;
  medication: string;
  dosage: string;
  duration: string;
  date: string;
  status: 'active' | 'completed';
}

const PatientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments');

  const appointments: Appointment[] = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialization: 'Cardiology',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'upcoming',
      location: 'Downtown Medical Center'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      specialization: 'Cardiology',
      date: '2024-01-10',
      time: '2:30 PM',
      status: 'completed',
      location: 'Central Hospital'
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Rodriguez',
      specialization: 'Neurology',
      date: '2024-01-08',
      time: '11:15 AM',
      status: 'cancelled',
      location: 'Neurological Institute'
    }
  ];

  const prescriptions: Prescription[] = [
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      medication: 'Lisinopril',
      dosage: '10mg once daily',
      duration: '30 days',
      date: '2024-01-10',
      status: 'active'
    },
    {
      id: '2',
      doctorName: 'Dr. Michael Chen',
      medication: 'Metformin',
      dosage: '500mg twice daily',
      duration: '90 days',
      date: '2024-01-05',
      status: 'active'
    }
  ];

  const sidebarItems = [
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      upcoming: { variant: 'default' as const, icon: Clock, color: 'text-primary' },
      completed: { variant: 'secondary' as const, icon: CheckCircle, color: 'text-secondary' },
      cancelled: { variant: 'destructive' as const, icon: XCircle, color: 'text-destructive' },
      active: { variant: 'default' as const, icon: Activity, color: 'text-primary' }
    };
    
    const config = variants[status as keyof typeof variants];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center space-x-1">
        <Icon className="h-3 w-3" />
        <span className="capitalize">{status}</span>
      </Badge>
    );
  };

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">My Appointments</h2>
        <Button className="gradient-hero text-primary-foreground hover:shadow-glow">
          <Calendar className="h-4 w-4 mr-2" />
          Book New Appointment
        </Button>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{appointment.doctorName}</h3>
                  <p className="text-muted-foreground">{appointment.specialization}</p>
                </div>
              </div>
              {getStatusBadge(appointment.status)}
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <span>{appointment.location}</span>
              </div>
            </div>

            {appointment.status === 'upcoming' && (
              <div className="flex space-x-2 mt-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm">Reschedule</Button>
                <Button variant="outline" size="sm">Cancel</Button>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPrescriptions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">My Prescriptions</h2>
      </div>

      <div className="grid gap-4">
        {prescriptions.map((prescription) => (
          <Card key={prescription.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-secondary/10 rounded-full">
                  <Pill className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{prescription.medication}</h3>
                  <p className="text-muted-foreground">Prescribed by {prescription.doctorName}</p>
                </div>
              </div>
              {getStatusBadge(prescription.status)}
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
              <div>
                <span className="text-muted-foreground">Dosage: </span>
                <span className="font-medium">{prescription.dosage}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Duration: </span>
                <span className="font-medium">{prescription.duration}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Date: </span>
                <span className="font-medium">{prescription.date}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">My Profile</h2>
      
      <Card className="p-6">
        <div className="flex items-center space-x-6 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-bold text-foreground">John Doe</h3>
            <p className="text-muted-foreground">Patient ID: #12345</p>
            <Button variant="outline" size="sm" className="mt-2">Update Photo</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-foreground">john.doe@example.com</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="text-foreground">+1 (555) 123-4567</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
              <p className="text-foreground">January 15, 1990</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Gender</label>
              <p className="text-foreground">Male</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
              <p className="text-foreground">Jane Doe - +1 (555) 987-6543</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Insurance</label>
              <p className="text-foreground">Blue Cross Blue Shield</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <Button className="gradient-accent text-accent-foreground hover:shadow-accent">
            Edit Profile
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
      
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">Appointment Reminder</h4>
              <p className="text-muted-foreground text-sm">Your appointment with Dr. Sarah Johnson is tomorrow at 10:00 AM</p>
              <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-secondary/10 rounded-full">
              <FileText className="h-4 w-4 text-secondary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">Lab Results Available</h4>
              <p className="text-muted-foreground text-sm">Your recent blood work results are now available to view</p>
              <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return renderAppointments();
      case 'prescriptions':
        return renderPrescriptions();
      case 'profile':
        return renderProfile();
      case 'notifications':
        return renderNotifications();
      default:
        return renderAppointments();
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform lg:transform-none",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary rounded-lg">
                  <Heart className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-bold text-foreground">HealthEra</h2>
                  <p className="text-xs text-muted-foreground">Patient Portal</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all",
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <Button variant="outline" className="w-full justify-start">
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold text-foreground">Dashboard</h1>
            <div className="w-8" /> {/* Spacer */}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 lg:p-8 animate-fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;