"use client";

import { Form } from '@components';
import { useState } from 'react';

const CreatePrompt = () => {

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })

  const createPrompt = async (e) =>{
    e.preventDefault();
    //To use the submitting value for loader
    setSubmitting(true);

    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        })
      })

      if(res.ok) { 
        Router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt