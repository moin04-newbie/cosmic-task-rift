
import { useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { useTaskStore } from "@/store/taskStore";
import ConstellationBackground from "@/components/UI/ConstellationBackground";

interface Trophy {
  id: string;
  name: string;
  description: string;
  image: string;
  unlocked: boolean;
  requiredTasks: number;
}

const TrophyRoom = () => {
  const { tasks } = useTaskStore();
  const completedTasksCount = tasks.filter(task => task.completed).length;
  
  const trophies: Trophy[] = [
    {
      id: "first-task",
      name: "First Step",
      description: "Complete your first task",
      image: "/trophies/first-task.svg",
      unlocked: completedTasksCount >= 1,
      requiredTasks: 1
    },
    {
      id: "five-tasks",
      name: "Getting Started",
      description: "Complete 5 tasks",
      image: "/trophies/five-tasks.svg",
      unlocked: completedTasksCount >= 5,
      requiredTasks: 5
    },
    {
      id: "ten-tasks",
      name: "Momentum Builder",
      description: "Complete 10 tasks",
      image: "/trophies/ten-tasks.svg",
      unlocked: completedTasksCount >= 10,
      requiredTasks: 10
    },
    {
      id: "twenty-tasks",
      name: "Productivity Master",
      description: "Complete 20 tasks",
      image: "/trophies/twenty-tasks.svg",
      unlocked: completedTasksCount >= 20,
      requiredTasks: 20
    },
    {
      id: "fifty-tasks",
      name: "Task Legend",
      description: "Complete 50 tasks",
      image: "/trophies/fifty-tasks.svg",
      unlocked: completedTasksCount >= 50,
      requiredTasks: 50
    }
  ];
  
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
            Your achievements showcase - {completedTasksCount} tasks completed
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {trophies.map((trophy, index) => (
            <TrophyCard 
              key={trophy.id} 
              trophy={trophy} 
              index={index}
              completedTasksCount={completedTasksCount}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface TrophyCardProps {
  trophy: Trophy;
  index: number;
  completedTasksCount: number;
}

const TrophyCard = ({ trophy, index, completedTasksCount }: TrophyCardProps) => {
  const isLocked = !trophy.unlocked;
  const progress = Math.min(completedTasksCount / trophy.requiredTasks, 1);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`rounded-xl overflow-hidden relative ${
        isLocked ? "grayscale" : ""
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#00F5FF]/10 to-[#FF00FF]/10 backdrop-blur-md border border-white/10 rounded-xl" />
      
      <div className="p-6 relative">
        <div className="flex flex-col items-center">
          <div className={`w-28 h-28 mb-4 relative ${isLocked ? "opacity-30" : ""}`}>
            <img src={trophy.image} alt={trophy.name} className="w-full h-full object-contain" />
            
            {/* Glow effect for unlocked trophies */}
            {!isLocked && (
              <motion.div
                animate={{ 
                  boxShadow: ["0 0 15px #00F5FF", "0 0 30px #FF00FF", "0 0 15px #00F5FF"] 
                }}
                transition={{ 
                  duration: 3, 
                  ease: "easeInOut", 
                  repeat: Infinity 
                }}
                className="absolute inset-0 rounded-full"
              />
            )}
            
            {/* Lock icon for locked trophies */}
            {isLocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                  className="text-white/40">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
            )}
          </div>
          
          <h3 className={`text-xl font-bold mb-1 text-center font-heading ${
            isLocked ? "text-white/40" : "text-[#00F5FF]"
          }`}>
            {trophy.name}
          </h3>
          
          <p className={`text-sm text-center mb-4 font-body ${
            isLocked ? "text-white/30" : "text-white/60"
          }`}>
            {trophy.description}
          </p>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full ${
                trophy.unlocked 
                  ? "bg-gradient-to-r from-[#00F5FF] to-[#FF00FF]" 
                  : "bg-white/30"
              }`}
            />
          </div>
          
          <p className={`mt-2 text-xs font-body ${
            isLocked ? "text-white/30" : "text-white/60"
          }`}>
            {completedTasksCount} / {trophy.requiredTasks} tasks
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TrophyRoom;
