"use client";
import React, { useState, useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);
  const handleEdit = (content) => {
    router.push(`/update-prompt?id=${content._id}`);
  };
  const handleDelete = async (content) => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this prompt ?"
    );
    if (isConfirmed) {
      try {
        await fetch(`api/prompt/${content._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p.id !== content._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalise profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
