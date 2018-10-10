import React, {Component} from 'react';

class Rank extends Component{
	render(){
		return (
			<div>
				<div>
					<p className="white f3"> {`${this.props.name}, your count is...`} </p>
				</div>
				<div>
					<p className="white f1"> {this.props.entries} </p>
				</div>
			</div>
			);
	}
}

export default Rank;