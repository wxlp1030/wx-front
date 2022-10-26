import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Parent from './pages/Parent';
import React from 'react';
function App() {
    return (
        <Router>
            <Parent />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <Routes>
                <Route index element={<Home />} />
                {/* <Route path='/' component={Home} /> */}
                <Route path="blogs" element={<Blogs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </Router>
    );
}

export default App;
