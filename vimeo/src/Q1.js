import React, { Component } from 'react';
import './Q1.css';
import axios from 'axios';

class Question1 extends Component {
    
    render() {
      return (
        <div className="Question1">
            <Item video_id = {301879974} position = {'top'} description = {''}/>
            <div className="itemBackground">
               <Item video_id = {300461821} position = {'middle'} description = {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non nisi ut urna consectetur convallis. Praesent sollicitudin pretium elit. Nunc pellentesque pharetra tellus vitae pharetra. Nulla auctor orci sit amet orci cursus aliquam. Pellentesque quis ullamcorper orci, in feugiat risus. Curabitur consectetur condimentum tempus. Suspendisse ac lobortis ligula.'} />
                <Item video_id = {300425796} position={'bottom'} description = {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non nisi ut urna consectetur convallis. Praesent sollicitudin pretium elit. Nunc pellentesque pharetra tellus vitae pharetra. Nulla auctor orci sit amet orci cursus aliquam. Pellentesque quis ullamcorper orci, in feugiat risus. Curabitur consectetur condimentum tempus. Suspendisse ac lobortis ligula.'}/>
            </div>
        </div>
      );
  }
  }
  
  class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: `imageWrap imageWrap-${this.props.position}`, 
            description: '',
            title: ''
        };
        this.fetchVideo = this.fetchVideo.bind(this);
    }
    // use Axios to help get the information from Viemo API
    fetchVideo() {
        let currentComponent = this; 
        axios.get(`https://api.vimeo.com/videos/${this.props.video_id}?access_token=4cc1d06989e163a71607dbb3e18c905d`)
          .then(function(res) {
              console.log(res);
            currentComponent.setState({
                html: res.data.embed.html, 
                title: res.data.name, 
                description: res.data.description
            })
            
          });
    }
    componentWillMount() {
        this.fetchVideo();
    }
    render() {
        return(
            <div className="itemWrap">
            <div className="textWrap">
                    <h1>{this.state.title}</h1>
                    <p>
                    {this.state.description}
                    </p>
                </div>
                <div className={this.state.classes}>
                    <iframe src={`https://player.vimeo.com/video/${this.props.video_id}?badge=0&autopause=0&player_id=0&app_id=135742`} width="480" height="270" frameBorder="0" title="Fill title" allowFullScreen></iframe>
                </div>
            </div>
        )
    }
  }

  export default Question1;