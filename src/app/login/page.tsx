"use client";

import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [Disabled, setDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
      if (user.email.length > 0 && user.password.length > 0) {
          setDisabled(false);
      } else {
          setDisabled(true);
      }
    }, [user]);

    const onLogin = async () => {
        try {
            setLoading(true);
            setDisabled(true);
            const response = await axios.post("/api/users/login", user);
            router.push("/"); 
            toast.success("Login Successfull, Welcome Back");
        } catch (error: any) {
            console.log(error);
            toast.error("Login Error: ", error.message); 
        } finally {
            setLoading(false);
            setDisabled(false);
        }
    };



    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        
        <Toaster />

        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="rounded-md p-4 max-w-xs max-h-full text-center">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-gray-100 mx-auto"></div>
            </div>
          </div>
        )}

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 px-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={Disabled}
                onClick={onLogin}
                type="submit"
                className={
                  Disabled
                    ? "flex w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-400 shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-not-allowed"
                    : "flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                }
                // className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-400">
          Create a new account{' '}
            <a href="/signup" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    );
}
