
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  location: string;
}

export const PageTransition = ({ children, location }: PageTransitionProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
