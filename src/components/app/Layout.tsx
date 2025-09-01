import { Link, Outlet, useLocation } from "react-router-dom"
import Avatar from "../shared/Avatar"
import Card from "../shared/Card"
import { useContext, useState } from "react"
import Dashboard from "./Dashboard"
import Context from "../../Context"

const Layout = () => { 
    const {session} = useContext(Context)
    const{ pathname } = useLocation()
    const [leftAsideSize, setLeftAsideSide] = useState(350)
    const rightAsideSize = 450
    const collapseSize = 140

    const menus = [
        {
            href: '/app/dashboard',
            label: 'dashboard',
            icon: 'ri-home-9-line'
        },
        {
            href: '/app/my-posts',
            label: 'my posts',
            icon: 'ri-chat-smile-3-line'
        },
        {
            href: '/app/friends',
            label: 'friends',
            icon: 'ri-group-line'
        }
    ]
    const getPathname = (path: string) => {
        const firstPath = path.split("/").pop()
        const finalPath = firstPath?.split("-").join(" ")
        return finalPath
    }

    return (
        <div className="min-h-screen">
            <aside 
                className="bg-white fixed h-full top-0 left-0 p-8 overflow-auto" 
                style={{
                    width: leftAsideSize,
                    transition: '0.2s'
                }}
            >
                <div className="space-y-8 h-full rounded-2xl p-8 bg-gradient-to-tr from-slate-900 via-purple-800 to-gray-900">
                    {
                        leftAsideSize === collapseSize ?
                        <i className="ri-user-fill text-xl text-white animate__animated animate__fadeIn"></i>
                        :
                        <div className="animate__animated animate__fadeIn">
                            {
                                session && 
                                <Avatar 
                                    title={leftAsideSize === collapseSize ? null : session.fullname}
                                    subtitle={session.email}
                                    image='/images/girl.png'
                                    titleColor="white"
                                    subtitleColor="#ddd"
                                />
                            }
                        </div>
                    }
                    <div> 
                        {
                            menus.map((item, index) => (
                                <Link 
                                    key={index}
                                    to={item.href} 
                                    className="flex items-center gap-4 text-gray-300 py-3 hover:text-white"
                                >
                                    <i className={`${item.icon} text-xl`} title={item.label}></i>
                                    <label className={`capitalize ${leftAsideSize === collapseSize ? 'hidden' : ''}`}>{item.label}</label>
                                </Link>
                            ))
                        }
                        <button className="flex items-center gap-4 text-gray-300 py-3 hover:text-white cursor-pointer w-full" title="Logout">
                            <i className="ri-logout-circle-r-line text-xl"></i>
                            <label className={`capitalize ${leftAsideSize === collapseSize ? 'hidden' : ''}`}>Logout</label>
                        </button>
                    </div>
                </div>
            </aside>
            <section 
                className="py-8 px-1" 
                style={{
                    width: `calc(100% - ${leftAsideSize + rightAsideSize}px)`,
                    marginLeft: leftAsideSize,
                    transition: '0.2s'
                }}
            >
                <Card 
                    title = {
                        <div className="flex items-center gap-4">
                            <button 
                                className="bg-gray-100 w-10 h-10 rounded-full hover:bg-slate-200" 
                                onClick={() => setLeftAsideSide(leftAsideSize === 350 ? collapseSize : 350)}
                            >
                                <i className="ri-arrow-left-line"></i>
                            </button>
                            <h1>{getPathname(pathname)}</h1>
                        </div>
                    }
                    divider 
                >
                    {
                        pathname === "/app" ? 
                        <Dashboard />
                        :
                        <Outlet />
                    }
                </Card>
            </section>
            <aside 
                className="bg-white w-[${asideSize}px] fixed h-full top-0 right-0 p-8 overflow-auto space-y-8" 
                style={{
                    width: rightAsideSize,
                    transition: '0.2s'
                }}
            >
                <div className="h-[250px] overflow-auto">
                    <Card title="Suggested" divider>
                        <div className="space-y-6">
                            {
                                Array(20).fill(0).map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <img
                                            src="/images/girl.png" 
                                            alt="image"
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <h1 className="text-black font-medium">Priya Singh</h1>
                                            <button className=" mt-2 px-2 py-1 rounded text-xs bg-green-500 hover:bg-green-600 font-medium text-white">
                                                <i className="ri-user-add-line mr-1"></i>
                                                Add friend
                                            </button>
                                        </div>
                                    </div>
                                ))
                            } 
                        </div>
                    </Card>
                </div>
                <Card title='Friends' divider>
                    <div className="space-y-5">
                        {
                            Array(20).fill(0).map((item, index ) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between">
                                    <Avatar 
                                        size="md"
                                        image="/images/girl.png"
                                        title="Fazeela Mushtaq"
                                        subtitle={
                                            <small className={`${index % 2 === 0 ? 'text-zinc-400' : 'text-green-400'} text-sm`}>
                                                {index % 2 === 0 ? 'Offline' : 'Online'}
                                            </small>
                                        }
                                    />
                                    <div className="space-x-3">
                                        <Link to="/app/chat" className="hover:text-blue-600 text-blue-500" title="chat">
                                            <i className="ri-chat-ai-line"></i>
                                        </Link>
                                        <Link to="/app/audio-chat" className="hover:text-green-600 text-green-500" title="call">
                                            <i className="ri-phone-line"></i>
                                        </Link> 
                                        <Link to="/app/video-chat" className="hover:text-amber-600 text-amber-500" title="video call">
                                            <i className="ri-video-on-ai-line"></i>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Card>
            </aside>
        </div>
    )
}

export default Layout