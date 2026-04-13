import React from "react";
import { FiEdit, FiFileText, FiPlus } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router";
import { usePost } from "../context/PostContext";
import { MdDeleteForever } from "react-icons/md";


const Dashboard = () => {
  let {currentUser} = useAuth();
  let {stats, posts, deletePost} = usePost();
  let navigate = useNavigate();

  const formatDate = (value) => {
    if (!value) return "-";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#171717] dark:text-[#f5f5f5]">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-[#6b6b6b] dark:text-[#9aa0a6]">
              Manage your articles, {currentUser.name}
            </p>
          </div>
          <NavLink to="/dashboard/posts/new" className="inline-flex items-center gap-2 rounded-lg bg-[#1966ac] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0f5897] dark:bg-[#008574] dark:hover:bg-[#009588]">
            <FiPlus className="text-base" />
            New Article
          </NavLink>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-[#e4e4e4] bg-white/90 p-6 shadow-[0_10px_30px_rgba(13,20,26,0.08)] dark:border-[#1b1f24] dark:bg-[#0a0e11]/80"
            >
              <p className="text-sm text-[#6b6b6b] dark:text-[#9aa0a6]">{card.label}</p>
              <p className={`mt-3 text-2xl font-semibold ${card.accent}`}>{card.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-2">
          <h2 className="text-lg font-semibold text-[#171717] dark:text-[#f5f5f5]">
            Your Articles
          </h2>
          {posts?.length ? (
            <div className="mt-4 space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id ?? post.title}
                  className="flex items-start justify-between gap-6 rounded-2xl border border-[#e4e4e4] bg-white/90 p-6 shadow-[0_10px_30px_rgba(13,20,26,0.08)] dark:border-[#1b1f24] dark:bg-[#0a0e11]/80"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p onClick={()=>{
                        navigate(`/dashboard/posts/${post.id}/edit`);
                      }} className="text-base font-semibold text-[#171717] hover:text-blue-500 hover:cursor-pointer dark:text-[#f5f5f5]">
                        {post.title || "Untitled"}
                      </p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          post.status === "published"
                            ? "bg-[#1966ac] text-white dark:bg-[#008574]"
                            : "bg-[#eeeeee] text-[#2f2f2f] dark:bg-[#1b1f24] dark:text-[#cbd2d9]"
                        }`}
                      >
                        {post.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-sm text-[#6b6b6b] dark:text-[#9aa0a6]">
                      {post.excerpt || "No excerpt added."}
                    </p>
                    <p className="text-xs text-[#6b6b6b] dark:text-[#9aa0a6]">
                      Last updated: {formatDate(post.updatedAt || post.createdAt)}
                    </p>
                  </div>
                  <div className="p-2 flex flex-col items-center justify-center gap-4">
                    <button className="rounded-lg px-2 py-1 text-xl text-[#6b6b6b] hover:bg-[#f3f3f3] dark:text-[#9aa0a6] dark:hover:bg-[#131820]">
                      ...
                    </button>
                    <p  className="">
                      <FiEdit onClick={()=>{
                        navigate(`/dashboard/posts/${post.id}/edit`);
                      }} className="hover:text-green-500"/>
                    </p>
                    <p  className="">
                      <MdDeleteForever onClick={()=>{
                        deletePost(post);
                      }} className="hover:text-red-500"/>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-[#e4e4e4] bg-white/90 p-10 shadow-[0_10px_30px_rgba(13,20,26,0.08)] dark:border-[#1b1f24] dark:bg-[#0a0e11]/80">
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#e4e4e4] bg-white text-[#5c5c5c] dark:border-[#1b1f24] dark:bg-[#0b1015] dark:text-[#9aa0a6]">
                  <FiFileText className="text-2xl" />
                </div>
                <div>
                  <p className="text-base font-semibold text-[#171717] dark:text-[#f5f5f5]">
                    No articles yet
                  </p>
                  <p className="mt-1 text-sm text-[#6b6b6b] dark:text-[#9aa0a6]">
                    Start writing your first article
                  </p>
                </div>
                <NavLink to="/dashboard/posts/new" className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#1966ac] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0f5897] dark:bg-[#008574] dark:hover:bg-[#009588]">
                  <FiPlus className="text-base" />
                  Create Article
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


