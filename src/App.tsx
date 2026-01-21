import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  Recycle,
  Factory,
  Phone,
  FileText,
  Mail,
  ShieldCheck,
  Clock,
  Leaf,
  MapPin,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Droplet,
  Target,
  Heart,
} from "lucide-react";

/* -------------------- Local UI Primitives -------------------- */

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`rounded-3xl shadow-2xl border border-green-100/50 bg-white hover:shadow-green-100 transition-all duration-200 overflow-hidden group ${className}`}
    >
      {children}
    </motion.div>
  );
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-10">{children}</div>;
}

function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "white";
  type?: "button" | "submit";
}) {
  const baseClasses =
    "px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-bold transition-all duration-150 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base";
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white hover:from-green-700 hover:via-green-600 hover:to-emerald-700 shadow-green-200",
    secondary:
      "bg-white text-green-700 border-3 border-green-600 hover:bg-green-50 shadow-green-100",
    ghost:
      "bg-white/10 backdrop-blur-md text-white border-2 border-white/50 hover:bg-white hover:text-green-700",
    white: "bg-white text-green-700 hover:bg-green-50 shadow-xl",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}

/* -------------------- Router Types -------------------- */

type Route = "home" | "services" | "fresh-oil" | "compliance" | "contact";

/* -------------------- Layout -------------------- */

