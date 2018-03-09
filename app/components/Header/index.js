/**
*
* Header Component
*
*/

import React, { PropTypes } from 'react';
import {loadState,saveState} from '../../utils/localStorage.js'
import { withRouter} from 'react-router-dom';
class Header extends React.Component {
  constructor(props){
    super(props)
  }
  logOut(){
    saveState('')
    this.props.props.history.push("/")
  }
  render(){
  return (
     <nav className="navbar navbar-inverse">
        <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">SWAPI</a>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#" onClick={this.logOut.bind(this)}><span className="glyphicon glyphicon-user"></span> Logout</a></li>
          </ul>
        </div>
      </nav>  
  )
  };
}



export default Header;
