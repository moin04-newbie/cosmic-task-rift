
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTaskStore } from "@/store/taskStore";
import { Task } from "@/types/task";
import { playSound } from "@/lib/audio";
import TaskExplosion from "./TaskCard/TaskExplosion";

interface TaskCardProps {
  task: Task;
  onToggleComplete: () => void;
  compact?: boolean;
}

const TaskCard = ({ task, onToggleComplete, compact = false }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const { deleteTask } = useTaskStore();
  
  // For 3D tilt effect
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform values for tilting effect
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || task.completed) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };
  
  const handleToggleComplete = () => {
    if (!task.completed) {
      setIsExploding(true);
      // Delay the actual completion to show explosion
      setTimeout(() => {
        onToggleComplete();
      }, 300);
    } else {
      onToggleComplete();
    }
  };
  
  const handleDelete = () => {
    deleteTask(task.id);
    playSound("delete");
  };
  
  // If the task is completed and it was exploding, we reset explosion state
  if (task.completed && isExploding) {
    setIsExploding(false);
  }

  return (
    <motion.div
      ref={cardRef}
      layout
      style={{ 
        x: 0,
        y: 0,
        rotateX: task.completed ? 0 : rotateX,
        rotateY: task.completed ? 0 : rotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 10 }}
      className={`${compact ? "p-4" : "p-6"} relative overflow-hidden transition-all duration-200`}
    >
      {/* Background layers */}
      <div className="absolute inset-0 rounded-xl bg-black/60 backdrop-blur-md" />
      
      {/* RGB border animation */}
      <div className={`absolute inset-0 rounded-xl ${task.completed ? "opacity-10" : "opacity-100"} transition-opacity duration-300`}>
        <div className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-r from-[#00F5FF] via-[#FF00FF] to-[#00F5FF] bg-[length:200%_100%] animate-[border-scan_2s_linear_infinite]" />
      </div>
      
      {/* Inner border for depth */}
      <div className="absolute inset-[1px] rounded-[10px] border border-white/5 bg-black/40" />
      
      {/* Explosion effect on completion */}
      {isExploding && <TaskExplosion />}
      
      {/* Content */}
      <div 
        className={`relative ${task.completed ? "opacity-60" : "opacity-100"} transition-opacity duration-300`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={`font-semibold text-white mb-1 ${compact ? "text-base" : "text-lg"} font-heading ${task.completed ? "line-through" : ""}`}>
              {task.name}
            </h3>
            
            {!compact && task.description && (
              <p className={`text-white/70 text-sm mb-3 font-body ${task.completed ? "line-through" : ""}`}>
                {task.description}
              </p>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleComplete}
            className={`w-6 h-6 flex-shrink-0 rounded-full border ${
              task.completed 
                ? "bg-[#00F5FF] border-[#00F5FF]" 
                : "bg-transparent border-white/30"
            } flex items-center justify-center transition-colors duration-200 mr-2`}
          >
            {task.completed && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </motion.button>
        </div>
        
        {/* Task actions */}
        <div className="flex justify-between items-center mt-4">
          {!compact && (
            <span className="text-white/40 text-xs font-body">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          )}
          
          <div className="flex space-x-2 ml-auto">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="text-white/50 hover:text-[#FF00FF] transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Focus/hover glow effect */}
      {isHovered && !task.completed && (
        <div className="absolute inset-0 rounded-xl bg-[#00F5FF]/5 pointer-events-none" />
      )}
    </motion.div>
  );
};

export default TaskCard;
