import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiPlus, FiSave } from "react-icons/fi";
import { IoMdClose, IoMdSend } from "react-icons/io";
import { NavLink, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { usePost } from "../context/PostContext";

const NewPost = () => {
    const {register,
            reset, 
            handleSubmit,
            setValue,
            getValues,
            formState : {errors, isValid},
        } = useForm();
    console.log(isValid);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams();
    const isEdit = Boolean(id);

    let {posts, addPost, editPost} = usePost();
    
    const existingPost = posts.find((post)=> post.id === id);
    
    useEffect(()=>{
      if(isEdit && existingPost){
        reset({
          title: existingPost.title,
          excerpt: existingPost.excerpt,
          content: existingPost.content,
        })

        const existingTags = existingPost.tags;
        setTags(existingTags);
        setValue("tags", existingTags);
      }
    }, [isEdit, existingPost, reset, setValue]);

    const addTag = (e)=> {
                if(e.key == "Enter"){
                  e.preventDefault();
                  const value = e.target.value.trim();
                  if(!value || tags.includes(value) || tags.length >=5) return;
                  const updatedTags = [...tags, value];
                  setTags(updatedTags);
                  e.target.value = "";
                  setValue("tags", updatedTags)
                }
              }

    const removeTag = (index)=>{
      const newTags = tags.filter((tag)=> tag.id != index);

      setTags(newTags);
      setValue("tags", newTags);
    }

    const handleFormSubmit = (data)=> {
      data.status = "published";
      if(isEdit && existingPost){
        editPost({...existingPost, ...data});
        console.log(data);
        toast.success("Edited successfully.")
      }else{
        addPost(data);
        console.log(data);
        reset();
        toast.success("Post created successfully.")
      }

      navigate("/dashboard");
    }
    const handleDraftSubmit = (data)=> {
      data.status = "draft";
      if(isEdit && existingPost){
        editPost({...existingPost, ...data});
        console.log(data);
        toast.success("Edited successfully.");
        
      }else{
        addPost(data);
        console.log(data);
        reset();
        toast.success("Draft created successfully.")

      }
      navigate("/dashboard");
    }

    return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="mx-auto w-full max-w-4xl px-4 pb-16 pt-8">
      <NavLink to="/dashboard" className="mb-6 flex items-center gap-2 text-sm text-[#6b6b6b] dark:text-[#9aa0a6] hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer">
        <FiArrowLeft className="text-base" />
        <span className="">Back to Dashboard</span>
      </NavLink>

      <div className="rounded-2xl border border-[#e4e4e4] bg-white/90 p-6 shadow-[0_12px_30px_rgba(13,20,26,0.08)] dark:border-[#1b1f24] dark:bg-[#0a0e11]/85 md:p-8">
        <h1 className="text-xl font-semibold text-[#171717] dark:text-[#f5f5f5]">
          Create New Article
        </h1>

        <div className="mt-6 space-y-6">
          <div >
            <label className="text-sm font-semibold text-[#171717] dark:text-[#f5f5f5]">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter a compelling title..."
              className="mt-2 w-full rounded-lg border border-[#d9d9d9] bg-white px-4 py-2 text-sm text-[#171717] outline-none transition focus:border-[#1966ac] focus:ring-2 focus:ring-[#1966ac]/30 dark:border-[#2a2f36] dark:bg-[#0f141a] dark:text-[#f5f5f5] dark:focus:border-[#00a48f] dark:focus:ring-[#00a48f]/30"
              {...register("title", {
                required: "Enter Title"
              })}
            />
          </div>
            

          <div>
            <label className="text-sm font-semibold text-[#171717] dark:text-[#f5f5f5]">
              Excerpt
            </label>
            <textarea
              rows="3"
              placeholder="Write a brief summary of your article..."
              className="mt-2 w-full resize-none rounded-lg border border-[#d9d9d9] bg-white px-4 py-2 text-sm text-[#171717] outline-none transition focus:border-[#1966ac] focus:ring-2 focus:ring-[#1966ac]/30 dark:border-[#2a2f36] dark:bg-[#0f141a] dark:text-[#f5f5f5] dark:focus:border-[#00a48f] dark:focus:ring-[#00a48f]/30"
              {...register("excerpt", {
                required: "Enter Excerpt"
              })}
              />
            <p className="mt-2 text-xs text-[#6b6b6b] dark:text-[#9aa0a6]">
              A short description that appears on the blog listing
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#171717] dark:text-[#f5f5f5]">
              Content
            </label>
            <textarea
              rows="5"
              placeholder="Write your article content here... (Markdown supported)"
              className="mt-2 w-full resize-none rounded-lg border border-[#d9d9d9] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition focus:border-[#1966ac] focus:ring-2 focus:ring-[#1966ac]/30 dark:border-[#2a2f36] dark:bg-[#0f141a] dark:text-[#f5f5f5] dark:focus:border-[#00a48f] dark:focus:ring-[#00a48f]/30"
              {...register("content", {
                required: "Enter content"
              })}
              />
            <p className="mt-2 text-xs text-[#6b6b6b] dark:text-[#9aa0a6]">
              Supports Markdown: # for headers, **bold**, *italic*, `code`, etc.
            </p>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#171717] dark:text-[#f5f5f5]">
              Tags
            </label>
            <div className="flex gap-2">
              {
                tags.map((tag, index) => <div key={index} className="flex gap-2 justify-center items-center text-black dark:text-black bg-[#eeeeee] text-xs px-2 py-1 rounded-xl dark:text-white"> {tag} <IoMdClose onClick={()=> removeTag(index)}/></div>)
              }
            </div>
            <input
              type="text"
              placeholder="Add tags (press Enter to add)"
              className="mt-2 w-full rounded-lg border border-[#d9d9d9] bg-white px-4 py-2 text-sm text-[#171717] outline-none transition focus:border-[#1966ac] focus:ring-2 focus:ring-[#1966ac]/30 dark:border-[#2a2f36] dark:bg-[#0f141a] dark:text-[#f5f5f5] dark:focus:border-[#00a48f] dark:focus:ring-[#00a48f]/30"
              onKeyDown={addTag}
            />
            <p className="mt-2 text-xs text-[#6b6b6b] dark:text-[#9aa0a6]">
              Add up to 5 tags to help readers find your article
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-stretch justify-end gap-3 sm:flex-row sm:items-center">
          <button disabled={!isValid} onClick={handleSubmit(handleDraftSubmit)} className="disabled:opacity-50 inline-flex items-center justify-center gap-2 rounded-lg border border-[#d9d9d9] bg-white px-4 py-2 text-sm font-semibold text-[#171717] transition hover:border-[#b8b8b8] hover:bg-[#f3f3f3] dark:border-[#2a2f36] dark:bg-[#0f141a] dark:text-[#f5f5f5] dark:hover:border-[#3a424c] dark:hover:bg-[#141a22]">
            <FiSave className="text-base" />
            Save as Draft
          </button>
          <button disabled={!isValid} onClick={handleSubmit(handleFormSubmit)} className="disabled:opacity-50 inline-flex items-center justify-center gap-2 rounded-lg bg-[#1966ac] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0f5897] dark:bg-[#008574] dark:hover:bg-[#009588]">
            <IoMdSend className="text-base" />
            Publish
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewPost;
