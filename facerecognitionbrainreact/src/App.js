import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


const particleOptions = {
particles: {
	number: {
		value: 150, 
		density: {
			enable: true,
			value_area: 800
		}
	}
}
}

class App extends Component {
  constructor(){
  	super();
  	this.state = {
  		input: '',
      imgUrl: '',
      bounding_box: {},
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
  	}
  }

  loadUser(userData){
    const {id, name, email, entries, joined} = userData;
    this.setState({
      imgUrl: '',
      user: {
      id: id,
      name: name,
      email: email,
      entries: entries,
      joined: joined
    }
  });

    console.log('loadUser', this.state.user);

  }

  calculateFaceLocation(response){
    console.log('calculating face location');
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log("Width", width);
    // console.log("Height", height);
    console.log(clarifaiFace.left_col);
    const box = {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
    console.log(box);
    this.setState({box: box});
  }


  onInputChange(event){
  	// console.log(event.target.value);
    const imageInput = event.target.value;
    this.setState({
      input: imageInput
    });
  }

  onSubmit(event){
    //Update the state with image URL entered by the user
    this.setState({imgUrl: this.state.input});

    fetch('http://localhost:3000/imageUrl', {
          method: 'post',  
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
        })
      }).then(response => response.json())
    .then(response => {
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'put',  
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(response => response.json())
        .then(entryCount => {
          this.setState(Object.assign(this.state.user, {entries: entryCount}));
        })
        .catch(err => {
          console.error(err);
        });
      }
      this.calculateFaceLocation(response)
    })
    .catch(err => console.log("Face Not Detected", err));
  }

  onRouteChange(route){
    this.setState({
      route: route
    });
  }

  render() {    
    return (
      <div className="App">
      	<Particles className='particles'
              params={particleOptions}
            />
        { this.state.route === 'home'
          ? <div>
            <Navigation onRouteChange= {this.onRouteChange.bind(this)}/> 
            <Logo /> 
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
            onInputChange={this.onInputChange.bind(this)} 
            onSubmit={this.onSubmit.bind(this)}
            imgUrl={this.state.imgUrl}/> 
            <FaceRecognition imageUrl={this.state.imgUrl} box={this.state.box}/>
          </div>
          : ( this.state.route === 'signin'
            ? <Signin onRouteChange= {this.onRouteChange.bind(this)} loadUser={this.loadUser.bind(this)}/>
            : <Register onRouteChange= {this.onRouteChange.bind(this)} loadUser={this.loadUser.bind(this)}/>
            )
          
          
        }
      </div>
    );  
  }
}

export default App;

// //   app.models
// .predict(
// Clarifai.COLOR_MODEL,
//     // URL
//     "https://samples.clarifai.com/metro-north.jpg"
// )
// .then(function(response) {
//     // do something with responseconsole.log(response);
//     },
//     function(err) {// there was an error}
// );
//You will get an error using Clarifai.DETECT_FACE,  it appears to have changed to Clarifai.FACE_DETECT_MODEL 

//7ca388a468c04594a144a389a2e9592b - API KEY