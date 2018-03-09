import React from 'react';
const css = require('../../assets/css/custom.css');
import axios from 'axios';
import {loadState,saveState} from '../../utils/localStorage.js'
import { withRouter} from 'react-router-dom';
class Login extends React.Component {
   constructor(props){
	super(props);
	this.state = {
      username: '',
      password:'',
      data:[],
      searching:false
    };
  }
  handleChange(type,event){
  	this.setState({[type]:event.target.value,invalid:false})
  } 
  submitForm(){
  	this.setState({searching:true})
  	if(!this.state.username||!this.state.password){
  		this.setState({invalid:true,searching:false})
  		return false
  	}	
  	
  	axios.get(`https://swapi.co/api/people/?search=${this.state.username}`)
	  .then((response)=>{
		let isRecordFound = false
		if(response.data && response.data.results){
			response.data.results.map((info)=>{
				if(info.name === this.state.username && info.birth_year===this.state.password){
					saveState(info)
					isRecordFound = true
				} 
			})
		}
		if(!isRecordFound){
			alert("username and password not matched")
		}else{
			this.props.history.push("/search")
		}
		this.setState({searching:false})
	  })
	  .catch((error)=>{
		this.setState({searching:false,data:[]});
	  });  
  }
   render() {
      return (
         <div>
            <section id="login">
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<div className="form-wrap">
							<h1>Log in with your account username</h1>
								<form role="form" id="login-form" autoComplete="off" >
									<div className={`row ${this.state.invalid?'show':'hide'}`}>
										<div className="col-md-12" style={{color:'#e60000'}}>
											UserName and Password is required fields!
										</div>	
									</div>
									<div className={`row ${this.state.searching?'show':'hide'}`}>
										<div className="col-md-12" style={{color:'#000'}}>
											<h5>Searching.......</h5>
										</div>	
									</div>
									
									<div className="form-group">
										<label htmlFor="username" className="sr-only">Username</label>
										<input type="username" name="username" id="username" className="form-control" placeholder="username" onChange={this.handleChange.bind(this,'username')}required/>
									</div>
									<div className="form-group">
										<label htmlFor="key" className="sr-only">Password</label>
										<input type="password" name="key" id="key" className="form-control" placeholder="Password" onChange={this.handleChange.bind(this,'password')} required/>
									</div>
									<button type="button" className={`btn btn-custom btn-lg btn-block `} onClick={this.submitForm.bind(this)}>Log In</button>
								</form>
								{this.searching?"Validating":''}
							</div>
						</div> 
					</div> 
				</div> 
			</section>
		</div>
      );
   }
}
export default Login;

