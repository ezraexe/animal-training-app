"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isValidEmail, isValidPassword } from "@/lib/credentialAuth";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Please enter a valid password");
      return;
    }

    if (password != confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/user", {
        // api/user is route for signup
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, admin }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  // html code
  return (
    <div className="min-h-screen flex items-center justify-center bg-white -mt-[6.375rem]">
      {/* screen and red circle */}
      <div className="absolute bottom-0 left-0">
        <img src="/circle.svg" alt="red circle" />
      </div>

      {/* signup title */}
      <div className="max-w-xl w-full pb-10 relative">
        <h2 className="text-center font-heebo text-[4rem] font-bold leading-none text-gray-900 w-[30rem] h-[6rem] mx-auto">
          Create Account
        </h2>

        {/* login form */}
        <form className="mt-8" onSubmit={handleSignup}>
          <div className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-1 py-1 border-b-[.156rem] border-[#D21312] placeholder-black focus:outline-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-1 py-1 border-b-[.156rem] border-[#D21312] placeholder-black focus:outline-none"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-1 py-1 border-b-[.156rem] border-[#D21312] placeholder-black focus:outline-none"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-1 py-1 border-b-[.156rem] border-[#D21312] placeholder-black focus:outline-none"
            />
          </div>

          {/* admin access checkbox */}
          <div className="flex items-center space-x-2 mt-6">
            <input
              type="checkbox"
              id="admin"
              checked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
              className="h-[25px] w-[25px] accent-[#D21312] cursor-pointer border border-[#D21312]"
            />
            <label
              htmlFor="admin"
              className="text-gray-700 text-lg font-heebo cursor-pointer"
            >
              Admin access
            </label>
          </div>
        </form>
        {/* login button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#D21312] rounded-2xl text-white text-2xl font-semibold focus:outline-none mt-14 cursor-pointer"
        >
          Sign Up
        </button>

        {/* sign up link */}
        <p className="mt-8 text-center text-black ">
          Already have an account?{" "}
          <Link href="/login" className="text-black font-bold">
            Sign In
          </Link>
        </p>
      </div>

      {/* details */}
      <p className="absolute bottom-8 text-black text-center font-heebo text-[12px] w-full max-w-xl">
        Made with ♡ by Long Lam
        <br />© 2023 BOG Developer Bootcamp. All rights reserved.
      </p>
    </div>
  );
}
