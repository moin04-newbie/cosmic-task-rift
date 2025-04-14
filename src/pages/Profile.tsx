
import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { playSound } from "@/lib/audio";
import { User, Settings, Edit, ChevronDown } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const currentTheme = useThemeStore(state => state.getTheme());
  
  // Mock user data - in a real app this would come from a user store or API
  const [userData, setUserData] = useState({
    name: "CyberUser",
    avatar: "/placeholder.svg",
    level: 12,
    tasksCompleted: 47,
    streak: 5,
    bio: "Productivity enthusiast on a mission to conquer my task list!",
    badges: ["Early Adopter", "Task Master", "5-Day Streak"]
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    playSound("click");
  };

  const handleStatsToggle = () => {
    setIsStatsOpen(!isStatsOpen);
    playSound("click");
  };
  
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-center font-heading bg-gradient-to-r from-[#00F5FF] to-[#FF00FF] bg-clip-text text-transparent">
          Your Profile
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="md:col-span-1 border border-[#00F5FF]/20 bg-black/40 backdrop-blur-md">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 relative group">
                <Avatar className="w-24 h-24 border-2 mx-auto" style={{ borderColor: currentTheme.primary }}>
                  <AvatarImage src={userData.avatar} alt={userData.name} className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-[#00F5FF] to-[#FF00FF] text-white text-2xl">
                    {userData.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 cursor-pointer">
                  <Edit className="w-6 h-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl text-center">{userData.name}</CardTitle>
              <div className="text-sm text-[#00F5FF]">Level {userData.level}</div>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-400 italic">{userData.bio}</p>
              </div>
              <div className="flex justify-center gap-2 flex-wrap mb-4">
                {userData.badges.map((badge) => (
                  <Badge 
                    key={badge} 
                    className="bg-gradient-to-r from-[#00F5FF]/20 to-[#FF00FF]/20 text-white border-none"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full border-[#00F5FF]/50 text-[#00F5FF] hover:bg-[#00F5FF]/10 mt-2"
                onClick={handleEditToggle}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Stats and Settings */}
          <Card className="md:col-span-2 border border-[#FF00FF]/20 bg-black/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center text-[#FF00FF]">
                <User className="mr-2" /> User Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-[#00F5FF]">{userData.tasksCompleted}</div>
                  <div className="text-xs text-gray-400">Tasks Completed</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-[#FF00FF]">{userData.streak}</div>
                  <div className="text-xs text-gray-400">Day Streak</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-gradient-primary">3</div>
                  <div className="text-xs text-gray-400">Trophies</div>
                </div>
              </div>

              <Collapsible open={isStatsOpen} onOpenChange={setIsStatsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    <span>Detailed Statistics</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isStatsOpen ? "transform rotate-180" : ""}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-white/5">
                      <div className="text-sm font-medium">Most Productive Day</div>
                      <div className="text-xs text-gray-400">Wednesday</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5">
                      <div className="text-sm font-medium">Average Tasks/Day</div>
                      <div className="text-xs text-gray-400">4.2</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5">
                      <div className="text-sm font-medium">Completion Rate</div>
                      <div className="text-xs text-gray-400">87%</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5">
                      <div className="text-sm font-medium">Tasks This Week</div>
                      <div className="text-xs text-gray-400">12</div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="pt-4 border-t border-gray-800">
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <Settings className="w-5 h-5 mr-2" /> Account Settings
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Notification Sounds</span>
                    <span className="text-[#00F5FF]">Enabled</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>App Language</span>
                    <span className="text-[#00F5FF]">English</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Account Created</span>
                    <span className="text-gray-400">April 14, 2024</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