function Navbar({
  navigate,
  currentRoute,
}: {
  navigate: (r: Route) => void;
  currentRoute: Route;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems: { route: Route; label: string }[] = [
    { route: "home", label: "Home" },
    { route: "services", label: "Used Oil Collection" },
    { route: "fresh-oil", label: "Fresh Oil Supply" },
    { route: "compliance", label: "Compliance" },
    { route: "contact", label: "Contact" },
  ];

  const handleNavigation = (route: Route) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/98 backdrop-blur-xl border-b border-green-100 sticky top-0 z-50 shadow-lg shadow-green-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer flex items-center gap-2 sm:gap-3"
          onClick={() => handleNavigation("home")}
        >
          <img
            src="/images/logo.jpeg"
            alt="Ajil's Oils Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl object-contain shadow-lg"
          />
          <span className="text-xl sm:text-3xl font-black bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 bg-clip-text text-transparent">
            Ajil's Oils
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-10 text-sm font-bold">
          {navItems.map((item) => (
            <motion.button
              key={item.route}
              onClick={() => navigate(item.route)}
              className={`relative py-2 transition-colors ${
                currentRoute === item.route
                  ? "text-green-700"
                  : "text-gray-600 hover:text-green-600"
              }`}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
              {currentRoute === item.route && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-green-600 via-green-500 to-emerald-600"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-600 hover:text-green-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-green-100 bg-white"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.route}
                  onClick={() => handleNavigation(item.route)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-bold transition-colors ${
                    currentRoute === item.route
                      ? "bg-green-50 text-green-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white mt-16 sm:mt-32 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-96 h-96 bg-green-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/images/logo.jpeg"
              alt="Ajil's Oils Logo"
              className="w-10 h-10 rounded-xl object-contain bg-white/10 backdrop-blur-sm"
            />
            <h3 className="text-2xl font-black text-white">Ajil's Oils</h3>
          </div>
          <p className="text-sm leading-relaxed text-green-100">
            Your trusted partner for professional cooking oil management. Fast, flexible service when you need it. Sustainable, compliant, reliable.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <h4 className="text-white font-bold mb-6 text-lg">Services</h4>
          <ul className="space-y-4 text-sm text-green-100">
            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Used Oil Collection
            </li>
            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Fresh Oil Supply
            </li>
            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Compliance Support
            </li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h4 className="text-white font-bold mb-6 text-lg">Industries</h4>
          <ul className="space-y-4 text-sm text-green-100">
            <li className="hover:text-white transition-colors">Restaurants</li>
            <li className="hover:text-white transition-colors">Takeaways</li>
            <li className="hover:text-white transition-colors">Food Manufacturers</li>
            <li className="hover:text-white transition-colors">Hospitality Groups</li>
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <h4 className="text-white font-bold mb-6 text-lg">Get in Touch</h4>
          <div className="space-y-4 text-sm text-green-100">
            <p className="hover:text-white transition-colors cursor-pointer flex items-center gap-3">
              <Mail className="w-4 h-4 text-green-400" />
              info@ajilsoils.com
            </p>
            <p className="hover:text-white transition-colors flex items-center gap-3">
              <Phone className="w-4 h-4 text-green-400" />
              +44 XXXX XXXXXX
            </p>
            <p className="hover:text-white transition-colors flex items-center gap-3">
              <MapPin className="w-4 h-4 text-green-400" />
              United Kingdom
            </p>
          </div>
        </motion.div>
      </div>
      
      <div className="border-t border-green-700/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs sm:text-sm text-green-200 text-center sm:text-left">
          <p>© 2024 Ajil's Oils. All rights reserved.</p>
          <p>Building a sustainable future, one drop at a time.</p>
        </div>
      </div>
    </footer>
  );
}

function PageWrapper({
  children,
  navigate,
  currentRoute,
}: {
  children: React.ReactNode;
  navigate: (r: Route) => void;
  currentRoute: Route;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-white to-emerald-50/30 text-gray-900 flex flex-col">
      <Navbar navigate={navigate} currentRoute={currentRoute} />
      <AnimatePresence mode="wait">
        <motion.main
          key={currentRoute}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="flex-grow"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

/* -------------------- Pages -------------------- */

function HomePage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-emerald-600">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 md:py-40">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 border border-white/30">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-white font-bold text-xs sm:text-sm">Delivery Within 1-2 Days When You Need It</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-snug mb-6 sm:mb-8"
            >
              Professional Cooking Oil
              <span className="block text-green-100">Management Services</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="text-base sm:text-xl md:text-2xl text-white/95 leading-relaxed mb-8 sm:mb-12 max-w-3xl"
            >
              Complete used cooking oil collection and premium fresh oil supply. We deliver within 1-2 days when you're in a pinch.
              Flexible service for restaurants, takeaways, and food manufacturers. Sustainable. Compliant. Reliable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6"
            >
              <Button onClick={() => navigate("contact")} variant="white">
                <Phone className="w-5 h-5" />
                Get Free Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button onClick={() => navigate("services")} variant="ghost">
                Our Services
              </Button>
            </motion.div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="mt-12 sm:mt-20 grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 pt-8 sm:pt-12 border-t border-white/30"
            >
              {[
                { value: "500+", label: "Businesses Served", icon: Users },
                { value: "100%", label: "Compliance Rate", icon: ShieldCheck },
                { value: "15+", label: "Years Experience", icon: Award },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white/80 mx-auto mb-2 sm:mb-3" />
                  <div className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm md:text-base text-green-100 font-semibold">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-20"
        >
          <span className="text-green-600 font-bold text-sm uppercase tracking-wide">Why Ajil's Oils</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-4 pb-2 bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent">
            The Complete Oil Management Solution
          </h2>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We combine reliability, sustainability, and compliance to deliver exceptional service 
            that keeps your kitchen running smoothly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {[
            {
              icon: ShieldCheck,
              title: "Fully Compliant",
              desc: "Registered waste carrier with complete documentation, waste transfer notes, and audit-ready records for total peace of mind.",
              gradient: "from-blue-500 to-blue-600",
            },
            {
              icon: Clock,
              title: "Rapid & Flexible",
              desc: "Delivery within 1-2 days when you need it urgently. Custom schedules, after-hours service, and responsive support that sets us apart.",
              gradient: "from-green-500 to-green-600",
            },
            {
              icon: Leaf,
              title: "Sustainable Practice",
              desc: "100% of used oil recycled into biodiesel and renewable fuels, supporting your environmental commitments.",
              gradient: "from-emerald-500 to-emerald-600",
            },
            {
              icon: Award,
              title: "Premium Quality",
              desc: "Food-grade oils that meet the highest standards, sourced and delivered with care for consistent performance.",
              gradient: "from-green-600 to-emerald-600",
            },
            {
              icon: Users,
              title: "Expert Support",
              desc: "Dedicated account management and responsive customer service whenever you need assistance.",
              gradient: "from-teal-500 to-green-600",
            },
            {
              icon: Target,
              title: "Tailored Solutions",
              desc: "Custom service plans designed around your business size, volume, and specific operational requirements.",
              gradient: "from-green-500 to-emerald-500",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
            >
              <Card>
                <CardContent>
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-150`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16 sm:py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center mb-20"
          >
            <span className="text-green-600 font-bold text-sm uppercase tracking-wide">Simple Process</span>
            <h2 className="text-5xl font-black mt-4 text-gray-900">How It Works</h2>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              Getting started is easy. We handle everything from setup to ongoing service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-green-300 to-green-200 z-0" />
            
            {[
              { step: "01", title: "Contact Us", desc: "Reach out for a free, no-obligation quote tailored to your business", icon: Phone, color: "from-green-500 to-emerald-500" },
              { step: "02", title: "Setup Service", desc: "We arrange collection schedules and supply plans that fit your needs", icon: FileText, color: "from-emerald-500 to-green-600" },
              { step: "03", title: "We Deliver", desc: "Professional collections and fresh oil deliveries, with fast turnaround when you need it", icon: Truck, color: "from-green-600 to-emerald-600" },
              { step: "04", title: "Stay Compliant", desc: "Complete documentation and reporting for audits and inspections", icon: CheckCircle, color: "from-emerald-600 to-green-700" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="relative z-10"
              >
                <Card>
                  <CardContent>
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 mx-auto shadow-2xl`}>
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-6xl font-black text-green-100 mb-4 text-center">{item.step}</div>
                    <h3 className="text-xl font-bold mb-3 text-center text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-20"
        >
          <span className="text-green-600 font-bold text-sm uppercase tracking-wide">Our Clients</span>
          <h2 className="text-5xl font-black mt-4 text-gray-900">Who We Serve</h2>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by businesses across the hospitality and food production sectors
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {[
            { icon: Factory, title: "Restaurants", desc: "Fine dining to casual eateries", gradient: "from-green-500 to-emerald-500" },
            { icon: TrendingUp, title: "Takeaways", desc: "Fast food and quick service", gradient: "from-emerald-500 to-green-600" },
            { icon: Award, title: "Food Manufacturers", desc: "Large-scale production facilities", gradient: "from-green-600 to-emerald-600" },
          ].map((industry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
            >
              <Card>
                <CardContent>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${industry.gradient} flex items-center justify-center mb-6 shadow-xl`}>
                    <industry.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{industry.title}</h3>
                  <p className="text-gray-600">{industry.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 border border-white/30">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-white font-bold text-xs sm:text-sm">Join Hundreds of Satisfied Clients</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto">
              Request a free quote today and discover how we can simplify your cooking oil management.
            </p>
            <Button onClick={() => navigate("contact")} variant="white" className="text-base sm:text-lg md:text-xl">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              Contact Us Today
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ServicesPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-20"
      >
        <span className="text-green-600 font-bold text-sm uppercase tracking-wide">Our Services</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-4 pb-2 bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent">
          Used Cooking Oil Collection
        </h1>
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Professional, compliant, and sustainable used cooking oil collection services designed 
          to keep your business running smoothly while supporting environmental responsibility.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-10 mb-20">
        {[
          {
            icon: Clock,
            title: "Flexible Scheduling",
            desc: "Same-week service available when you're in a pinch, plus regular weekly, bi-weekly, or monthly schedules tailored to your needs.",
            features: ["Rush service (1-2 days)", "Custom schedules", "After-hours options"],
            gradient: "from-green-500 to-green-600",
          },
          {
            icon: ShieldCheck,
            title: "Fully Compliant",
            desc: "Complete regulatory compliance with all UK waste management legislation and environmental standards.",
            features: ["Waste transfer notes", "Licensed carrier", "Audit-ready records"],
            gradient: "from-emerald-500 to-emerald-600",
          },
          {
            icon: Leaf,
            title: "100% Recycled",
            desc: "Every drop of used oil is converted into biodiesel and renewable fuels, supporting a circular economy.",
            features: ["Sustainable process", "Carbon reduction", "Environmental reports"],
            gradient: "from-green-600 to-emerald-600",
          },
        ].map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
          >
            <Card>
              <CardContent>
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-8 shadow-xl`}>
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-16 border-2 border-green-100"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Truck className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-4xl font-black mb-6 text-gray-900">Complete Peace of Mind</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our used cooking oil collection service handles everything from initial setup to ongoing 
            collections, documentation, and environmental reporting. Focus on your business while we 
            take care of your waste oil management needs.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function FreshOilPage() {
  const products = [
    {
      name: "Vegetable Oil",
      desc: "Versatile all-purpose oil perfect for frying, cooking, and baking. Ideal for diverse menu requirements.",
      images: [
        { src: "/images/ktc-vegetable-tin.jpeg", alt: "KTC Vegetable Cooking Oil Tin" },
        { src: "/images/ktc-vegetable-label.jpeg", alt: "KTC Vegetable Cooking Oil" },
      ],
    },
    {
      name: "Corn Oil",
      desc: "High-quality corn oil with excellent frying properties and neutral flavor profile.",
      images: [
        { src: "/images/ktc-corn-oil.jpeg", alt: "KTC Pure Corn Oil 15L" },
      ],
    },
    {
      name: "Rapeseed Oil",
      desc: "Premium oil with high smoke point, specifically designed for deep frying and high-heat cooking.",
      images: [
        { src: "/images/ktc-rapeseed.jpeg", alt: "KTC Extended Life Rapeseed Oil 20L" },
        { src: "/images/rapeseed-cooking-oil.jpeg", alt: "Consumers Pride Rapeseed Cooking Oil 20L" },
      ],
    },
  ];

  const specialtyProducts = [
    {
      name: "P100",
      desc: "High-performance vegetable frying fat for commercial kitchens",
      image: "/images/p100.jpeg",
    },
    {
      name: "Palmax SG",
      desc: "Sustainable RSPO certified palm oil for frying and baking",
      image: "/images/palmax-sg.jpeg",
    },
    {
      name: "Palmax",
      desc: "All vegetable frying fat, pure palm oil for consistent results",
      image: "/images/palmax-blue.jpeg",
    },
    {
      name: "Frymax",
      desc: "UK's No.1 frying oil - no allergens, no additives, non-GM",
      image: "/images/frymax.png",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-20"
      >
        <span className="text-green-600 font-bold text-sm uppercase tracking-wide">Fresh Oil Supply</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-4 pb-2 bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent">
          Premium Fresh Cooking Oil
        </h1>
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          High-quality food-grade cooking oils delivered on schedule, or within 1-2 days when you're running low.
          Flexible service that keeps your kitchen running—combine with our collection service for a complete solution.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-10 mb-20">
        {[
          {
            icon: Award,
            title: "Premium Quality",
            desc: "Food-grade oils that meet the highest standards for taste, performance, and safety in commercial kitchens.",
            gradient: "from-green-500 to-green-600",
          },
          {
            icon: Truck,
            title: "Fast & Scheduled Delivery",
            desc: "Quick turnaround (1-2 days) when you run out unexpectedly, plus regular scheduled deliveries aligned with your usage.",
            gradient: "from-emerald-500 to-emerald-600",
          },
          {
            icon: Target,
            title: "Complete Solution",
            desc: "Fresh oil supply and used oil collection from one trusted partner simplifies your operations.",
            gradient: "from-green-600 to-emerald-600",
          },
        ].map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
          >
            <Card>
              <CardContent>
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-8 shadow-xl`}>
                  <benefit.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base">{benefit.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Product Range */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 sm:p-16 border-2 border-green-100"
      >
        <h2 className="text-4xl font-black mb-12 text-center text-gray-900">Product Range</h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          We supply premium cooking oils from trusted major brands, ensuring consistent quality and performance for your commercial kitchen.
        </p>

        <div className="space-y-16 max-w-6xl mx-auto">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
            >
              <Card className="bg-white overflow-hidden">
                <CardContent>
                  <h3 className="text-3xl font-bold text-green-700 mb-4">{product.name}</h3>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg">{product.desc}</p>
                  <div className="flex flex-wrap gap-6 justify-center items-end">
                    {product.images.map((img, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white rounded-2xl p-4 shadow-lg"
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="h-48 sm:h-56 w-auto object-contain"
                        />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Specialty Products */}
        <div className="mt-20 max-w-6xl mx-auto">
          <h3 className="text-3xl font-black mb-12 text-center text-gray-900">Specialty Frying Oils</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialtyProducts.map((specialty, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
              >
                <Card className="bg-white h-full">
                  <CardContent>
                    <div className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-50 rounded-2xl p-4 mb-6 inline-block"
                      >
                        <img
                          src={specialty.image}
                          alt={specialty.name}
                          className="h-36 w-auto object-contain mx-auto"
                        />
                      </motion.div>
                      <h4 className="text-xl font-bold text-green-700 mb-3">{specialty.name}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{specialty.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function CompliancePage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-20"
      >
        <span className="text-green-600 font-bold text-sm uppercase tracking-wide">Compliance & Safety</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-4 pb-2 bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent">
          Full Regulatory Compliance
        </h1>
        <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          We operate in complete accordance with UK waste management legislation, 
          providing comprehensive documentation and full traceability for every collection.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-12 sm:mb-16 md:mb-20">
        {[
          {
            icon: ShieldCheck,
            title: "Licensed Waste Carrier",
            desc: "Fully registered and compliant with all UK Environment Agency requirements and waste carrier regulations.",
          },
          {
            icon: FileText,
            title: "Complete Documentation",
            desc: "Waste transfer notes, collection records, and audit-ready paperwork provided for every single collection.",
          },
          {
            icon: Award,
            title: "Industry Standards",
            desc: "Meeting and exceeding all environmental regulations, health and safety standards, and industry best practices.",
          },
          {
            icon: Recycle,
            title: "Environmental Compliance",
            desc: "Certified recycling processes ensuring proper waste management and full environmental protection.",
          },
        ].map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
          >
            <Card>
              <CardContent>
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-8 shadow-xl">
                  <cert.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{cert.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base">{cert.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* What We Provide */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-16 border-2 border-green-100"
      >
        <h2 className="text-4xl font-black mb-12 text-center text-gray-900">What We Provide</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {[
            {
              title: "Waste Transfer Notes",
              desc: "Complete documentation for every collection, ensuring full legal compliance and providing a complete audit trail.",
            },
            {
              title: "Duty of Care Compliance",
              desc: "Meeting all legal obligations for waste producers under UK environmental law and waste management regulations.",
            },
            {
              title: "Full Traceability",
              desc: "Comprehensive tracking from point of collection to final recycling destination with detailed records maintained.",
            },
            {
              title: "Regular Reporting",
              desc: "Collection reports, environmental impact statements, and compliance documentation available on request.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className="flex gap-6 items-start bg-white rounded-2xl p-8 shadow-lg"
            >
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed text-base">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/meeevlyo", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-20"
      >
        <span className="text-green-600 font-bold text-sm uppercase tracking-wide">Get In Touch</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-4 pb-2 bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent">
          Contact Ajil's Oils
        </h1>
        <p className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto">
          Request a free quote, arrange a delivery, or speak with our team about your requirements.
          We respond quickly and can usually accommodate rush requests within 1-2 days.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardContent>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>

                {formStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">We'll get back to you as soon as possible.</p>
                    <Button
                      onClick={() => setFormStatus("idle")}
                      variant="secondary"
                      className="mt-6"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                        placeholder="+44 7XXX XXXXXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="business" className="block text-sm font-bold text-gray-700 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        id="business"
                        name="business"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                        placeholder="Your Restaurant or Business"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-bold text-gray-700 mb-2">
                        Service Required *
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none bg-white"
                      >
                        <option value="">Select a service...</option>
                        <option value="used-oil-collection">Used Oil Collection</option>
                        <option value="fresh-oil-supply">Fresh Oil Supply</option>
                        <option value="both">Both Services</option>
                        <option value="quote">General Quote Request</option>
                        <option value="other">Other Enquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    {formStatus === "error" && (
                      <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm">
                        Something went wrong. Please try again or contact us directly.
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Why Contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="space-y-8"
          >
            <Card>
              <CardContent>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "info@ajilsoils.com", gradient: "from-green-500 to-green-600" },
                    { icon: Phone, label: "Phone", value: "+44 XXXX XXXXXX", gradient: "from-emerald-500 to-emerald-600" },
                    { icon: MapPin, label: "Location", value: "United Kingdom", gradient: "from-green-600 to-emerald-600" },
                  ].map((contact, i) => (
                    <div key={i} className="flex gap-4 items-center">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <contact.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wide">{contact.label}</h3>
                        <p className="text-gray-900 font-medium">{contact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100">
              <CardContent>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Why Contact Us?</h2>
                <ul className="space-y-3">
                  {[
                    "Rush delivery available (1-2 days)",
                    "Free, no-obligation quotes",
                    "Quick response times",
                    "After-hours and weekend options",
                    "Flexible scheduling",
                    "Expert advice on oil management",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- APP ROOT -------------------- */

export default function App() {
  const [route, setRoute] = useState<Route>("home");

  const renderPage = () => {
    switch (route) {
      case "services":
        return <ServicesPage />;
      case "fresh-oil":
        return <FreshOilPage />;
      case "compliance":
        return <CompliancePage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage navigate={setRoute} />;
    }
  };

  return (
    <PageWrapper navigate={setRoute} currentRoute={route}>
      {renderPage()}
    </PageWrapper>
  );
}