import { useContext, useEffect, useState } from "react"
import socket from "../../lib/socket"
import Avatar from "../shared/Avatar"
import Button from "../shared/Button"
import Form from "../shared/Form"
import Input from "../shared/Input"
import Context from "../../Context"
import { useParams } from "react-router-dom"

interface MessageReceivedInterface {
    from: string
    message: string
}

const Chat = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [chats, setChats] = useState<any>([])
    const {session} = useContext(Context)
    const {id} = useParams()

    const messageHandler = (messageReceived: MessageReceivedInterface) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setChats((prev: any) => [...prev, messageReceived])
    }

    useEffect(() => {
        socket.on('message', messageHandler)

        return () => {
            socket.off('message', messageHandler)
        } 
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sendMessage = (values: any) => {
        const payload = {
            from: session,
            to: id,
            message: values.message
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setChats((prev: any) => [...prev, payload])
        socket.emit('message', payload)
    }

    return (
        <div>
            <div className="h-[450px] overflow-auto space-y-10">
                {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    chats.map((item: any, index: number) => (
                        <div className="space-y-10" key={index}>
                            {
                                item.from.id === session.id ? 
                                <div className="flex gap-4 items-start">
                                    <Avatar 
                                        image={session.image || "/images/girl.png"} 
                                        size="md"
                                    />
                                    <div className="bg-rose-50 px-4  py-2 rounded-lg flex-1 text-pink-400 border border-rose-100 relative">
                                        <h1 className="font-medium text-gray-600 capitalize">You</h1>
                                        <label>{item.message}</label>
                                        
                                        <i className="ri-arrow-left-s-fill absolute top-0 -left-5 text-4xl text-rose-50"></i>
                                    </div>
                                </div>
                                : 
                                <div className="flex gap-4 items-start">
                                    <div className="bg-violet-50 px-4  py-2 rounded-lg flex-1 text-blue-400 border border-violet-100 relative">
                                        <h1 className="font-medium text-gray-600 capitalize">{item.from.fullname}</h1>
                                        <label>{item.message}</label>
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
                <div className="flex gap-4 items-center justify-between bg-gray-100">
                    <Form className="flex gap-3 flex-1" onValue={sendMessage}>
                        <Input name="message" placeholder="Type your message"/>
                        <Button type="secondary" icon="send-plane-fill">Send</Button>
                        <button className="w-10 h-10 bg-rose-100 text-rose-500 rounded-full hover:bg-rose-300 hover:text-white">
                            <i className="ri-attachment-2"></i>
                        </button>
                    </Form>
                </div>
            </div> 

            {/* <div className="p-6">
                <form className="flex items-center justify-between bg-gray-100 rounded-full px-4 py-1 shadow-sm">
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
                        <button className="w-8 h-8 bg-rose-100 text-rose-500 rounded-full hover:bg-rose-300 hover:text-white">
                            <i className="ri-attachment-2"></i>
                        </button>
                        <button className="w-8 h-8 bg-green-500 hover:bg-green-400 text-white rounded-full">
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>
                </form>

            </div> */}

        </div>
    )
}

export default Chat