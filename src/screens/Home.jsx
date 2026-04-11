import React from "react";
import Navbar from "../components/Navbar";

const articles = [
  {
    href: "/blog/1",
    title: "Getting Started with React Hooks",
    tags: ["React", "JavaScript", "Web Development"],
    description:
      "Learn how React Hooks can simplify your component logic and make your code more reusable.",
    author: "Sarah Chen",
    date: "January 15, 2024",
  },
  {
    href: "/blog/2",
    title: "Building Scalable APIs with Node.js",
    tags: ["Node.js", "API", "Backend"],
    description:
      "Explore best practices for creating robust and scalable REST APIs using Node.js and Express.",
    author: "Sarah Chen",
    date: "January 20, 2024",
  },
  {
    href: "/blog/3",
    title: "The Art of Clean Code",
    tags: ["Programming", "Best Practices", "Software Engineering"],
    description:
      "Discover the principles and practices that separate good code from great code.",
    author: "Marcus Johnson",
    date: "February 1, 2024",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#171717] dark:bg-[#0a0a0a] dark:text-[#f5f5f5]">
      <div className="min-h-[calc(100vh-4rem)]">
        <main className="mx-auto max-w-5xl px-4 py-12">
          <section className="mb-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#171717] dark:text-[#f5f5f5] sm:text-5xl">
              Welcome to <span className="text-[#1966ac] dark:text-[#008574]">Inkwell</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#525252] dark:text-[#a1a1a1]">
              Discover thoughtful articles on technology, programming, and
              software engineering from passionate writers.
            </p>
          </section>

          <section>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-[#171717] dark:text-[#f5f5f5]">
                Latest Articles
              </h2>
              <span className="text-sm text-[#525252] dark:text-[#a1a1a1]">
                {articles.length} articles
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <a
                  key={article.title}
                  href={article.href}
                  className="group h-full"
                >
                  <div className="flex h-full flex-col gap-6 rounded-xl border border-[#d7d7d7] bg-[#ffffff] p-6 text-[#171717] shadow-sm transition duration-300 hover:border-[#1966ac33] hover:shadow-[0_14px_30px_-18px_rgba(25,102,172,0.18)] dark:border-[#25292e] dark:bg-[#171717] dark:text-[#f5f5f5] dark:hover:border-[#00857499] dark:hover:shadow-[0_14px_30px_-18px_rgba(0,133,116,0.22)]">
                    <div className="grid auto-rows-min gap-2 pb-3">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-[#d7d7d7] bg-[#ebebeb] px-2 py-1 text-xs font-medium text-[#262626] dark:border-[#25292e] dark:bg-[#171b1f] dark:text-[#e5e5e5]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-xl w-2/3 font-semibold leading-tight tracking-tight text-[#171717] transition-colors group-hover:text-[#1966ac] dark:text-[#f5f5f5] dark:group-hover:text-[#008574]">
                        {article.title}
                      </h2>
                    </div>

                    <div className="px-0 pb-4">
                      <p className="line-clamp-3 text-[#525252] dark:text-[#a1a1a1]">
                        {article.description}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between text-sm text-[#8f8f8f] dark:text-[#8f8f8f]">
                      <div className="flex items-center gap-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
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
                          <path d="M8 14h.01" />
                          <path d="M12 14h.01" />
                          <path d="M16 14h.01" />
                          <path d="M8 18h.01" />
                          <path d="M12 18h.01" />
                          <path d="M16 18h.01" />
                        </svg>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
