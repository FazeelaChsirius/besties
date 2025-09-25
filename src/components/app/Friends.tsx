import useSWR, { mutate } from "swr"
import Card from "../shared/Card"
import Fetcher from "../../lib/Fetcher"
import Error from "../shared/Error"
import { Skeleton } from "antd"
import CatchError from "../../lib/CatchError"
import HttpInterceptor from "../../lib/HttpInterceptor"

const Friends = () => {
  const {data, error, isLoading} = useSWR('/friend', Fetcher)
  console.log('friend data', data)

  if(isLoading)
    return <Skeleton active />

  if(error)
    return <Error message={error.message}/>

  const unfriend = async (id: string) => {
    try {
      await HttpInterceptor.delete(`/friend/${id}`)
      mutate('/friend')
      
    } catch (err) {
      CatchError(err)
    }
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.map((item: any, index: number) => (
          <Card>
            <div key={index} className="flex flex-col items-center gap-3">
              <img 
                src={item.friend.image || "/images/girl.png"}
                className="w-16 h-16 rounded-full object-cover"
              />
              <h1 className="text-base font-medium text-black">{item.friend.fullname}</h1>
              {
                item.status === "accepted" ?
                <button onClick={() => unfriend(item._id)} className=" mt-2 px-2 py-1 rounded text-xs bg-rose-400 hover:bg-rose-500 font-medium text-white">
                  <i className="ri-user-minus-line mr-1"></i>
                  Unfriend
                </button>
                :
               <button className=" mt-2 px-2 py-1 rounded text-xs bg-green-400 hover:bg-gray-400 font-medium text-white">
                  <i className="ri-check-double-line mr-1"></i>
                  Request sent
                </button>
              }
            </div>
          </Card>
        ))
      }
    </div>
  )
}

export default Friends