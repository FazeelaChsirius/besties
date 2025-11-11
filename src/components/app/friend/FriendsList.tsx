import { Link } from "react-router-dom"
import Card from "../../shared/Card"
import IconButton from "../../shared/IconButton"
import SmallButton from "../../shared/SmallButton"
import { FC } from "react"
import useSWR, { mutate } from "swr"
import Fetcher from "../../../lib/Fetcher"
import { Empty, Skeleton } from "antd"
import CatchError from "../../../lib/CatchError"
import HttpInterceptor from "../../../lib/HttpInterceptor"

interface FriendsListInterface {
  gap?: number
  columns: number
}

const FriendsList: FC<FriendsListInterface> = ({gap=8, columns=3}) => {
  const {data, error, isLoading} = useSWR('/friend', Fetcher)

  if(isLoading)
    return <Skeleton />

  if(error)
    return <Empty />

  const unfriend = async (id: string) => {
    try {
      await HttpInterceptor.delete(`/friend/${id}`)
      mutate('/friend')
      mutate('/friend/suggestion')
      
    } catch (err) {
      CatchError(err)
    }
  }

  return (
    <div className={`grid grid-cols-${columns} gap-${gap}`}>
      {
        data.map((item: any, index: number) => (
        <Card>
          <div className="flex flex-col items-center gap-3" key={index}>
            <img 
              src={item.friend.image || "/images/girl.png"} 
              className="rounded-full object-cover w-[80px] h-[80px]"
            />
            <h1 className="capitalize">{item.friend.fullname}</h1>

            <div className="relative">
              {
                item.status === "requested" ?
                <SmallButton icon="check-double-line">Friend request sent</SmallButton>
                :
                <SmallButton type="danger" icon="user-minus-line" onClick={()=>unfriend(item._id)}>Unfriend</SmallButton>
              }
              {/* <div className="w-2 h-2 bg-green-400 rounded-full absolute -top-1 -right-1 animate__animated animate__pulse animate__infinite" /> */}
            </div>

            <div className="flex gap-3 mt-3">
              <Link to="/app/chat">
                <IconButton icon="chat-ai-line" type="warning"/>
              </Link>
              <Link to="/app/audio-chat">
                <IconButton icon="phone-line" type="success"/>
              </Link>
              <Link to="/app/video-chat">
                <IconButton icon="video-on-ai-line" type="danger"/>
              </Link>
            </div>

          </div>
        </Card>
        ))
      }
    </div>
  )
}

export default FriendsList