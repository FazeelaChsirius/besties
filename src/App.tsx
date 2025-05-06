import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'remixicon/fonts/remixicon.css'
import 'animate.css'
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Layout from "./components/app/Layout"
import Dashboard from "./components/app/Dashboard"
import Post from "./components/app/Post"
import Friends from "./components/app/Friends"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/app" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />}/>
        <Route path="my-posts" element={<Post />}/>
        <Route path="friends" element={<Friends />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App