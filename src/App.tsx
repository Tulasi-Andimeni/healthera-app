import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Layout/Header";
import FloatingChatBot from "@/components/Layout/FloatingChatBot";
import HomePage from "@/pages/HomePage";
import BookingPage from "@/pages/BookingPage";
import DoctorsPage from "@/pages/DoctorsPage";
import PatientDashboard from "@/pages/Dashboard/PatientDashboard";
import LoginPage from "@/pages/Auth/LoginPage";
import SignupPage from "@/pages/Auth/SignupPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Header />
                  <HomePage />
                  <FloatingChatBot />
                </>
              } 
            />
            <Route 
              path="/book" 
              element={
                <>
                  <Header />
                  <BookingPage />
                  <FloatingChatBot />
                </>
              } 
            />
            <Route 
              path="/doctors" 
              element={
                <>
                  <Header />
                  <DoctorsPage />
                  <FloatingChatBot />
                </>
              } 
            />
            <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
