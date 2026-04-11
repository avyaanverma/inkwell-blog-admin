import { createContext, useContext, useState } from "react";

const PostContext = createContext(null);

const PostProvider = ({children})=>{
    const [posts, setPosts] = useState(localStorage.getItem("posts") | []);

    // addPost
    const addPost = (post)=>{
        const id = posts.length;
        setPosts([...posts, {
            id: id,
            createdAt: new Date(),
            ...post
        }])
    }
    
    // editPost
    const editPost = (updatedPost)=>{
        setPosts((prev)=>
            prev.map((post)=> {
                if(post.id === updatedPost.id){
                    return { ...post, ...updatedPost}
                }else{
                    return post;
                }
            }
        ))
    }

    // deletePost
    const deletePost = (post)=>{
        const id = post.id;
        const updatedPost = posts.filter( (post) => id != post.id);

        setPosts([...updatedPost])
    }

    return <PostContext.Provider values = {{posts, addPost, editPost, deletePost}}>
        {children}
    </PostContext.Provider>
}

export const usePost = useContext(PostContext);