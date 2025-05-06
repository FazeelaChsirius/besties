import { Link, Outlet, useLocation } from "react-router-dom"
import Avatar from "../shared/Avatar"
import Card from "../shared/Card"

const Layout = () => {
    const leftAsideSize = 350
    const rightAsideSize = 450
    const{ pathname } = useLocation()
    console.log(pathname)

    const sectionDimention = {
       width: `calc(100% - ${leftAsideSize + rightAsideSize}px)`,
       marginLeft: leftAsideSize
    }
    const menus = [
        {
            href: '/app/dashboard',
            label: 'dashboard',
            icon: 'ri-home-9-line'
        },
        {
            href: '/app/posts',
            label: 'my posts',
            icon: 'ri-chat-smile-3-line'
        },
        {
            href: '/app/friends',
            label: 'friends',
            icon: 'ri-group-line'
        }
    ]
    return (
        <div className="min-h-screen">
            <aside className="bg-white fixed h-full top-0 left-0 p-8 overflow-auto" style={{width: leftAsideSize}}>
                <div className="space-y-8 h-full rounded-2xl p-8 bg-gradient-to-tr from-slate-900 via-purple-800 to-gray-900">
                    <Avatar 
                        title="Fazeela"
                        subtitle="Software Engineer"
                        image='/images/girl.png'
                        titleColor="white"
                        subtitleColor="#ddd"
                    />
                    <div>
                        {
                            menus.map((item, index) => (
                                <Link 
                                    key={index}
                                    to={item.href} 
                                    className="flex items-center gap-3 text-gray-300 py-3 hover:text-white"
                                >
                                    <i className={`${item.icon} text-xl`}></i>
                                    <label className="capitalize cursor-pointer">{item.label}</label>
                                </Link>

                            ))
                        }
                        <button className="flex items-center gap-3 text-gray-300 py-3 hover:text-white cursor-pointer">
                            <i className="ri-logout-circle-r-line text-xl"></i>
                            <label className="capitalize cursor-pointer">Logout</label>
                        </button>
                    </div>
                </div>
            </aside>
            <section className="py-8 px-1" style={sectionDimention}>
                <Card title={pathname.split("/").pop()} divider >
                    <Outlet />
                </Card>
            </section>
            <aside 
                className="bg-white w-[${asideSize}px] fixed h-full top-0 right-0 p-8 overflow-auto" 
                style={{width: rightAsideSize}}
            >
                <Card title='My Friends' divider>
                    <div className="space-y-5">
                        {
                            Array(20).fill(0).map((item, index) => (
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
                                        <button className="hover:text-blue-600 text-blue-500" title="chat">
                                            <i className="ri-chat-ai-line"></i>
                                        </button>
                                        <button className="hover:text-green-600 text-green-500" title="call">
                                            <i className="ri-phone-line"></i>
                                        </button> 
                                        <button className="hover:text-amber-600 text-amber-500" title="video call">
                                            <i className="ri-video-on-ai-line"></i>
                                        </button>
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