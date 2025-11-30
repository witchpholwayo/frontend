import Link from "next/link";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          WebApp
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Home
          </Link>

          <Link
            href="/products/create"
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Create
          </Link>

          {/* User Logged In */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                👋 Hi, <strong className="text-indigo-600">{user.name}</strong>
              </span>

              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg shadow transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-lg shadow transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg shadow transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
