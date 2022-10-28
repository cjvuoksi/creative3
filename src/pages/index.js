import React from 'react';
import { useNavigate } from "react-router-dom"
  
//TODO Home page 
function Home() {
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
          <input placeholder="Book title or author...">
          </input>
        </form>
        );
    }
  }
  
  return (
    <div>
      <div className="home">
        <Search /> 
      </div>
    </div>
  );
};
  
export default Home;