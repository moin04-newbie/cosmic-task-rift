
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import ConstellationBackground from "@/components/UI/ConstellationBackground";
import TaskInput from "@/components/TaskInput";
import AssistantAvatar from "@/components/AssistantAvatar";
import { playSound } from "@/lib/audio";

const Homepage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    toast("Welcome to CyberTask!", {
      description: "Complete tasks, earn rewards, defeat bosses!",
    });
    
    // Play welcome sound
    playSound("welcome");
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <ConstellationBackground />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] font-heading">
            CyberTask
          </h1>
          <p className="text-2xl mt-4 text-white/80 font-body">
            The most visually explosive to-do list in the metaverse
          </p>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <TaskInput />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col md:flex-row justify-center items-center gap-8 mt-16"
        >
          <NavButton 
            title="Tasks" 
            description="Manage your cyber missions" 
            path="/tasks" 
          />
          <NavButton 
            title="Trophy Room" 
            description="View your digital achievements" 
            path="/trophies" 
          />
          <NavButton 
            title="Boss Battle" 
            description="Complete tasks to defeat the boss" 
            path="/boss" 
          />
        </motion.div>
        
        <div className="fixed bottom-10 right-10">
          <AssistantAvatar />
        </div>
      </div>
    </motion.div>
  );
};

const NavButton = ({ title, description, path }: { title: string; description: string; path: string }) => {
  const navigate = useNavigate();
  
  return (
    <motion.button
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        playSound("click");
        navigate(path);
      }}
      className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-[#00F5FF]/30 w-full md:w-64
                shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:shadow-[0_0_25px_rgba(0,245,255,0.5)]
                transition-all duration-200"
    >
      <h3 className="text-xl font-bold text-[#00F5FF] mb-2 font-heading">{title}</h3>
      <p className="text-white/70 text-sm font-body">{description}</p>
    </motion.button>
  );
};

export default Homepage;
