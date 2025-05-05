import { BrowserRouter, Route, Routes } from "react-router-dom"
import 'remixicon/fonts/remixicon.css'
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Layout from "./components/app/Layout"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/app" element={<Layout />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App