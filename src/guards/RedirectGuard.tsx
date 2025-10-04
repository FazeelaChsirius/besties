import { useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import HttpInterceptor from "../lib/HttpInterceptor"
import Context from "../Context"
import CatchError from "../lib/CatchError"
import { Skeleton } from "antd"

const RedirectGuard = () => {
    const context = useContext(Context)
    const { session, setSession } = context
    useEffect(() => {
        getSession()
    }, [])

    const getSession = async () => {
        try {
            const {data} = await HttpInterceptor.get('/auth/session')
            setSession(data)
            console.log(data)
            
        } catch (err: unknown) {
            setSession(false)
            CatchError(err)
        }
    }

    if(session === null)
        return <Skeleton active />

    if(session === false)
        return <Outlet />

    return <Navigate to="/app" />
}

export default RedirectGuard