import { createContext, useContext, useState } from "react";

const PostContext = createContext(null);
const statCards = [
  { label: "Total Articles", value: "0", accent: "text-[#171717] dark:text-[#f5f5f5]" },
  { label: "Published", value: "0", accent: "text-[#1966ac] dark:text-[#00a48f]" },
  { label: "Drafts", value: "0", accent: "text-[#171717] dark:text-[#f5f5f5]" },
];
export const PostProvider = ({children})=>{
    const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("posts")) || []);

    const calPosts = (posts)=>{
        let drafts = posts.reduce((a, post)=> {
            return post.status == "draft" ? a+1 : a;
        },0);
        let publishedPosts = posts.reduce((a, post)=> {
            return post.status == "published" ? a+1 : a;
        },0);
        return {drafts, publishedPosts};
    }
        
    let {publishedPosts, drafts} = calPosts(posts);
    const [stats, setStats] = useState([
        { label: "Total Articles", value: drafts + publishedPosts, accent: "text-[#171717] dark:text-[#f5f5f5]" },
        { label: "Published", value: publishedPosts, accent: "text-[#1966ac] dark:text-[#00a48f]" },
        { label: "Drafts", value: drafts, accent: "text-[#171717] dark:text-[#f5f5f5]" },
    ])


    // addPost
    const addPost = (post)=>{
        const id = Date.now();
        const updatedPosts = [...posts, {
            id: id,
            createdAt: new Date(),
            updatedAt: new Date(),
            ...post
        }]
        setPosts(updatedPosts)

        let {publishedPosts, drafts} = calPosts(updatedPosts);
        setStats([
            { label: "Total Articles", value: publishedPosts + drafts, accent: "text-[#171717] dark:text-[#f5f5f5]" },
            { label: "Published", value: publishedPosts, accent: "text-[#1966ac] dark:text-[#00a48f]" },
            { label: "Drafts", value: drafts, accent: "text-[#171717] dark:text-[#f5f5f5]" },
        ])
        localStorage.setItem("posts", JSON.stringify(updatedPosts));
    }
    
    // editPost
    const editPost = (updatedPost)=>{
        const updatedPosts = posts.map((post)=> {
                if(post.id === updatedPost.id){
                    return { ...post, ...updatedPost, updatedAt: new Date() }
                }else{
                    return post;
                }
            })
        setPosts(updatedPosts)
        let {publishedPosts, drafts} = calPosts(updatedPosts);
        setStats([
            { label: "Total Articles", value: publishedPosts + drafts, accent: "text-[#171717] dark:text-[#f5f5f5]" },
            { label: "Published", value: publishedPosts, accent: "text-[#1966ac] dark:text-[#00a48f]" },
            { label: "Drafts", value: drafts, accent: "text-[#171717] dark:text-[#f5f5f5]" },
        ])
        localStorage.setItem("posts", JSON.stringify(updatedPosts));

    }

    // deletePost
    const deletePost = (post)=>{
        const id = post.id;
        const updatedPosts = posts.filter( (post) => id != post.id);

        let {publishedPosts, drafts} = calPosts(updatedPosts);
        setPosts([...updatedPosts])
        setStats([
            { label: "Total Articles", value: publishedPosts + drafts, accent: "text-[#171717] dark:text-[#f5f5f5]" },
            { label: "Published", value: publishedPosts, accent: "text-[#1966ac] dark:text-[#00a48f]" },
            { label: "Drafts", value: drafts, accent: "text-[#171717] dark:text-[#f5f5f5]" },
        ])
        localStorage.setItem("posts", JSON.stringify(updatedPosts));

    }

    return <PostContext.Provider value = {{posts, stats, addPost, editPost, deletePost}}>
        {children}
    </PostContext.Provider>
}

export const usePost = ()=> useContext(PostContext);
