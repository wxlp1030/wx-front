import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home.js'
import Nopage from './pages/Nopage.js'
import About from './pages/About.js'

function App() {
  return (
    <BrowserRouter>
		<ul>
			<li><Link to="/">Home</Link></li>
			<li><Link to="/about">about</Link></li>
			<li><Link to="/age">age</Link></li>
		</ul>
		<Routes> 
			<Route path="/" element={<Home />} />
			<Route path="about" element={<About />} />
			<Route path="*" element={<Nopage />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
