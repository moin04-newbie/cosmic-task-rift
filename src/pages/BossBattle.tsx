
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import ConstellationBackground from "@/components/UI/ConstellationBackground";
import TaskCard from "@/components/TaskCard";
import { useTaskStore } from "@/store/taskStore";
import { playSound } from "@/lib/audio";
import BossEnemy from "@/components/BossEnemy";
import TaskInput from "@/components/TaskInput";

const BossBattle = () => {
  const { tasks, toggleTaskCompletion, getCompletedTasksCount } = useTaskStore();
  const [bossHealth, setBossHealth] = useState(100);
  const [showVictory, setShowVictory] = useState(false);
  
  const incompleteTasks = tasks.filter(task => !task.completed);
  const totalTasks = tasks.length;
  const completedTasks = getCompletedTasksCount();
  
  // Calculate boss health based on completed tasks
  useEffect(() => {
    if (totalTasks === 0) return;
    
    const percentComplete = (completedTasks / totalTasks) * 100;
    const newHealth = Math.max(0, 100 - percentComplete);
    
    setBossHealth(newHealth);
    
    // Check for victory
    if (newHealth === 0 && !showVictory) {
      setShowVictory(true);
      playSound("victory");
      toast({
        title: "Boss Defeated!",
        description: "You've conquered your tasks and defeated the boss!",
      });
    }
  }, [completedTasks, totalTasks, showVictory]);
  
  useEffect(() => {
    document.title = "CyberTask | Boss Battle";
  }, []);

  const handleTaskComplete = (taskId: string) => {
    toggleTaskCompletion(taskId);
    playSound("damage");
    
    // Apply damage animation
    const oldHealth = bossHealth;
    if (totalTasks > 0) {
      const damageAmount = 100 / totalTasks;
      const newHealth = Math.max(0, oldHealth - damageAmount);
      setBossHealth(newHealth);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <ConstellationBackground />
      
      {showVictory && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-10"
          >
            <h2 className="text-6xl font-bold text-[#00F5FF] mb-6 font-heading">VICTORY!</h2>
            <p className="text-2xl text-white mb-8 font-body">You've conquered your tasks and defeated the boss!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVictory(false)}
              className="px-8 py-3 bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] rounded-xl text-white font-bold shadow-lg"
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] font-heading">
            Boss Battle
          </h1>
          <p className="text-white/80 mt-2 font-body">
            Complete tasks to deal damage to the boss
          </p>
        </motion.div>
        
        <div className="mb-10 max-w-2xl mx-auto">
          <TaskInput />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-[#FF00FF]/30"
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[#FF00FF] font-bold font-heading">BOSS HEALTH</h3>
                  <span className="text-white">{Math.floor(bossHealth)}%</span>
                </div>
                <div className="h-4 bg-black/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: `${bossHealth}%` }}
                    animate={{ width: `${bossHealth}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="h-full bg-gradient-to-r from-[#FF00FF] to-[#00F5FF]"
                  />
                </div>
              </div>
              
              <BossEnemy healthPercentage={bossHealth} />
              
              <div className="mt-6 text-center">
                <p className="text-white/80 text-sm font-body mb-2">
                  Tasks completed: {completedTasks} / {totalTasks}
                </p>
                <p className="text-[#00F5FF] text-xs font-body">
                  Complete tasks to deal damage
                </p>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-3">
            <h3 className="text-xl font-semibold text-white mb-4 font-heading">
              Remaining Tasks
            </h3>
            
            <motion.div
              layout
              className="space-y-4"
            >
              {incompleteTasks.length > 0 ? (
                incompleteTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={() => handleTaskComplete(task.id)}
                    compact
                  />
                ))
              ) : (
                <div className="text-center py-10 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
                  <p className="text-white/60 text-lg font-body">
                    All tasks completed! The boss is defeated!
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BossBattle;
