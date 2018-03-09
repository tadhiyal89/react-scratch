/*
 *
 * Search Page
 *
 *
*/

import React from 'react';
import axios from 'axios';
import Header from '../../components/Header'
import {Link} from 'react-router-dom'
import {loadState,saveState} from '../../utils/localStorage.js'
import { withRouter} from 'react-router-dom';

class Details extends React.Component {
  constructor(props){
	super(props);
  this.state = {
      value: '',
      data:[],
      searching:false,
    };
  }
  componentDidMount(){
  this.setState({searching:true});
  const state = loadState()
  if(!state){
    this.props.history.push("/")
  }
  axios.get(`https://swapi.co/api/planets/${this.props.match.params.id}`)
    .then((response)=>{
      this.setState({data:response.data,searching:false});
      
    })
    .catch((error)=>{
      this.setState({searching:false,data:[]});
    });
  }
  render() {
    return (
      <div>
        <Header props={this.props}/>
		    <div className="row">
          <div className="section">
            <div className="container">
              <div className={`row ${this.state.searching?'show':'hide'}`}>
                  <h2>Loading.......</h2>
              </div>
              <div className={`panel panel-default ${this.state.searching?'hide':'show'}`}>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-6"><h1>Planet Information</h1></div>
                  <div className="col-md-6"><Link to={`/search`}>
                    <button className="btn btn-primary pull-right" style={{'verticalAlign': 'middle','marginTop': '30px','float': 'right'}}>Back Button</button>
                    </Link></div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h2>{this.state.data.name}</h2>
                    <p>Population:{this.state.data && this.state.data.population?this.state.data.population:'NA'}</p>
                    <p>Rotation Period:{this.state.data && this.state.data.rotation_period?this.state.data.rotation_period:'NA'}</p>
                    <p>Orbital Period:{this.state.data && this.state.data.orbital_period?this.state.data.orbital_period:'NA'}</p>
                    <p>Climate:{this.state.data && this.state.data.climate?this.state.data.climate:'NA'}</p>
                    <p>Diameter:{this.state.data && this.state.data.diameter?this.state.data.diameter:'NA'}</p>
                  </div>
                </div>
              </div>
          </div>
            </div>
          </div>
		 	  </div>
      </div>
    );
  }
}

export default Details;


