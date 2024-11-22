"use client";

import { useState, useEffect } from "react";

const levels = ["💀", "🤫", "💪", "🇹🇷🐺"];
const colors = ["bg-red-600", "bg-yellow-600", "bg-silver-500", "bg-gold-500"]; // Add your colors

export default function StickerChart() {
    const [data, setData] = useState([]);
    const [newDate, setNewDate] = useState(""); // Tracks the new date input
    const [isAdmin, setIsAdmin] = useState(false); // Tracks admin login state
    const [password, setPassword] = useState(""); // Tracks input password
    const [error, setError] = useState(""); // Tracks login error

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/students");
            const students = await response.json();
            setData(students);
        };

        fetchData();
    }, []);

    const handleLogin = () => {
        if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            setIsAdmin(true);
            setError("");
        } else {
            setError("Incorrect password.");
        }
    };

    const handleUpdateStar = async (studentId, dateIdx) => {
        if (!isAdmin) return;

        const student = data.find((s) => s._id === studentId);

        // Increment the star level and loop back to 0
        student.stars[dateIdx].star =
            (student.stars[dateIdx].star + 1) % levels.length;

        await fetch(`/api/students/${studentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stars: student.stars }),
        });

        setData([...data]); // Update the state to reflect the changes
    };

    const handleAddDate = async () => {
        if (!newDate) {
            alert("Please select a date.");
            return;
        }

        // Call the API to add the new date
        await fetch("/api/students/add-date", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date: newDate, defaultStar: 0 }), // Default star: 🙅‍♂️ (level 0)
        });

        // Refresh the data to show the new date
        const response = await fetch("/api/students");
        const updatedStudents = await response.json();
        setData(updatedStudents);

        setNewDate(""); // Reset the input field
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8 text-center">
                🚗 Br. Hasan Sticker Chart 🚗
            </h1>
            <h2 className="text-2xl font-bold mb-4 text-center">
                🐓 Chicken of the Day: Timmy 🐓
            </h2>

            {/* Admin Login or Add Date */}

            {/* Sticker Chart Table */}
            <div className="overflow-x-auto w-full max-w-5xl mb-5">
                <table className="table-auto w-full border-collapse border border-gray-700">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="p-4 border border-gray-700 text-left">
                                Name
                            </th>
                            {data[0]?.stars.map((entry, idx) => (
                                <th
                                    key={idx}
                                    className="p-4 border border-gray-700 text-center"
                                >
                                    {entry.date}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student) => (
                            <tr key={student._id} className="hover:bg-gray-800">
                                <td
                                    className={`p-4 border border-gray-700 font-semibold`}
                                >
                                    {student.name === "Abrar" && (
                                        <span>🥰</span>
                                    )}
                                    {student.name === "Zaynab" && (
                                        <span>🇵🇸</span>
                                    )}
                                    {student.name === "Zoya" && <span>😏</span>}{" "}
                                    {student.name}{" "}
                                    {student.name === "Abrar" && (
                                        <span>🥰</span>
                                    )}
                                    {student.name === "Zaynab" && (
                                        <span>🇵🇸</span>
                                    )}
                                    {student.name === "Zoya" && <span>🇵🇰</span>}
                                </td>
                                {student.stars.map((entry, idx) => (
                                    <td
                                        key={idx}
                                        className={`p-4 border border-gray-700 text-center cursor-pointer transition relative ${
                                            colors[entry.star]
                                        }`} // Apply background color based on level
                                        onClick={() =>
                                            handleUpdateStar(student._id, idx)
                                        }
                                    >
                                        <span className="text-lg">
                                            {levels[entry.star]}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isAdmin ? (
                <div className="flex items-center gap-4 mb-8">
                    <input
                        type="date"
                        className="p-3 bg-gray-700 text-white rounded-md"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                    />
                    <button
                        onClick={handleAddDate}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md"
                    >
                        + Add Date
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="flex items-center gap-2">
                        <input
                            type="password"
                            placeholder="Enter Admin Password"
                            className="p-3 bg-gray-700 text-white rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={handleLogin}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md"
                        >
                            Sign In
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            )}
        </div>
    );
}
