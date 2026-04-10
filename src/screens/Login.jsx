import React from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Login = () => {
  const { register, reset, handleSubmit } = useForm({
    mode: "onChange",
  });
  const { loginUser } = useAuth();
  const [submitError, setSubmitError] = React.useState("");
  const [submitSuccess, setSubmitSuccess] = React.useState("");
  let navigate = useNavigate();

  const handleFormSubmit = (data) => {
    setSubmitError("");
    setSubmitSuccess("");
    const result = loginUser(data);
    reset();
    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }
    setSubmitSuccess("Login successful");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center px-4 py-12">
        <section className="w-full max-w-md rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 shadow-sm">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
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
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path d="M13 21h8" />
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Welcome Back</h1>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Sign in to your account to continue
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                {...register("email", {
                  required: "Please Enter Your Email",
                })}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[var(--card-border)] bg-transparent px-4 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input
                {...register("password", {
                  required: "Please Enter Your Password",
                })}
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-[var(--card-border)] bg-transparent px-4 py-2 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Sign In
            </button>
            {submitError && (
              <p className="text-sm text-red-500">{submitError}</p>
            )}
            {submitSuccess && (
              <p className="text-sm text-green-500">{submitSuccess}</p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Don&apos;t have an account?{" "}
            <a className="font-semibold text-[var(--accent)]" href="/register">
              Sign up
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Login;
