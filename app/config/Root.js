import React from 'react';
import { IndexRoute,BrowserRouter as Router, Route} from 'react-router-dom';
import Login from '../containers/login/Login.jsx';
import Search from '../containers/search/Search.jsx';
import ViewDetails from '../containers/details/Index.jsx';
const Root = () => {
  return (
		<Router>
			<div>
			<Route path="/search" exact component={Search}/>
			<Route exact path="/details/:id"  component={ViewDetails}/>
			<Route path="/" exact component={Login}/>
			</div>
		</Router>
  );
};
export default Root;

