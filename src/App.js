import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
  
  this.state = {
    userInput: '',
    pic: '', 
    tracklink: ''
  }

  this.handleChange = this.handleChange.bind(this);
  this.fetchData = this.fetchData.bind(this);
  }

  handleChange(e){
    this.setState({
      userInput: e.target.value
    });
  }

  fetchData() {
    const band = this.state.userInput.replace(/ /g,"-");
    const fetch_url = 'https://api.deezer.com/search/artist/?q=' + band +'&index=0&limit=1&output=json';
      fetch(fetch_url, {method: 'GET', mode: 'cors'})
        .then(response => response.json())
        .then(json => 
          {this.setState({ 
            pic: json.data[0].picture_big,
            tracklink: json.data[0].tracklist,
          })
  })
      .catch(err => console.error('ERRORE:' + err));
  } 


render() {
  return (
    <div className="App">
      <div className="searchWrapper">
        <input onChange = {this.handleChange}
          value= {this.state.UserInput}
          placeholder="your favorite artist"></input>
        <button className="search-btn" onClick={this.fetchData}>Search</button>
      </div>
  <Fetch {...this.state}/>
    </div>
  );
}
}

  class Fetch extends Component {
    constructor(props){
      super(props);
  
  this.state = {

    data: []
  }
  this.fetchTracks = this.fetchTracks.bind(this);
  }

  fetchTracks(){
    const link= this.props.tracklink;
    fetch(link, {method: 'GET', mode: 'cors'})
    .then(response => response.json())
    .then(json => 
      {this.setState({ //USE MAP?

          data: [
            [json.data[0].title,
          json.data[0].album.cover_medium,
          json.data[0].preview],

          [json.data[1].title,
          json.data[1].album.cover_medium,
          json.data[1].preview],

          [json.data[2].title,
          json.data[2].album.cover_medium,
          json.data[2].preview],
          
          [json.data[3].title,
          json.data[3].album.cover_medium,
          json.data[3].preview]]
        })
    }) 
        .catch(err => console.error('ERRORE:' + err));
  }

  render() {
    let rendiamo = this.state.data;
    return (
      <div className="Fetch">
        <div className="imgWrapper">
        <button className="image-btn" onClick={this.fetchTracks}>
          <img className="artistImg" src={this.props.pic} alt=""/>
        </button>
      </div>
      <div className="tracksWrapper">
          {rendiamo.map(function(name){
            return  <div className="track-wrap">
                      <div className="title-wrap">
                        <p>{name[0]}</p>
                      </div>
                      <div className="cover-wrap">
                        <img className="track-cover" src={name[1]} alt=""/>
                      </div>
                    </div>
          })}
        </div>
      </div>
    );
  }
  }


export default App;
