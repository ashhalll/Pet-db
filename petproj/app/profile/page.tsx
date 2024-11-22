"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    // Logout Function
    const logout = async () => {
        try {
            await axios.get('/api/users/logout'); // Ensure `/api/users/logout` interacts with your db session
            toast.success('Logout successful');
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error("Error logging out. Please try again.");
        }
    };

    // Fetch User Details Function
    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me'); // Ensure `/api/users/me` fetches user data from your db
            console.log("User details fetched:", res.data);
            setData(res.data.data._id);
        } catch (error: any) {
            console.error("Error fetching user details:", error.message);
            toast.error("Unable to fetch user details. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">
                {data === "nothing" ? "Nothing" : (
                    <Link href={`/profile/${data}`}>{data}</Link>
                )}
            </h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Get User Details
            </button>
        </div>
    );
}
