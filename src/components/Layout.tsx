
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { PageTransition } from "./UI/PageTransition";
import { motion } from "framer-motion";
import { playSound } from "@/lib/audio";

const Layout = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Initialize audio when the app loads
    playSound("init");
    
    // Add custom fonts to the document
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
    
    // Update CSS variables for our color scheme
    document.documentElement.style.setProperty("--primary", "#00F5FF");
    document.documentElement.style.setProperty("--secondary", "#FF00FF");
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f13] overflow-x-hidden font-body">
      <Navbar />
      
      <PageTransition location={location.pathname}>
        <main className="w-full min-h-[calc(100vh-16px)] pt-16">
          <Outlet />
        </main>
      </PageTransition>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-2 left-0 right-0 text-center text-white/20 text-xs py-2 pointer-events-none"
      >
        CyberTask v1.0 • Built with 💙
      </motion.div>
    </div>
  );
};

export default Layout;
