import { Star, List, Eye, Grid, ChevronRight, User as UserIcon, Calendar } from "lucide-react";
import { User } from "@/components/profile/UserProfile";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserProfileHeaderProps {
  user: User;
}

const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  return (
    <div className="bg-[#222] w-full relative">
      <div className="container mx-auto py-10 px-6 flex flex-col md:flex-row items-center md:items-end justify-between">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <Avatar className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              <UserIcon className="w-20 h-20 rounded-full" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold text-white">{user.username}</h1>
            <div className="text-gray-300 flex flex-row items-center gap-2 mt-2">
              <Calendar className="w-4 h-4" />
              <span>Joined {user.joined}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8 md:mt-0">
          <Card className="bg-[#292929] px-8 py-4 flex border-none flex-col items-center text-white">
            <CardTitle className="font-bold text-lg">Followers</CardTitle>
            <CardDescription className="text-2xl text-white">{user.stats.followers}</CardDescription>
          </Card>
          <Card className="bg-[#292929] px-8 py-4 flex border-none flex-col items-center text-white">
            <CardTitle className="font-bold text-lg">Following</CardTitle>
            <CardDescription className="text-2xl text-white">{user.stats.following}</CardDescription>
          </Card>
          <Card className="bg-[#292929] px-8 py-4 flex border-none flex-col items-center text-white">
            <CardTitle className="font-bold text-lg">Watch List</CardTitle>
            <CardDescription className="text-2xl text-white">{user.stats.watchlist}</CardDescription>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
