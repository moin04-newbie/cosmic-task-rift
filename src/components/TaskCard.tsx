
import { useState } from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { Task } from "@/types/task";
import { useTaskStore } from "@/store/taskStore";
import { playSound } from "@/lib/audio";
import TaskExplosion from "./TaskCard/TaskExplosion";

interface TaskCardProps {
  task: Task;
  onToggleComplete: () => void;
}

const TaskCard = ({ task, onToggleComplete }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const { deleteTask } = useTaskStore();
  
  const handleToggleComplete = () => {
    // If completing a task (not uncompleting)
    if (!task.completed) {
      setShowExplosion(true);
      playSound("add");
      
      // Wait for animation before toggling state
      setTimeout(() => {
        onToggleComplete();
        toast({
          title: "Task completed!",
          description: "You've earned some XP!",
        });
      }, 300);
    } else {
      onToggleComplete();
    }
  };
  
  const handleDelete = () => {
    playSound("delete");
    deleteTask(task.id);
    toast({
      title: "Task deleted",
      description: "The task has been removed",
      variant: "destructive",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="task-card-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative overflow-hidden rounded-xl border ${
          task.completed 
            ? "border-[#00F5FF]/20 bg-[#00F5FF]/5" 
            : "border-[#FF00FF]/20 bg-[#FF00FF]/5"
        } backdrop-blur-md shadow-lg`}
      >
        {showExplosion && <TaskExplosion onComplete={() => setShowExplosion(false)} />}
        
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className={`absolute inset-0 opacity-20 ${
              task.completed ? "bg-[#00F5FF]/10" : "bg-[#FF00FF]/10"
            }`}
          />
          <div 
            className={`absolute top-0 left-0 w-full h-1 ${
              task.completed ? "bg-[#00F5FF]" : "bg-[#FF00FF]"
            }`}
          />
        </div>
        
        <div className="p-5 relative">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 pt-1">
              <Checkbox
                checked={task.completed}
                onCheckedChange={handleToggleComplete}
                className={`h-5 w-5 border-2 ${
                  task.completed 
                    ? "border-[#00F5FF] bg-[#00F5FF]/20 text-[#00F5FF]" 
                    : "border-[#FF00FF] bg-[#FF00FF]/20 text-[#FF00FF]"
                }`}
              />
            </div>
            
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-1 ${
                task.completed ? "text-[#00F5FF] line-through opacity-60" : "text-white"
              } font-heading`}>
                {task.name}
              </h3>
              
              {task.description && (
                <p className={`text-sm ${
                  task.completed ? "text-white/40" : "text-white/60"
                } font-body`}>
                  {task.description}
                </p>
              )}
              
              <div className="mt-3 text-xs text-white/40 font-body">
                Added: {new Date(task.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleDelete}
              className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center
                        bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TaskCard;
