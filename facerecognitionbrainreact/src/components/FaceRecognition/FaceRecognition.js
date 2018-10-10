import React, {Component} from 'react';
import './FaceRecognition.css'

class FaceRecognition extends Component{
	
	render() {
		let divStyle = {};
		if(this.props.box !== undefined){
			divStyle ={
			top: this.props.box.topRow,
			bottom: this.props.box.bottomRow,
			left: this.props.box.leftCol,
			right: this.props.box.rightCol
			}
			console.log(this.props);
		}
		console.log(this.props);

		return (
			<div className="center ma">
				<div className="absolute mt2">
					<img src={this.props.imageUrl} 
					id = "inputimage"
					alt="Detect Here" 	
					width='500px' 
					height='auto'
					className="pa4 center"/>
					 
					<div className='bounding-box' style={divStyle}></div>
				</div>
			</div>
			);

	}
}

export default FaceRecognition;