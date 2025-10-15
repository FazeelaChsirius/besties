import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import Avatar from "../shared/Avatar"
import Card from "../shared/Card"
import { useContext, useEffect, useState } from "react"
import Dashboard from "./Dashboard"
import Context from "../../Context"
import HttpInterceptor from "../../lib/HttpInterceptor"
import {v4 as uuid} from "uuid"
import useSWR, { mutate } from 'swr'
import Fetcher from "../../lib/Fetcher"
import CatchError from "../../lib/CatchError"
import FriendsSuggestion from "./friend/FriendsSuggestion"
import FriendsRequest from "./friend/FriendsRequest"
import { useMediaQuery } from 'react-responsive'
import Logo from "../shared/Logo"
import IconButton from "../shared/IconButton"
import FriendsOnline from "./friend/FriendsOnline"

const EightMinuteInMs = 8*60*1000

const Layout = () => { 
    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const{ pathname } = useLocation()
    const navigate = useNavigate()
    const {session, setSession} = useContext(Context)
    // const {error} = useSWR('/auth/refresh-token', Fetcher, {
    //     refreshInterval: EightMinuteInMs,
    //     shouldRetryOnError: false
    // })

    const friendsUiBlacklist = [
        "/app/friends",
        "/app/chat",
        "/app/audio-chat",
        "/app/video-chat"
    ]
    
    const isBlacklisted = friendsUiBlacklist.some((path) => pathname === path)
    console.log(isBlacklisted)
    // useEffect(() => {
    //     if(error) {
    //         logout()
    //     }

    // }, [error])

    useEffect(() => {
        setLeftAsideSide(isMobile ? 0 : 350)
        setCollapseSize(isMobile ? 0 : 140)
    }, [isMobile])
     
    const [leftAsideSize, setLeftAsideSide] = useState(0)
    const [collapseSize, setCollapseSize] = useState(0)
    const rightAsideSize = 450

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

    const logout = async () => {
        try {
            await HttpInterceptor.post('/auth/logout')
            navigate('/login')
            
        } catch (err) {
            CatchError(err)
        }
    }

    const getPathname = (path: string) => {
        const firstPath = path.split("/").pop()
        const finalPath = firstPath?.split("-").join(" ")
        return finalPath
    }

    const uploadImage = () => {
        const input = document.createElement("input")  // invisible input field
        input.type = "file"                            // Set "file" input type
        input.accept = "image/*"                       // Choose only image file
        input.click()                                  // Open file picker/ click() → programmatically button click
        input.onchange = async () => {                 // function trigger as user select the file
            if(!input.files)                           // check if fiel not exist
                return 

            const file = input.files[0]                 // select file array
            const path = `profile-pictures/${uuid()}.png` // unique image path for user
            
            try {
                const payload = {
                    path,                                // unique file path 
                    type: file.type,                     // define in server where and which type of file will stored
                    status: "public-read"
                }
                const options = {                        // define file typ ein request headers
                    headers: {
                        'Content-Type': file.type
                    }
                }
                const {data} = await HttpInterceptor.post('/storage/upload', payload)
                await HttpInterceptor.put(data.url, file, options)
                const {data: user} = await HttpInterceptor.put('/auth/profile-picture', {path})
                setSession({...session, image: user.image})
                mutate('/auth/refresh-token')
                
            } catch (err) {
                console.log(err)
            }
        }
    }

    // const download = async () => {
    //     try {
    //         const options = {
    //             path: "demo/girl.png"
    //         }
    //         const {data} = await HttpInterceptor.post('/storage/download', options)
    //         const link = document.createElement("a")
    //         link.href = data.url
    //         link.download = "girl.png"
    //         link.click()

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    return (
        <div className="min-h-screen">
            <nav className="lg:hidden justify-between items-center flex bg-gradient-to-tr from-slate-900 via-purple-800 to-gray-900 sticky top-0 left-0 z-[20000] w-full py-4 px-6">
                <Logo />
                <div className="flex gap-4">
                    <IconButton onClick={logout} icon="logout-circle-line" type="success" />
                    <Link to='/app/friends'>
                        <IconButton onClick={() => setLeftAsideSide(leftAsideSize === 350 ? collapseSize : 350)} icon="chat-ai-line" type="danger" />
                    </Link>
                    <IconButton icon="menu-3-line" type="warning" />
                </div>
            </nav>
            <aside 
                className="bg-white fixed h-full top-0 left-0 lg:p-8 overflow-auto z-[20000]" 
                style={{
                    width: leftAsideSize,
                    transition: '0.2s'
                }}
            >
                <div className="space-y-8 h-full lg:rounded-2xl p-8 bg-gradient-to-tr from-slate-900 via-purple-800 to-gray-900">
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
                                    image={session.image || '/images/girl.png'}
                                    titleColor="white"
                                    subtitleColor="#ddd"
                                    onClick={uploadImage}
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
                        <button onClick={logout} className="flex items-center gap-4 text-gray-300 py-3 hover:text-white !cursor-pointer w-full " title="Logout">
                            <i className="ri-logout-circle-r-line text-xl"></i>
                            <label className={`capitalize ${leftAsideSize === collapseSize ? 'hidden' : ''}`}>Logout</label>
                        </button>
                    </div>
                </div>
            </aside>
            <section 
                className="lg:py-8 lg:px-1 p-6 space-y-8" 
                style={{
                    width: isMobile ? '100%' : `calc(100% - ${leftAsideSize + rightAsideSize}px)`,
                    marginLeft: leftAsideSize,
                    transition: '0.2s'
                }}
            >
                {
                    !isBlacklisted &&
                    <FriendsRequest />
                }
                <Card 
                    title = {
                        <div className="flex items-center gap-4">
                            <button 
                                className="lg:block hidden bg-gray-100 w-10 h-10 rounded-full hover:bg-slate-200" 
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
                        pathname === "/app" ? <Dashboard /> : <Outlet />
                    }
                </Card>
                {
                    !isBlacklisted &&
                    <FriendsSuggestion />
                }
            </section>
            <aside 
                className="lg:block hidden bg-white w-[${asideSize}px] fixed h-full top-0 right-0 p-8 overflow-auto space-y-8" 
                style={{
                    width: rightAsideSize,
                    transition: '0.2s'
                }}>
                    <FriendsOnline />
            </aside>
        </div>
    )
}

export default Layout