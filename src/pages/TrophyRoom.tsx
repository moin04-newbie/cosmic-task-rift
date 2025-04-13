
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ConstellationBackground from "@/components/UI/ConstellationBackground";
import { useTaskStore } from "@/store/taskStore";
import { cn } from "@/lib/utils";

const trophies = [
  {
    id: "first-task",
    name: "First Steps",
    description: "Complete your first task",
    image: "/trophies/first-task.svg",
    condition: (completedCount: number) => completedCount >= 1,
  },
  {
    id: "five-tasks",
    name: "Getting Things Done",
    description: "Complete 5 tasks",
    image: "/trophies/five-tasks.svg",
    condition: (completedCount: number) => completedCount >= 5,
  },
  {
    id: "ten-tasks",
    name: "Productivity Master",
    description: "Complete 10 tasks",
    image: "/trophies/ten-tasks.svg",
    condition: (completedCount: number) => completedCount >= 10,
  },
  {
    id: "twenty-tasks",
    name: "Task Destroyer",
    description: "Complete 20 tasks",
    image: "/trophies/twenty-tasks.svg",
    condition: (completedCount: number) => completedCount >= 20,
  },
  {
    id: "fifty-tasks",
    name: "Legendary Achiever",
    description: "Complete 50 tasks",
    image: "/trophies/fifty-tasks.svg",
    condition: (completedCount: number) => completedCount >= 50,
  },
];

const TrophyRoom = () => {
  const { getCompletedTasksCount } = useTaskStore();
  const completedCount = getCompletedTasksCount();
  
  useEffect(() => {
    document.title = "CyberTask | Trophy Room";
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
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] font-heading">
            Trophy Room
          </h1>
          <p className="text-white/80 mt-2 font-body">
            Your digital achievements collection
          </p>
          <div className="mt-4 bg-black/30 backdrop-blur-sm py-2 px-4 rounded-full inline-flex items-center">
            <span className="text-[#00F5FF] font-semibold mr-2">Total completed:</span>
            <span className="text-white">{completedCount} tasks</span>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {trophies.map((trophy, index) => {
            const isUnlocked = trophy.condition(completedCount);
            
            return (
              <TrophyCard 
                key={trophy.id}
                trophy={trophy}
                isUnlocked={isUnlocked}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

const TrophyCard = ({ 
  trophy, 
  isUnlocked, 
  index 
}: { 
  trophy: typeof trophies[0]; 
  isUnlocked: boolean; 
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.2 }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 } 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "rounded-xl overflow-hidden relative group transition-all duration-300",
        "transform perspective-1000 hover:z-10",
        isUnlocked 
          ? "bg-gradient-to-br from-black/60 to-black/40 border border-[#00F5FF]/30" 
          : "bg-black/40 border border-white/10 grayscale"
      )}
      style={{
        boxShadow: isUnlocked 
          ? isHovered 
            ? "0 0 30px rgba(0, 245, 255, 0.5)" 
            : "0 0 15px rgba(0, 245, 255, 0.2)"
          : "none"
      }}
    >
      <div className="p-6">
        <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
          <div className="w-full h-full flex items-center justify-center bg-black/20">
            {isUnlocked ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="w-3/4 h-3/4"
              >
                <img 
                  src="/placeholder.svg" // Placeholder for trophy image
                  alt={trophy.name} 
                  className="w-full h-full object-contain" 
                />
              </motion.div>
            ) : (
              <div className="text-white/40 text-5xl">?</div>
            )}
          </div>
        </div>
        
        <h3 className={cn(
          "text-xl font-bold mb-2 font-heading",
          isUnlocked ? "text-[#00F5FF]" : "text-white/40"
        )}>
          {trophy.name}
        </h3>
        
        <p className={cn(
          "text-sm font-body",
          isUnlocked ? "text-white/80" : "text-white/30"
        )}>
          {trophy.description}
        </p>
        
        {isUnlocked && (
          <div className="mt-4 pt-4 border-t border-[#00F5FF]/20">
            <span className="text-xs text-[#FF00FF]/80 font-body">
              Unlocked
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TrophyRoom;
