"use client";

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => (
        <PromptCard 
          key={post._id}  
          post={post}  
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}


const Feed = () => {
  
  const [posts, setPosts] = useState([]);
  // search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);


  // Fetching all the posts on initial page load
  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) =>{
    const regex = new RegExp(searchText, "i"); //i => flag for case-insensitive search
    // Search for the searchText within the available UserName, Prompts and Tags
    return posts.filter(
      item => 
        regex.test(item.creator.username) ||
        regex.test(item.prompt) ||
        regex.test(item.tag) 
    );
  };


  const handleSearchChange = e =>{
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeOut(
      setTimeout(() => {
        const searchOutcome = filterPrompts(e.target.value);
        setSearchedResults(searchOutcome);
      }, 500)
    );
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const tagSearchResults = filterPrompts(tagName);
    setSearchedResults(tagSearchResults);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex center">
        <input 
          type="text" 
          value={searchText} 
          placeholder="Search for a tag or username" 
          onChange={handleSearchChange}
          required	
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ):(
        <PromptCardList
          data={posts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed