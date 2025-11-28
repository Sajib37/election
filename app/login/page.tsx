"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import for redirection

const CommissionerLogin = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const HARD_CODED_USER = "Tom";
  const HARD_CODED_PASS = "chuadanga71";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Simulate Network Delay (Optional: For better UX)
    setTimeout(() => {
        setIsSubmitting(false);

        if (userId === HARD_CODED_USER && password === HARD_CODED_PASS) {
            // alert("Login Successful! Redirecting to Dashboard.");
            // 🚀 Redirect to the dashboard page
            router.push("/star"); 
        } else {
            setError("Invalid User ID or Password");
        }
    }, 500); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        <h2 className="text-4xl text-center mb-4">👤</h2>
        <h1 className="text-xl font-extrabold text-center text-indigo-600 mb-8">
             Commissioner Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* User ID Field */}
          <div>
            <label 
                htmlFor="userId" 
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                User ID:
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter User ID"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
            />
          </div>

          {/* Password Field */}
          <div>
            <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm font-medium text-center text-red-600 bg-red-100 p-2 rounded-lg">
                {error}
            </p>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommissionerLogin;