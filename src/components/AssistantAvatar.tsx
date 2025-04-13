
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTaskStore } from "@/store/taskStore";

const AssistantAvatar = () => {
  const [mood, setMood] = useState<"idle" | "happy" | "sad">("idle");
  const [message, setMessage] = useState("");
  const { tasks } = useTaskStore();
  const messageTimerRef = useRef<number | null>(null);
  
  // Update mood based on task completion
  useEffect(() => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const incompleteTasks = tasks.length - completedTasks;
    
    if (completedTasks > incompleteTasks) {
      setMood("happy");
      showMessage("Great job completing your tasks!");
    } else if (incompleteTasks > 5) {
      setMood("sad");
      showMessage("You have a lot of pending tasks...");
    } else {
      setMood("idle");
      showMessage("I'm here to help you stay productive!");
    }
    
    return () => {
      if (messageTimerRef.current) {
        window.clearTimeout(messageTimerRef.current);
      }
    };
  }, [tasks]);
  
  const showMessage = (text: string) => {
    setMessage(text);
    
    // Clear previous timer
    if (messageTimerRef.current) {
      window.clearTimeout(messageTimerRef.current);
    }
    
    // Hide message after 5 seconds
    messageTimerRef.current = window.setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      className="relative"
    >
      {/* Message bubble */}
      <AnimatedMessage message={message} />
      
      {/* Avatar */}
      <motion.div
        animate={mood}
        variants={{
          idle: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } },
          happy: {
            y: [0, -10, 0],
            rotate: [0, 5, 0, -5, 0],
            transition: { repeat: Infinity, duration: 1.5 }
          },
          sad: {
            y: [0, -2, 0], 
            rotate: [0, -2, 0, 2, 0],
            transition: { repeat: Infinity, duration: 3 }
          }
        }}
        className="w-16 h-16 bg-gradient-to-br from-[#00F5FF] to-[#FF00FF] rounded-2xl shadow-lg shadow-[#00F5FF]/20 flex items-center justify-center"
      >
        <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center">
          <RobotFace mood={mood} />
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnimatedMessage = ({ message }: { message: string }) => {
  if (!message) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.8 }}
      className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm
                 py-2 px-4 rounded-xl text-white text-sm min-w-[150px] whitespace-nowrap"
    >
      {message}
      <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black/80 rotate-45" />
    </motion.div>
  );
};

const RobotFace = ({ mood }: { mood: "idle" | "happy" | "sad" }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2">
      {/* Eyes */}
      <div className="flex space-x-2 mb-1">
        <motion.div
          animate={mood}
          variants={{
            idle: { height: "4px" },
            happy: { height: "4px", scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 2 } },
            sad: { height: "2px" }
          }}
          className="w-2 h-1 bg-[#00F5FF] rounded-full"
        />
        <motion.div
          animate={mood}
          variants={{
            idle: { height: "4px" },
            happy: { height: "4px", scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 2, delay: 0.2 } },
            sad: { height: "2px" }
          }}
          className="w-2 h-1 bg-[#00F5FF] rounded-full"
        />
      </div>
      
      {/* Mouth */}
      <motion.div
        animate={mood}
        variants={{
          idle: { width: "8px" },
          happy: { width: "10px", height: "4px", borderRadius: "2px" },
          sad: { width: "8px", height: "3px", borderRadius: "2px 2px 0 0", y: 2 }
        }}
        className="w-2 h-1 bg-[#FF00FF] rounded-full"
      />
      
      {/* Antenna */}
      <motion.div
        animate={mood}
        variants={{
          idle: { height: "4px", y: 0 },
          happy: { height: "6px", y: -1 },
          sad: { height: "3px", y: 1 }
        }}
        className="absolute top-0 w-1 h-1 bg-[#00F5FF] rounded-full"
      />
    </div>
  );
};

export default AssistantAvatar;
