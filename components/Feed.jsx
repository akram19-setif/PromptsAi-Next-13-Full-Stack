"use client";
import React, { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleClick }) => {
  const { data: session } = useSession();
  return (
    <div className='mt-16 prompt_layout'>
      {session?.user.id === data[0]?.creator?._id &&
        data.map((prompt, index) => (
          <PromptCard
            key={prompt._id}
            content={prompt}
            handleTagClick={handleClick}
          />
        ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();

  const handleSearchChange = (e) => {};
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for prompts or tag'
          className='search_input peer'
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      {session?.user ? (
        <PromptCardList
          data={posts}
          handleClick={() => {}}
        />
      ) : (
        <p className='desc min-w-full  text-center'>
          {" "}
          No Prompt exist Now! Sign In and Create And Share Your Own Prompts
        </p>
      )}
    </section>
  );
};

export default Feed;
