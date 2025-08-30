import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import HttpInterceptor from "./lib/HttpInterceptor"
import CatchError from "./lib/CatchError"


const Guard = () => {
    
    useEffect(() => {
        getSession()
    }, [])

    const getSession = async () => {
        try {
            const {data} = await HttpInterceptor.get('/auth/session')
            console.log(data)
           

        } catch (err) {
            CatchError(err)
        }
    }
    return (
        <Outlet />
    )
}

export default Guard