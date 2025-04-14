
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
  location: string;
}

export const PageTransition = ({ children, location }: PageTransitionProps) => {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Ensure the component is ready before animating
    setIsReady(true);
    
    return () => {
      setIsReady(false);
    };
  }, [location]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="w-full h-full"
      >
        {isReady && children}
      </motion.div>
    </AnimatePresence>
  );
};
