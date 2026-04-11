import React from "react";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register, reset, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });
  const { registerUser } = useAuth();
  const [submitError, setSubmitError] = React.useState("");
  const [submitSuccess, setSubmitSuccess] = React.useState("");

  const handleFormSubmit = (data) => {
    setSubmitError("");
    setSubmitSuccess("");
    const result = registerUser(data);
    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }
    setSubmitSuccess("Account created successfully");
    reset();
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#171717] dark:bg-[#0a0a0a] dark:text-[#f5f5f5]">
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center px-4 py-12">
        <section className="w-full max-w-xl rounded-2xl border border-[#d7d7d7] bg-[#ffffff] p-8 shadow-sm dark:border-[#25292e] dark:bg-[#171717]">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1966ac]/15 text-[#1966ac] dark:bg-[#008574]/15 dark:text-[#008574]">
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
              <h1 className="text-2xl font-semibold">Create an Account</h1>
              <p className="mt-1 text-sm text-[#525252] dark:text-[#a1a1a1]">
                Join Inkwell to start reading or writing
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input
                {...register("name", {
                  required: "Please Enter Your Name",
                })}
                type="text"
                placeholder="John Doe"
                className="w-full rounded-lg border border-[#d7d7d7] bg-transparent px-4 py-2 text-sm text-[#171717] outline-none transition focus:border-[#1966ac] dark:border-[#25292e] dark:text-[#f5f5f5] dark:focus:border-[#008574]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                {...register("email", {
                  required: "Please Enter Your Email",
                })}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#d7d7d7] bg-transparent px-4 py-2 text-sm text-[#171717] outline-none transition focus:border-[#1966ac] dark:border-[#25292e] dark:text-[#f5f5f5] dark:focus:border-[#008574]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input
                {...register("password", {
                  required: "Please Enter Your Password",
                })}
                type="password"
                placeholder="Create a password"
                className="w-full rounded-lg border border-[#d7d7d7] bg-transparent px-4 py-2 text-sm text-[#171717] outline-none transition focus:border-[#1966ac] dark:border-[#25292e] dark:text-[#f5f5f5] dark:focus:border-[#008574]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                {...register("confirmPassword", {
                  required: "Please Confirm Your Password",
                  validate: (data) =>
                    data === getValues("password") || "Passwords do not match",
                })}
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-lg border border-[#d7d7d7] bg-transparent px-4 py-2 text-sm text-[#171717] outline-none transition focus:border-[#1966ac] dark:border-[#25292e] dark:text-[#f5f5f5] dark:focus:border-[#008574]"
              />
            </div>

            <div className="space-y-3">
              <span className="text-sm font-medium">Account Type</span>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="cursor-pointer">
                  <input
                    {...register("accountType", {
                      required: "Select a role type",
                    })}
                    type="radio"
                    value="Reader"
                    name="accountType"
                    defaultChecked
                    className="peer sr-only"
                  />
                  <span className="block rounded-xl border border-[#d7d7d7] bg-transparent px-4 py-3 text-left text-sm font-semibold text-[#171717] transition peer-checked:border-[#1966ac] peer-checked:bg-[#1966ac]/10 peer-focus-visible:ring-2 peer-focus-visible:ring-[#1966ac]/40 dark:border-[#25292e] dark:text-[#f5f5f5] dark:peer-checked:border-[#008574] dark:peer-checked:bg-[#008574]/10 dark:peer-focus-visible:ring-[#008574]/40">
                    Reader
                    <span className="mt-1 block text-xs font-normal text-[#525252] dark:text-[#a1a1a1]">
                      Read articles
                    </span>
                  </span>
                </label>
                <label className="cursor-pointer">
                  <input
                    {...register("accountType", {
                      required: "Select a role type",
                    })}
                    value="Author"
                    type="radio"
                    name="accountType"
                    className="peer sr-only"
                  />
                  <span className="block rounded-xl border border-[#d7d7d7] bg-transparent px-4 py-3 text-left text-sm font-semibold text-[#171717] transition peer-checked:border-[#1966ac] peer-checked:bg-[#1966ac]/10 peer-focus-visible:ring-2 peer-focus-visible:ring-[#1966ac]/40 dark:border-[#25292e] dark:text-[#f5f5f5] dark:peer-checked:border-[#008574] dark:peer-checked:bg-[#008574]/10 dark:peer-focus-visible:ring-[#008574]/40">
                    Author
                    <span className="mt-1 block text-xs font-normal text-[#525252] dark:text-[#a1a1a1]">
                      Write &amp; publish
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#1966ac] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#00579a] dark:bg-[#008574] dark:hover:bg-[#009588]"
            >
              Create Account
            </button>
            {submitError && (
              <p className="text-sm text-red-500">{submitError}</p>
            )}
            {submitSuccess && (
              <p className="text-sm text-green-500">{submitSuccess}</p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-[#525252] dark:text-[#a1a1a1]">
            Already have an account?{" "}
            <a className="font-semibold text-[#1966ac] dark:text-[#008574]" href="/login">
              Sign in
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default Register;
