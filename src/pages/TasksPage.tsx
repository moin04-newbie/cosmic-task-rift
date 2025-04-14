
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import ConstellationBackground from "@/components/UI/ConstellationBackground";
import TaskCard from "@/components/TaskCard";
import TaskInput from "@/components/TaskInput";
import { useTaskStore } from "@/store/taskStore";
import { useThemeStore } from "@/store/themeStore";

const TasksPage = () => {
  const { tasks, toggleTaskCompletion } = useTaskStore();
  const [showCompleted, setShowCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentTheme = useThemeStore(state => state.getTheme());
  
  useEffect(() => {
    document.title = "CyberTask | Tasks";
    
    // Simulate loading to ensure smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredTasks = showCompleted 
    ? tasks 
    : tasks.filter(task => !task.completed);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ 
        background: `radial-gradient(circle at 50% 30%, ${currentTheme.primary}15, transparent 70%)`,
      }}
    >
      <ConstellationBackground />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] font-heading">
            Your Tasks
          </h1>
          <p className="text-white/80 mt-2 font-body">
            Complete tasks to gain XP and unlock achievements
          </p>
        </motion.div>
        
        <div className="max-w-2xl mx-auto mb-10">
          <TaskInput />
        </div>
        
        <div className="mb-6 flex justify-between items-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-white font-heading">
            {showCompleted ? "All Tasks" : "Active Tasks"}
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCompleted(!showCompleted)}
            className="px-4 py-2 rounded-lg bg-[var(--secondary)]/20 border border-[var(--secondary)]/40 text-white
                      hover:bg-[var(--secondary)]/30 transition duration-200 text-sm font-body"
            style={{ 
              backgroundColor: `${currentTheme.secondary}20`,
              borderColor: `${currentTheme.secondary}40`
            }}
          >
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </motion.button>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3].map((_, index) => (
              <div 
                key={index} 
                className="h-40 rounded-xl border border-[var(--secondary)]/20 bg-[var(--secondary)]/5 animate-pulse"
                style={{ 
                  borderColor: `${currentTheme.secondary}20`,
                  backgroundColor: `${currentTheme.secondary}05`,
                }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <motion.div key={task.id} variants={itemVariants}>
                  <TaskCard
                    task={task}
                    onToggleComplete={() => toggleTaskCompletion(task.id)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                variants={itemVariants}
                className="col-span-full text-center py-10"
              >
                <p className="text-white/60 text-lg font-body">
                  {showCompleted
                    ? "No tasks yet. Add your first task above!"
                    : "No active tasks. All done for now!"}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TasksPage;
