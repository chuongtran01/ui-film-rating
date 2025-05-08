import React from "react";
import { Star, List, Eye, Grid, ChevronRight } from "lucide-react";
import UserProfileHeader from "./UserProfileHeader";

export interface User {
  username: string;
  joined: string;
  avatar: string;
  stats: {
    followers: number;
    following: number;
    watchlist: number;
  };
  reviewsCount: number;
}

interface UserProfileProps {
  user: User;
}

const user: User = {
  username: "atisch00",
  joined: "Jan 2022",
  avatar: "", // Use a placeholder or user image
  stats: {
    followers: 79,
    following: 20,
    watchlist: 10,
  },
  reviewsCount: 61,
};

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-white">
      <UserProfileHeader user={user} />
    </div>
  );
};

export default UserProfile;
