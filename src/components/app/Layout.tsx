import { Link } from "react-router-dom"
import Avatar from "../shared/Avatar"
import Card from "../shared/Card"

const Layout = () => {
    return (
        <div className="min-h-screen">
            <aside className="bg-white w-[350px] fixed h-full top-0 left-0 p-8">
                <div className="space-y-8 h-full rounded-2xl p-8 bg-gradient-to-tr from-slate-900 via-purple-800 to-gray-900">
                    <Avatar 
                        title="Fazeela"
                        subtitle="Software Engineer"
                        image='/public/images/avt.png'
                        titleColor="white"
                        subtitleColor="#ddd"
                    />
                    <div>
                        <Link to="/app" className="flex items-center gap-2 text-gray-300 py-3 hover:text-white">
                            <i className="ri-home-9-line text-xl"></i>
                            <label>Dashboard</label>
                        </Link>
                        <Link to="/app" className="flex items-center gap-2 text-gray-300 py-3 hover:text-white">
                            <i className="ri-chat-smile-3-line text-xl"></i>
                            <label>My Post</label>
                        </Link>
                        <Link to="/app" className="flex items-center gap-2 text-gray-300 py-3 hover:text-white">
                            <i className="ri-group-line text-xl"></i>
                            <label>Friends</label>
                        </Link>
                        <button className="flex items-center gap-2 text-gray-300 py-3 hover:text-white">
                            <i className="ri-logout-circle-r-line text-xl"></i>
                            <label>Logout</label>
                        </button>
                    </div>
                </div>
            </aside>
            <section className="rounded-2xl w-[calc(100%-630px)] p-8 ml-[350px]">
                <Card>

                </Card>
            </section>
            <aside className="bg-white w-[280px] fixed h-full top-0 right-0 p-8">
                <Card>
                    
                </Card>
            </aside>
        </div>
    )
}

export default Layout