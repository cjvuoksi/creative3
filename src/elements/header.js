import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";



  
function Header() {
  const navigate = useNavigate(); 
  class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        form: ''
      };
      this.handleChange = this.handleChange.bind(this); 
      this.handleSubmit = this.handleSubmit.bind(this); 
    }
    
    handleChange(event) {
      this.state.form = event.target.value; 
    }
    handleSubmit(event) {
      navigate('/react-website/build/products', {state: {value: this.state.form}});
    }
    
    render() {
      return (
        <form onKeyUp={this.handleChange} onSubmit={this.handleSubmit}>
          <input placeholder="Book title or author...">
          </input>
        </form>
        );
    }
  }
  
  
  return (
      <div className="NavBar">
        <div className="NavMenu">
          <NavLink to="/react-website/build/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/react-website/build/about" activeStyle>
            About
          </NavLink>
          <NavLink 
            to="/react-website/build/products" state={{ value: ""}} activeStyle>
            Books
          </NavLink>
          <Search /> 
        </div>
      </div>
  );
};
  
export default Header;