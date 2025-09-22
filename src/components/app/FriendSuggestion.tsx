import useSWR from "swr"
import Card from "../shared/Card"
import Fetcher from "../../lib/Fetcher"
import { Skeleton } from "antd"
import Error from "../shared/Error"
import Button from "../shared/Button"
import CatchError from "../../lib/CatchError"
import HttpInterceptor from "../../lib/HttpInterceptor"
import { useState } from "react"

const FriendSuggestion = () => {
    const [loading, setLoading] = useState({state: false, index: 0})
    const {data, error, isLoading} = useSWR('/friend/suggestion', Fetcher)

    const sendFriendRequest = async (id: string, index: number) => {
        try {
            const {data} = await HttpInterceptor.post('/friend', {friend: id})
            console.log(data)
            setLoading({state: true, index})
            
        } catch (err) {
            CatchError(err)
        }
        finally {
            setLoading({state: false, index: 0})
        }
    }

    return (
        <div className="h-[250px] overflow-auto">
            <Card title="Suggested" divider>
                { isLoading && <Skeleton active/> }

                { error && <Error message={error.message} /> }
                {
                    data && 
                    <div className="space-y-6">
                        {
                            data.map((item: any, index: number) => (
                                <div key={index} className="flex gap-4">
                                    <img
                                        src={item.image || "/images/girl.png" }
                                        alt="image"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h1 className="text-black font-medium capitalize">{item.fullname}</h1>
                                        <Button loading={loading.state && loading.index === index} onClick={() => sendFriendRequest(item._id, index)} type="success" icon='user-add-line'>Add Friend</Button>

                                        {/* <button className=" mt-2 px-2 py-1 rounded text-xs bg-green-500 hover:bg-green-600 font-medium text-white">
                                            <i className="ri-user-add-line mr-1"></i>
                                            Add friend
                                        </button> */}
                                    </div>
                                </div>
                            ))
                        } 
                    </div>
                }
            </Card>
        </div>
    )
}

export default FriendSuggestion