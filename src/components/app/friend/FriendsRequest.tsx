import { Swiper, SwiperSlide } from 'swiper/react'
import Card from '../../shared/Card'
import 'swiper/css'
import SmallButton from '../../shared/SmallButton'
import useSWR, { mutate } from 'swr'
import Fetcher from '../../../lib/Fetcher'
import { Empty, Skeleton } from 'antd'
import CatchError from '../../../lib/CatchError'
import HttpInterceptor from '../../../lib/HttpInterceptor'

const FriendsRequest = () => {
  const {data, error, isLoading} = useSWR('/friend/request', Fetcher)
  console.log('frient request', data)

  if(isLoading)
    return <Skeleton />

  if(error)
    return <Empty />

  const acceptFriend = async (id: string) => {
    try {
      await HttpInterceptor.put(`/friend/${id}`, {status: "accepted"})
      mutate('/friend/request')
      mutate('/friend')

    } catch (err) {
      CatchError(err)
    }
  }

  return (
    <Card title="Requests" divider>
      <div>
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          className="mySwiper"
        >
          {
            data.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <div className='flex flex-col items-center gap-2 border border-gray-100 p-3 rounded-lg'>
                  <img src='/images/girl.png' className='w-[80px] h-[80px] rounded-full object-cover'/>
                  <h1 className='text-base font-medium text-black'>{item.user.fullname}</h1>
                  <SmallButton type='warning' icon='check-double-line' onClick={()=>acceptFriend(item._id)}>Accept</SmallButton>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </Card>
  )
}

export default FriendsRequest
