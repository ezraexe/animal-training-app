"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { isValidEmail, isValidPassword } from "@/lib/credentialAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await login(email, password); // will throw an error if login fails, otherwise it will push to the dashboard page
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error occurred while logging in");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white -mt-[6.375rem]">
      {/* screen and red circle */}
      <div className="absolute bottom-0 left-0">
        <img src="/circle.svg" alt="red circle" />
      </div>

      {/* Login title */}
      <div className="max-w-xl w-full pb-10 relative">
        <h2 className="text-center font-heebo text-[4rem] font-bold leading-none text-gray-900 w-[30rem] h-[6rem] mx-auto">
          Login
        </h2>

        {/* login form */}
        <form className="mt-8" onSubmit={handleSubmit}>
          {/* Error message display */}
          {error && (
            <div
              className="text-[#D21312] bg-red-50 border border-[#D21312] p-3 rounded text-center mb-4"
              role="alert"
            >
              {error}
            </div>
          )}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-1 py-1 border-b-[.156rem] border-[#D21312] placeholder-black focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-1 py-1 border-b-[.156rem] border-[#D21312] placeholder-black focus:outline-none"
            />
          </div>

          {/* login button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#D21312] rounded-2xl text-white text-2xl font-semibold focus:outline-none mt-14 cursor-pointer"
          >
            Log In
          </button>
        </form>

        {/* sign up link */}
        <p className="mt-8 text-center text-black ">
          Don't Have an Account?{" "}
          <Link href="/signup" className="text-black font-bold">
            Sign Up
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
