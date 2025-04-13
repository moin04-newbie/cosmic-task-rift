
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { useTaskStore } from "@/store/taskStore";
import ConstellationBackground from "@/components/UI/ConstellationBackground";
import { playSound } from "@/lib/audio";
import BossEnemy from "@/components/BossEnemy";

const BossBattle = () => {
  const { tasks } = useTaskStore();
  const completedTasksCount = tasks.filter(task => task.completed).length;
  
  const [bossHealth, setBossHealth] = useState(100);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [isBattleActive, setIsBattleActive] = useState(false);
  const [attackPower, setAttackPower] = useState(0);
  const [isAttacking, setIsAttacking] = useState(false);
  const [battleResult, setBattleResult] = useState<null | "victory" | "defeat">(null);
  
  // Calculate player stats based on completed tasks
  useEffect(() => {
    const power = Math.min(10 + completedTasksCount * 2, 50);
    setAttackPower(power);
  }, [completedTasksCount]);
  
  const startBattle = () => {
    if (completedTasksCount < 1) {
      toast({
        title: "Cannot start battle",
        description: "Complete at least one task to challenge the boss",
        variant: "destructive",
      });
      return;
    }
    
    setBossHealth(100);
    setPlayerHealth(100);
    setIsBattleActive(true);
    setBattleResult(null);
    playSound("click");
  };
  
  const attackBoss = () => {
    if (!isBattleActive || isAttacking) return;
    
    setIsAttacking(true);
    playSound("damage");
    
    // Player attacks boss
    const damage = attackPower + Math.floor(Math.random() * 10);
    const newBossHealth = Math.max(0, bossHealth - damage);
    setBossHealth(newBossHealth);
    
    toast({
      title: "You attacked the boss!",
      description: `Dealt ${damage} damage`,
    });
    
    // Check if boss is defeated
    if (newBossHealth <= 0) {
      endBattle("victory");
      return;
    }
    
    // Boss attacks player after delay
    setTimeout(() => {
      const bossDamage = Math.floor(Math.random() * 15) + 5;
      const newPlayerHealth = Math.max(0, playerHealth - bossDamage);
      setPlayerHealth(newPlayerHealth);
      
      toast({
        title: "Boss attacks!",
        description: `You take ${bossDamage} damage`,
        variant: "destructive",
      });
      
      // Check if player is defeated
      if (newPlayerHealth <= 0) {
        endBattle("defeat");
      } else {
        setIsAttacking(false);
      }
    }, 1000);
  };
  
  const endBattle = (result: "victory" | "defeat") => {
    setBattleResult(result);
    setIsBattleActive(false);
    
    if (result === "victory") {
      playSound("victory");
      toast({
        title: "Victory!",
        description: "You defeated the boss!",
      });
    } else {
      toast({
        title: "Defeat",
        description: "The boss has defeated you! Complete more tasks to become stronger.",
        variant: "destructive",
      });
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
      
      <div className="container mx-auto px-4 py-8 relative z-10">
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
            Challenge the cyber boss with your productivity power
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {/* Battle Arena */}
          <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-b from-[#00F5FF]/5 to-[#FF00FF]/5" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#FF00FF]/20 to-transparent" />
            </div>
            
            <div className="relative">
              {/* Battle stats */}
              <div className="flex justify-between mb-6">
                <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                  <div className="text-white/80 font-body text-sm mb-1">Your Health</div>
                  <div className="w-48 h-4 bg-black/40 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: `${playerHealth}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-green-500 to-green-300"
                    />
                  </div>
                  <div className="text-white font-semibold mt-1">{playerHealth}%</div>
                </div>
                
                <div className="bg-black/60 p-3 rounded-lg border border-white/10">
                  <div className="text-white/80 font-body text-sm mb-1">Boss Health</div>
                  <div className="w-48 h-4 bg-black/40 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: `${bossHealth}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-red-500 to-red-300"
                    />
                  </div>
                  <div className="text-white font-semibold mt-1">{bossHealth}%</div>
                </div>
              </div>
              
              {/* Battle arena */}
              <div className="h-64 flex items-center justify-center mb-6 relative">
                {!isBattleActive && !battleResult && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <p className="text-xl text-white/80 mb-4 font-body">
                      {completedTasksCount > 0 
                        ? "Ready to challenge the boss?" 
                        : "Complete tasks to challenge the boss"}
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startBattle}
                      disabled={completedTasksCount < 1}
                      className={`px-6 py-3 rounded-lg text-white font-medium shadow-lg 
                                ${completedTasksCount > 0 
                                  ? "bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] shadow-[#FF00FF]/20" 
                                  : "bg-gray-700 cursor-not-allowed opacity-50"}`}
                    >
                      Start Battle
                    </motion.button>
                  </motion.div>
                )}
                
                {(isBattleActive || battleResult) && (
                  <div className="w-full h-full relative flex items-center justify-center">
                    <BossEnemy 
                      isAttacking={isAttacking} 
                      health={bossHealth} 
                      isDefeated={battleResult === "victory"}
                    />
                  </div>
                )}
                
                {battleResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <div className="bg-black/80 backdrop-blur-xl p-6 rounded-xl border border-white/20 text-center">
                      <h2 className={`text-2xl font-bold mb-3 font-heading ${
                        battleResult === "victory" ? "text-[#00F5FF]" : "text-red-500"
                      }`}>
                        {battleResult === "victory" ? "Victory!" : "Defeat"}
                      </h2>
                      
                      <p className="text-white/80 mb-4 font-body">
                        {battleResult === "victory" 
                          ? "You've defeated the cyber boss!" 
                          : "The boss was too strong. Complete more tasks to increase your power!"}
                      </p>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startBattle}
                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] text-white font-medium"
                      >
                        Try Again
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Player actions */}
              {isBattleActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={attackBoss}
                    disabled={isAttacking}
                    className={`px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] shadow-lg
                             ${isAttacking ? "opacity-50 cursor-not-allowed" : "shadow-[#FF00FF]/20"}`}
                  >
                    {isAttacking ? "Attacking..." : "Attack!"}
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Player stats */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 font-heading">Your Stats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard 
                title="Attack Power" 
                value={`${attackPower}`} 
                description="Based on completed tasks" 
                color="from-[#00F5FF] to-[#00F5FF]/60"
              />
              
              <StatCard 
                title="Tasks Completed" 
                value={`${completedTasksCount}`} 
                description="Determines your power" 
                color="from-[#FF00FF] to-[#FF00FF]/60"
              />
              
              <StatCard 
                title="Critical Chance" 
                value={`${Math.min(5 + completedTasksCount * 2, 30)}%`} 
                description="Chance for double damage" 
                color="from-yellow-400 to-yellow-400/60"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  color: string;
}

const StatCard = ({ title, value, description, color }: StatCardProps) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-4">
      <h3 className="text-white/70 text-sm mb-1 font-body">{title}</h3>
      <div className={`text-transparent bg-clip-text bg-gradient-to-r ${color} text-2xl font-bold mb-1 font-heading`}>
        {value}
      </div>
      <p className="text-white/50 text-xs font-body">{description}</p>
    </div>
  );
};

export default BossBattle;
