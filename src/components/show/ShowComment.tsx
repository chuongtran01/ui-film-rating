"use client";

import { MoreHorizontal, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const comments = [
  {
    id: 1,
    user: { name: "Aventurescence", avatar: null },
    time: "2 hours ago",
    text: `Honestly, I am really suprised that most people in the comments actually don't like it lol. I am glad I didn't listen - because of that I didn't even feel like I wanted to pick this up, but I eventually did. I loved first season but seriously - THIS ONE IS MUCH BETTER. 1 season had strong start and ending, but the middle was actually mid (irony) and I have never felt the need to rewatch it, apart of cool pen-fight scene. ...`,
    likes: 2,
    replies: 0,
  },
  {
    id: 2,
    user: { name: "Cambrie Paige", avatar: null },
    time: "2 hours ago",
    text: "Reveal Spoiler",
    likes: 1,
    replies: 0,
    spoiler: true,
  },
];

export default function ShowComment() {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="border-l-4 border-yellow-400 h-10 mr-2"></div>
        <h2 className="text-2xl font-bold mr-2">Comments</h2>
        <h2 className="text-sm text-gray-500">(100)</h2>
      </div>
      <div className="mb-8 text-sm">
        <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => router.push("/login")}>
          Login
        </span>{" "}
        or{" "}
        <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => router.push("/register")}>
          Register
        </span>{" "}
        to post comments
      </div>
      <div className="flex flex-col gap-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-lg text-blue-700">
              {comment.user.avatar ? <img src={comment.user.avatar} alt={comment.user.name} className="w-full h-full rounded-full object-cover" /> : comment.user.name[0]}
            </div>
            {/* Comment content */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-blue-700 cursor-pointer hover:underline">{comment.user.name}</span>
                <span className="text-xs text-gray-500">{comment.time}</span>
              </div>
              <div className="mt-1 text-gray-800 text-sm whitespace-pre-line">
                {comment.spoiler ? <button className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-semibold">Reveal Spoiler</button> : comment.text}
              </div>
              {/* Actions */}
              <div className="flex items-center gap-4 mt-2 text-gray-500 text-xs">
                <button className="flex items-center gap-1 hover:text-red-500">
                  <ThumbsUp className="w-4 h-4" /> {comment.likes}
                </button>
                <button className="hover:text-blue-700">Reply</button>
                <button className="hover:text-blue-700">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
