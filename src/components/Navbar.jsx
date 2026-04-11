import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";

const Navbar = () => {
  const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const { currentUser, logoutUser } = useAuth();

  const [profileMenu, showProfileMenu] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!buttonRef.current) return;
      if (!buttonRef.current.contains(e.target)) return;

      showProfileMenu(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e5e5e5] bg-[#ffffff]/95 backdrop-blur supports-[backdrop-filter]:bg-[#ffffff]/70 dark:border-[#171717] dark:bg-[#040609]/95 dark:supports-[backdrop-filter]:bg-[#040609]/70">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <a className="flex items-center gap-2" href="/">
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
            className="h-6 w-6 text-[#1966ac] dark:text-[#008574]"
            aria-hidden="true"
          >
            <path d="M13 21h8" />
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          </svg>
          <span className="text-xl font-semibold tracking-tight text-[#171717] dark:text-[#f5f5f5]">
            Inkwell
          </span>
        </a>
        <nav className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium text-[#171717] transition hover:bg-[#0775c3] dark:text-[#f5f5f5] dark:hover:bg-[#027566]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
          {currentUser ? (
            <div
              onClick={() => showProfileMenu((prev) => !prev)}
              className="flex items-center gap-2 px-2 rounded-md hover:bg-[#0775c3] dark:hover:bg-[#02493f] hover:text-black transition"
            >
              <div className="rounded-3xl  bg-[#1966ac] px-3 py-2   text-sm text-white dark:text-black  dark:bg-[#008574]">
                {currentUser.name[0].toUpperCase()}
              </div>
              <div className="font-semibold select-none text-sm ">{currentUser.name}</div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink
                to="/login"
                className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-[#171717] transition hover:bg-[#d7d7d7]/30 dark:text-[#f5f5f5] dark:hover:bg-[#25292e]/30"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-[#1966ac] px-4 text-sm font-medium text-white transition hover:bg-[#00579a] dark:bg-[#008574] dark:hover:bg-[#009588]"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </nav>
      </div>
      
      {profileMenu && (
        <div
          ref={buttonRef}
          className="absolute right-65 w-60 rounded-xl border border-gray-300 dark:border-gray-800 bg-white text-black shadow-black dark:bg-[#0a0e11]
          transition-all duration-200 ease-out origin-top-right scale-100 translate-y-0 pointer-events-auto"
        >
          <div className="flex flex-col justify-start items-start select-none cursor-pointer p-2 gap-1 border-b border-gray-300 dark:border-gray-800 px-2 w-full">
            <h2 className="text-black  dark:text-white font-semibold">
              {currentUser.name}
            </h2>
            <h2 className="text-gray-500 dark:text-gray-300 text-sm font-light">
              {currentUser.email}
            </h2>
            <h2 className="text-gray-500 dark:text-gray-300 text-sm">
              {currentUser.accountType}
            </h2>
          </div>
          <div className="text-black dark:text-white p-2 text-base border-b border-gray-300 dark:border-gray-800 flex gap-5 hover:bg-[#008674] m-2 rounded-xl cursor-pointer">
            <MdOutlineDashboard className="text-gray-300" /> Dashboard
          </div>
          <div
            onClick={logoutUser}
            className="text-red-500 select-none p-2 text-base flex gap-5 justify-start items-center hover:bg-[#008674] rounded-xl m-2"
          >
            <FiLogOut className="text-gray-300 " />
            Logout
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
