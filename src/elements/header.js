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
      navigate('/products', {state: {value: this.state.form}});
    }
    
    render() {
      return (
        <form onKeyUp={this.handleChange} onSubmit={this.handleSubmit}>
          <input placeholder="Book name...">
          </input>
        </form>
        )
    }
    }
  
  
  return (
      <div className="NavBar">
        <div className="NavMenu">
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <Link 
            to={{
              pathname: "/products", 
              state: {value: ""}
            }} activeStyle> {/*TODO fix default value*/}
            Products
          </Link>
          <Search /> 
        </div>
      </div>
  );
};
  
export default Header;