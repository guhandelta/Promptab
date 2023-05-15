"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Profile } from '@components';

const MyProfile = () => {

    const { data: session } = useSession();
    const router = useRouter();

    const [posts, setPosts] = useState([]);

    const handleEdit = (post) =>{
     router.push(`/update/id=${post._id}`);   
    }

    const handleDelete = async (post) =>{

    }

    // Fetching all the posts on initial page load
    const fetchPosts = async () => {
        // Fetch the posts corresponding to that specific user, currently choosen
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();

        setPosts(data);
    };

    useEffect(() => {
      if(session?.user.id) fetchPosts();
    }, []);

  return (
    <Profile 
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    /> 
  )
}

export default MyProfile;