import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Blog from "./components/Blog"
import Footer from "./components/Footer"

import { Routes, Route } from "react-router-dom";

import './styles/App.scss'

function App() {
  return (
    <>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/blog/:title" element={<Blog/>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
