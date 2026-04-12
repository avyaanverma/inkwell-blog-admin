import React from "react";
import { NavLink, useParams } from "react-router";
import { FiArrowLeft } from "react-icons/fi";
import { usePost } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";
import Markdown from "react-markdown";

const Post = () => {
  const { id } = useParams();
  const { posts } = usePost();
  const { currentUser } = useAuth();
  const post = (posts || []).find((item) => String(item.id) === String(id));

  const formatDate = (value) => {
    if (!value) return "";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#171717] dark:bg-[#0a0a0a] dark:text-[#f5f5f5]">
      <div className="mx-auto w-full max-w-3xl px-4 pb-20 pt-10">
        <NavLink
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#6b6b6b] transition hover:text-[#171717] dark:text-[#9aa0a6] dark:hover:text-[#f5f5f5]"
        >
          <FiArrowLeft className="text-base" />
          Back to Articles
        </NavLink>

        {post?.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#e4e4e4] bg-[#f3f3f3] px-3 py-1 text-xs font-semibold text-[#1f1f1f] dark:border-[#1b1f24] dark:bg-[#131820] dark:text-[#e5e5e5]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {post?.title ? (
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#171717] dark:text-[#f5f5f5] sm:text-4xl">
            {post.title}
          </h1>
        ) : null}

        {(post?.createdAt || currentUser?.name) && (
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#6b6b6b] dark:text-[#9aa0a6]">
            {currentUser?.name && (
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1966ac] text-xs font-semibold text-white dark:bg-[#008574]">
                  {currentUser.name[0]?.toUpperCase()}
                </span>
                <span>{currentUser.name}</span>
              </div>
            )}
            {post?.createdAt && (
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-10 prose prose-neutral dark:prose-invert">
          <Markdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-[#171717] dark:text-[#f5f5f5]">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h1 className="text-2xl font-bold text-[#171717] dark:text-[#f5f5f5]">
                        {children}
                      </h1>
                    ),
                    h3: ({ children }) => (
                      <h1 className="text-xl font-bold text-[#171717] dark:text-[#f5f5f5]">
                        {children}
                      </h1>
                    ),
                    p: ({ children }) => (
                      <p className="mt-4 text-base leading-7 text-[#525252] dark:text-[#a1a1a1]">
                        {children}
                      </p>
                    ),
                    }}
            >
            {post.content}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

export default Post;
