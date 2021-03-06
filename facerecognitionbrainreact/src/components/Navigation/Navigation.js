import React, {Component} from 'react';

class Navigation extends Component{

	render(){
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => this.props.onRouteChange('signin')}
				className="f3 link dim black underline pa3 pointer">
				Sign Out 
				</p>
			</nav>
			);
	}
}

export default Navigation;