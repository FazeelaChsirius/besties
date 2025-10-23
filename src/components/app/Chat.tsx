import { ChangeEvent, FC, useContext, useEffect, useRef, useState } from "react"
import socket from "../../lib/socket"
import Avatar from "../shared/Avatar"
import Form from "../shared/Form"
import Context from "../../Context"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import Fetcher from "../../lib/Fetcher"
import CatchError from "../../lib/CatchError"
import HttpInterceptor from "../../lib/HttpInterceptor"
import {v4 as uuid} from "uuid"
import Card from "../shared/Card"
import SmallButton from "../shared/SmallButton"
import moment from "moment"
interface MessageReceivedInterface extends AttachmentUiInterfec {
    from: string
    message: string
}
interface AttachmentUiInterfec {
    file: {
        path: string,
        type: string
    }
}

const AttachmentUi: FC<AttachmentUiInterfec> = ({file}) => {
    if(file.type.startsWith("video/"))
        return (
            <video className="w-full" controls src={file.path}></video>
        )
    if(file.type.startsWith("image/"))
        return (
            <img className="w-full" src={file.path} />
        )

    return (
        <Card>
            <i className="ri-file-line text-5xl"></i>
        </Card>
    ) 
}

const Chat = () => {
    const [chats, setChats] = useState<any>([])
    const {session} = useContext(Context)
    const chatContainer = useRef<HTMLDivElement | null>(null)
    const {id} = useParams()
    const {data} = useSWR(id ? `/chat/${id}` : null, id ? Fetcher : null)

    const messageHandler = (messageReceived: MessageReceivedInterface) => {
        setChats((prev: any) => [...prev, messageReceived])
    }

    const attachmentHandler = (messageReceived: any) => {
        setChats((prev: any) => [...prev, messageReceived])
    }

    // Listening received messages and all sockets events
    useEffect(() => {
        socket.on('message', messageHandler)
        socket.on('attachment', attachmentHandler)

        return () => {
            socket.off('message', messageHandler)
            socket.off('attachment', attachmentHandler)
        } 
    }, [])

    // Fetching previous chats
    useEffect(() => {
        if(data) {
            setChats(data)
        }
    }, [data])

    // Setup scrollbar position
    useEffect(() => {
        const chatDiv = chatContainer.current
        if(chatDiv) {
            chatDiv.scrollTop = chatDiv.scrollHeight
        }
    }, [chats])

    const sendMessage = (values: any) => {
        const payload = {
            from: session,
            to: id,
            message: values.message
        }
        setChats((prev: any) => [...prev, payload])
        socket.emit('message', payload)
    }

    const fileSharing = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const input = e.target
            if(!input.files)
                return

            const file = input.files[0]
            const ext = file.name.split(".").pop()
            const filename = `${uuid()}.${ext}`
            const path = `chats/${filename}`

            const payload = {
                path,
                type: file.type,
                status: "private"
            }
            const options = {
                headers: {
                    'Content-Type': file.type
                }
            }
            const {data} = await HttpInterceptor.post('/storage/upload', payload)
            await HttpInterceptor.put(data.url, file, options)
            console.log('hello')
            socket.emit("attachment", {
                from: session,
                to: id,
                message: filename,
                file: {
                    path, 
                    type: file.type
                }
            })
            
        } catch (err) {
            CatchError(err)
        }
    }

    const download = async (path: string) => {
        try {
            const filename: any = path.split("/").pop()
            const {data} = await HttpInterceptor.post('/storage/download', {path})
            const a = document.createElement("a")
            a.href = data.url
            a.download = filename
            a.click()
            a.remove()
            
        } catch (err) {
            CatchError(err)
        }
    }

    return (
        <div>
            <div className="h-[450px] overflow-auto space-y-10 pr-6 relative" ref={chatContainer}>
                {
                    chats.map((item: any, index: number) => (
                        <div className="space-y-10" key={index}>
                            {
                                (item.from.id === session.id || item.from._id === session.id) ? 
                                <div className="flex gap-4 items-start">
                                    <Avatar 
                                        image={session.image || "/images/girl.png"} 
                                        size="md"
                                    />
                                    <div className="relative flex flex-col gap-3 bg-rose-50 px-4 py-2 rounded-lg flex-1 text-pink-400 border border-rose-100">
                                        <h1 className="font-medium text-gray-600 capitalize">You</h1>
                                        {
                                            item.file && <AttachmentUi file={item.file}/>
                                        }
                                        <label>{item.message}</label>
                                        {
                                            item.file && 
                                            <div>
                                                <SmallButton onClick={() => download(item.file.path)} icon="download-line" type="success">Download</SmallButton>
                                            </div>
                                        }
                                        <div className="text-gray-400 text-right text-sm">
                                            {moment().format('MMM DD, YYYY hh:mm:ss A')}
                                        </div>
                                        <i className="ri-arrow-left-s-fill absolute top-0 -left-5 text-4xl text-rose-50"></i>
                                    </div>
                                </div>
                                : 
                                <div className="flex gap-4 items-start">
                                    <div className="relative flex flex-col gap-3 bg-violet-50 px-4 py-2 rounded-lg flex-1 text-blue-400 border border-violet-100">
                                        <h1 className="font-medium text-gray-600 capitalize">{item.from.fullname}</h1>
                                        {
                                            item.file && <AttachmentUi file={item.file}/>
                                        }
                                        <label>{item.message}</label>
                                        {
                                            item.file && 
                                            <div>
                                                <SmallButton onClick={() => download(item.file.path)} icon="download-line" type="danger">Download</SmallButton>
                                            </div>
                                        }
                                        <div className="text-gray-400 text-right text-sm">
                                            {moment().format('MMM DD, YYYY hh:mm:ss A')}
                                        </div>
                                        <i className="ri-arrow-right-s-fill absolute top-0 -right-5 text-4xl text-violet-50"></i>
                                    </div>
                                    <Avatar 
                                        image={item.from.image || "/images/girl.png" }
                                        size="md"
                                    />
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
            <div className="p-6">
                <Form className="flex items-center justify-between bg-gray-100 rounded-full px-4 py-1 shadow-sm" onValue={sendMessage} reset>
                    <input 
                        type="text" 
                        name="message" 
                        placeholder="Type a message"
                        className="py-2 flex-1 outline-none bg-transparent"
                    />
                    <div className="space-x-3">
                        <button 
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full"
                        >
                            <i className="ri-emotion-happy-line"></i>
                        </button>
                        <button className="relative w-8 h-8 bg-rose-400 text-white rounded-full hover:bg-rose-500 hover:text-white !cursor-pointer">
                            <i className="ri-attachment-2"></i>
                            <input onChange={fileSharing} type="file" className="w-full h-full absolute top-0 left-0 rounded-full opacity-0"/>
                        </button>
                        <button className="w-8 h-8 bg-green-500 hover:bg-green-400 text-white rounded-full">
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Chat