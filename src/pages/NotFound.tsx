
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ConstellationBackground from "@/components/UI/ConstellationBackground";
import { playSound } from "@/lib/audio";

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
    >
      <ConstellationBackground />
      
      <div className="container mx-auto px-4 py-16 relative z-10 text-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] font-heading">
            404
          </h1>
          <p className="text-2xl mt-4 text-white/80 font-body">
            Signal lost in the cyber void
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-white/60 max-w-md mx-auto">
            The digital pathway you're searching for has been corrupted or doesn't exist in this dimension.
          </p>
        </motion.div>
        
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playSound("click");
            navigate("/");
          }}
          className="px-8 py-3 bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] rounded-lg text-white font-medium
                   shadow-lg shadow-[#FF00FF]/20 relative overflow-hidden group"
        >
          <span className="relative z-10">Return to Home Base</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF00FF] to-[#00F5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NotFound;
