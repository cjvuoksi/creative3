import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from "./pages"; 
import About from "./pages/about"; 
import Products from "./pages/products"; 
import Header from "./elements/header"; 


function App() {
  return (
    <Router>
    <Header />
      <Routes>
        <Route exact path='/' exact element={<Home />} /> 
        <Route path="/about" element={<About />} /> 
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
