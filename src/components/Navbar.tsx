
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { playSound } from "@/lib/audio";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/tasks", label: "Tasks" },
  { path: "/trophies", label: "Trophies" },
  { path: "/boss", label: "Boss Battle" }
];

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 
                ${isScrolled ? "bg-black/70 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" onClick={() => playSound("click")}>
          <span className="text-xl font-bold text-white font-heading">
            <span className="text-[#00F5FF]">Cyber</span>
            <span className="text-[#FF00FF]">Task</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavItem 
              key={item.path} 
              path={item.path} 
              label={item.label} 
              isActive={location.pathname === item.path} 
            />
          ))}
        </div>
        
        <MobileMenu items={navItems} currentPath={location.pathname} />
      </div>
    </motion.nav>
  );
};

const NavItem = ({ path, label, isActive }: { path: string; label: string; isActive: boolean }) => {
  return (
    <Link to={path} onClick={() => playSound("click")}>
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        className={`px-4 py-2 mx-1 rounded-lg transition-colors duration-200 relative ${
          isActive ? "text-[#00F5FF]" : "text-white/80 hover:text-white"
        }`}
      >
        {label}
        {isActive && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] rounded-full"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

const MobileMenu = ({ items, currentPath }: { items: typeof navItems; currentPath: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="md:hidden">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          playSound("click");
        }}
        className="text-white p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg mt-2 py-4 px-6 shadow-lg rounded-b-xl border-t border-[#00F5FF]/20"
        >
          <div className="flex flex-col space-y-3">
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => {
                  setIsOpen(false);
                  playSound("click");
                }}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  currentPath === item.path
                    ? "bg-[#00F5FF]/10 text-[#00F5FF]"
                    : "text-white/80 hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
