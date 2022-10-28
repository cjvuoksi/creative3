import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from "./pages"; 
import About from "./pages/about"; 
import Products from "./pages/products"; 
import Header from "./elements/header"; 
import Footer from "./elements/footer"; 


function App() {
  return (
    <Router>
    <Header />
      <Routes>
        <Route path='/react-website/build/' element={<Home />} /> 
        <Route path="/react-website/build/about" element={<About />} /> 
        <Route path="/react-website/build/products" element={<Products />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
