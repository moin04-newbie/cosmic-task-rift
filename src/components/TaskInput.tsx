
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/sonner";
import { useTaskStore } from "@/store/taskStore";
import { playSound } from "@/lib/audio";

const TaskInput = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { addTask } = useTaskStore();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskName.trim()) {
      toast.error("Task name cannot be empty");
      return;
    }
    
    addTask({
      id: crypto.randomUUID(),
      name: taskName,
      description: taskDescription,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    
    setTaskName("");
    setTaskDescription("");
    setIsExpanded(false);
    playSound("add");
    
    toast.success("Task added successfully");
  };
  
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <motion.div
      animate={{ height: isExpanded ? "auto" : "64px" }}
      className="rounded-xl overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#00F5FF]/10 to-[#FF00FF]/10 backdrop-blur-md border border-white/10 rounded-xl" />
      
      <motion.div
        animate={{ 
          boxShadow: isExpanded 
            ? "0 0 30px rgba(0, 245, 255, 0.3)" 
            : "0 0 15px rgba(0, 245, 255, 0.1)"
        }}
        className="absolute inset-0 rounded-xl"
        style={{ 
          background: "linear-gradient(145deg, rgba(0,245,255,0.1) 0%, rgba(255,0,255,0.1) 100%)" 
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-xl" />
        
        <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] animate-[scan_2s_linear_infinite]" />
        </div>
      </motion.div>
      
      <form onSubmit={handleSubmit} className="relative p-4">
        <div className="flex items-center">
          <motion.button
            type="button"
            onClick={() => {
              setIsExpanded(!isExpanded);
              playSound("click");
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] rounded-full text-white mr-3 flex-shrink-0"
          >
            {isExpanded ? "-" : "+"}
          </motion.button>
          
          <input
            ref={inputRef}
            type="text"
            placeholder="Add a new task..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="flex-1 bg-transparent border-none text-white placeholder-white/50 focus:outline-none font-body"
          />
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-3 px-4 py-1 bg-[#00F5FF]/20 rounded-lg border border-[#00F5FF]/40 text-white text-sm hover:bg-[#00F5FF]/30 transition-colors duration-200"
          >
            Add
          </motion.button>
        </div>
        
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4"
          >
            <textarea
              placeholder="Description (optional)"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white placeholder-white/50 focus:outline-none focus:border-[#00F5FF]/50 resize-none min-h-[100px] font-body"
            />
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default TaskInput;
