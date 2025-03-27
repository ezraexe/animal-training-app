'use client'; 
import { useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white -mt-[6.375rem]">
            {/* screen and red circle */}
            <div className="absolute bottom-0 left-0">
                <img 
                    src="/circle.svg" 
                    alt="red circle"
                />  
            </div>

            {/* signup title */}
            <div className="max-w-xl w-full pb-10 relative">
                <h2 className="text-center font-heebo text-[4rem] font-bold leading-none text-gray-900 w-[30rem] h-[6rem] mx-auto">
                    Create Account
                </h2>

                {/* login form */}
                <form className="mt-8">
                    <div className="space-y-4">
                        <input type="text" placeholder="Full Name" className="w-full px-1 py-1 border-b-[.156rem] border-[#D21312] placeholder-black focus:outline-none" />
                        <input type="text" placeholder="Email" className="w-full px-1 py-1 border-b-[.156rem] border-[#D21312] placeholder-black focus:outline-none" />
                        <input type="password" placeholder="Password" className="w-full px-1 py-1 border-b-[.156rem] border-[#D21312] placeholder-black focus:outline-none" />
                        <input type="password" placeholder="Confirm Password" className="w-full px-1 py-1 border-b-[.156rem] border-[#D21312] placeholder-black focus:outline-none" />
                    </div>

                    {/* admin access checkbox */}   
                    <div className="flex items-center space-x-2 mt-6">
                        <input
                            type="checkbox"
                            id="admin"
                            className="h-[25px] w-[25px] accent-[#D21312] cursor-pointer border border-[#D21312]"
                        />
                        <label htmlFor="admin" className="text-gray-700 text-lg font-heebo cursor-pointer">
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
                    Already have an account? {' '} <Link href="/signup" className="text-black font-bold">Sign In</Link>
                </p>
            </div>
            
            {/* details */}
            <p className="absolute bottom-8 text-black text-center font-heebo text-[12px] w-full max-w-xl"> 
                Made with ♡ by Long Lam 
                <br />
                © 2023 BOG Developer Bootcamp. All rights reserved.
            </p>
        </div>
    );
}