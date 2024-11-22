"use client";

import { useState } from "react";

export default function AddStudent() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleAddStudent = async () => {
        if (!name.trim()) {
            setMessage("Please enter a valid name.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) {
                throw new Error("Failed to add student");
            }

            setMessage(`Successfully added student: ${name}`);
            setName(""); // Reset input field
        } catch (error) {
            setMessage("Error: Unable to add student.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-5">
            <h1 className="text-3xl font-bold mb-5">Add a Student</h1>
            <div className="w-full max-w-md bg-gray-800 p-5 rounded-md shadow">
                <input
                    type="text"
                    placeholder="Enter student name"
                    className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    onClick={handleAddStudent}
                    className={`w-full p-3 rounded ${
                        loading
                            ? "bg-gray-600"
                            : "bg-green-500 hover:bg-green-600"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Student"}
                </button>
                {message && (
                    <p className="mt-4 text-center text-sm">{message}</p>
                )}
            </div>
        </div>
    );
}
