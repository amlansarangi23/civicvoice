'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [locality, setLocality] = useState("");
  const [userType, setUserType] = useState("CITIZEN");
  const [adminPasskey, setAdminPasskey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !locality || !userType) {
      setError("All fields are required.");
      return;
    }

    if (userType === "ADMIN" && adminPasskey !== "admin123") {
      setError("Admin not verified.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/signup", {
        username,
        email,
        password,
        locality,
        type: userType,
      });

      if (response.status === 201) {
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="locality" className="block text-gray-700">Locality</label>
            <input
              id="locality"
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your locality"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="userType" className="block text-gray-700">User Type</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="CITIZEN">CITIZEN</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {userType === "ADMIN" && (
            <div className="mb-4">
              <label htmlFor="adminPasskey" className="block text-gray-700">Admin Passkey</label>
              <input
                id="adminPasskey"
                type="password"
                value={adminPasskey}
                onChange={(e) => setAdminPasskey(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter Admin Passkey"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account? 
          <a href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
