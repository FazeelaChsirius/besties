import HttpInterceptor from "./HttpInterceptor"

const Fetcher = async (url: string) => {
    try {
        const {data} = await HttpInterceptor.get(url)
        return data
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        throw new Error(err)
    }
}

export default Fetcher