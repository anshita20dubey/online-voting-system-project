import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Mock Admin Credentials
    const adminCredentials = {
      username: "adminanshita",
      password: "admin123",
    };

    if (username === adminCredentials.username && password === adminCredentials.password) {
      // Set admin session (can be replaced with token-based auth)
      localStorage.setItem("admin", true);
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "#4D4EE6" }}
    >
      <h1 className="text-4xl font-bold text-white mb-6">Admin Login</h1>
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        onSubmit={handleLogin}
      >
        <div className="mb-6">
          <label
            className="block text-gray-700 text-lg font-semibold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-lg font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
