"use client";

import { Form } from "@components";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"

const EditPrompt = () => {

  const router = useRouter()
  // To fetch the prompId from the request URL
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  })

  /*Unlike the Crete Prompt, the Edit Prompt requires previous the data from the prompt to edit the prompt*/
  useEffect(()=>{
    const getPromptDetails = async () =>{
      // Calling the API to fetch the data of the specific prompt, to edit
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    }

    // Call the fn() only if a promptId exists
    if(promptId) getPromptDetails();
  },[promptId]);

  const updatePrompt = async (e) =>{
    e.preventDefault();
    //To use the submitting value for loader
    setSubmitting(true);

    if(!promptId) return alert("Prompt ID not found!!");

    try {
      // userId: session?.user.id, userId is not required, as the it is already available
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if(response.ok) { 
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form 
      type="edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default EditPrompt