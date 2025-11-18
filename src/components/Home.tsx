import { Link } from "react-router-dom";
export default function SocialHome() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold">Besties</h1>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
            <i className="ri-search-line w-5 h-5 text-gray-500"></i>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none ml-2 text-sm"
            />
          </div>
          <i className="ri-notification-3-line w-6 h-6 hover:text-blue-600 cursor-pointer"></i>
        </div>

        <Link to="/login" className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
          Login
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-10">
        {/* Left Sidebar */}
        <aside className="hidden md:block bg-white p-6 rounded-2xl shadow h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <ul className="space-y-4 text-gray-700">
            {['Home', 'Explore', 'Messages', 'Notifications', 'Profile', 'Settings'].map((item) => (
              <li key={item} className="cursor-pointer hover:text-blue-600">
                {item}
              </li>
            ))}
          </ul>
        </aside>

        {/* Feed */}
        <main className="md:col-span-2 space-y-6">
          {/* Create Post */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200"
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <button className="flex-1 text-left px-4 py-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200">
                What's on your mind?
              </button>
              <i className="ri-add-circle-line w-7 h-7 text-blue-600 cursor-pointer"></i>
            </div>
          </div>

          {/* Posts */}
          {[1, 2, 3].map((post) => (
            <div key={post} className="bg-white p-6 rounded-2xl shadow">
              <div className="flex items-center gap-4 mb-4">
                
                <div>
                  <p className="font-semibold">User {post}</p>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
              </div>

              <p className="mb-4 text-gray-700">
                This is a sample post for the social media homepage layout.
              </p>
              

              <div className="flex items-center gap-6 text-gray-600">
                <button className="flex items-center gap-2 hover:text-red-500">
                  <i className="ri-heart-line w-6 h-6"></i> Like
                </button>
                <button className="flex items-center gap-2 hover:text-blue-600">
                  <i className="ri-chat-3-line w-6 h-6"></i> Comment
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 bg-gray-100 mt-10">
        © 2025 ConnectHub. All rights reserved.
      </footer>
    </div>
  );
}
