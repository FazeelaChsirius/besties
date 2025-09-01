import { useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import HttpInterceptor from "./lib/HttpInterceptor"
import Context from "./Context"
import CatchError from "./lib/CatchError"


const Guard = () => {
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
        return null

    if(session === false)
        return <Navigate to="/login"/>

    return <Outlet />
}

export default Guard