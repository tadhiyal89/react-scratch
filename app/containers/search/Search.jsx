/*
 *
 * Search Page
 *
 *
*/

import React from 'react';
import axios from 'axios';
import Header from '../../components/Header'
const css = require('./search.css');
import {Link} from 'react-router-dom'
import {loadState,saveState} from '../../utils/localStorage.js'
import { withRouter} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { required } from './validations.js';

class Search extends React.Component {
  constructor(){
	super();
	this.state = {
      value: '',
      data:[],
      searching:false,
      searchTime:'',
      searchCount:0
    };
    this.planetInfo = this.planetInfo.bind(this)
    this.handleSorting = this.handleSorting.bind(this)
    this.searchTextRecord = this.searchTextRecord.bind(this)
  }
  componentDidMount(){
  	const state = loadState()
	  if(!state){
	    this.props.history.push("/")
	  }
  }
  handleChange(event){
  	debugger
	this.setState({value:event.target.value},this.searchTextRecord())
  }
  handleSorting(event){
	if(!this.state.data.count){
		alert("No data is present")
		return false
	}
	if(this.state.data.count && this.state.data.results){
		let temp = this.state.data
		temp.results.sort(function(a,b){
			return a.name>b.name?1:-1;
		})
		this.setState({data:temp})
	}
  }
  searchTextRecord(){
  	let data = loadState()
  	if(this.state.searchTime){
  		let tempTime = new Date()
  		let timeDiff = tempTime.getMinutes()-this.state.searchTime.getMinutes()
  		if(timeDiff<1){
  			this.setState({searchCount:this.state.searchCount+1})
  		}
  		else{
  			this.setState({searchTime:new Date(),searchCount:1})	
  		}
  	}else{
  		this.setState({searchTime:new Date()})
  	}
	if(this.state.searchCount<=15||data.name==="Luke Skywalker"){
	this.setState({searching:true});
	axios.get(`https://swapi.co/api/planets/?search=${this.state.value}`)
	  .then((response)=>{
		this.setState({data:response.data,searching:false});
	  })
	  .catch((error)=>{
		this.setState({searching:false,data:[]});
	  });
	}else{
		alert("cannot fetch more than 15 time in a minute")
	}
  }
  planetInfo(){
  	let tempArr = []
  	this.state.data.count>0 && this.state.data.results.map((info,i)=>{
  		tempArr.push(info.population)
  	})
  	tempArr.sort(function(a, b){return b-a});
  	let html = this.state.data.count>0 && this.state.data.results.map((info,i)=>{
  		let splitArr = info.url.split('/')
  		return(
  			<div key={i} className="panel panel-default" >
    			<div className="panel-body">
    				<div className="row">
	    				<div className="col-md-6">
		    				{tempArr[0]===info.population?<h1>{info.name}</h1>:<h3>{info.name}</h3>}
		    				<p>{tempArr[0]===info.population?<b>Population:{info.population}</b>:<span>Population:{info.population}</span>}</p>
	    				</div>
	    				<div className="col-md-6">
	    					<Link to={`details/${splitArr[splitArr.length-2]}`}>
	    					<button className="btn btn-primary pull-right" style={{'verticalAlign': 'middle','marginTop': '30px','float': 'right'}}>View Record</button>
	    					</Link>
	    				</div>
    				</div>

    			</div>
			</div>)
  			
  	})
  	if(html){
  		html = <div className="section"><div className="container">{html}</div></div>
  	}
  	return html
  }
  render() {
    return (
      <div>
		 <Header props={this.props}/>
		 <div className="section">
          <div className="container">
            <div className="panel panel-default">
			  <div className="panel-body">
				<div className="row">
					<div className="col-md-11" style={{'marginBottom':'10px'}}>
						Type For Search
					</div>
				</div>
				<Form>	
				<div className="row">
					<div className="col-md-12">
						<div className="form-group">
						  <Input className={`form-control ${this.state.searching?'loading':''}`} type="text" placeholder="Search" onChange={this.handleChange.bind(this)} name="searching" validations={[required]}/>
						</div>
					</div>
				</div>
				</Form>
			 </div> 
			</div>  
		  </div>
		 </div>
          <div>  
			{this.state.data && (
			<div className="section">
				<div className="container">
				  <div className="row">
					<div className="col-md-4">
						<p className="subtitle" style={{'color':'#fff'}}>
						<span >{this.state.data.results?`${this.state.data.results.length} records showing out of `:''}{this.state.data.count?this.state.data.count:0}</span> records
						</p>
					</div>
					<div className="col-md-3 pull-left">
						<p className="form-group" style={{ marginLeft: 30 }}>
						  <span className="">
							<select className="form-control" value={this.state.data.searchSort} onChange={this.handleSorting}>
							  <option value="">Sort: none</option>
							  <option value="alpha">Sort: name(Alpha)</option>
							</select>
						  </span>
						</p>
				   </div>
				   <div className="col-md-8"></div>
				  </div>
                </div>
              </div>
            )}
            {this.planetInfo()}
            
          </div>
      </div>
    );
  }
}

export default Search;


