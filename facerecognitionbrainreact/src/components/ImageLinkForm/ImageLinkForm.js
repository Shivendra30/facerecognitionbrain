import React, {Component} from 'react';
import "./ImageLinkForm.css"

class ImageLinkForm extends Component{
	render(){
		return(
			<div>
				<p className='f3'>
				{`The Magic Brain will detect your faces in your pictures. Give it a try`}
				</p>
				<div className="center">
					<div className=" form center pa3 br3 shadow-5">
						
						<input 
						type="text" 
						className="f3 pa2 w-70 center" 
						
						onChange={this.props.onInputChange}/>
						
						<button 
						className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" 
						onClick={this.props.onSubmit}> 
						Detect 
						</button>
						
					</div>	
				</div>
			</div>
			);
	}
}

export default ImageLinkForm;