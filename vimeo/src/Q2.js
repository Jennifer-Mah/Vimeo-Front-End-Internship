import React, { Component } from 'react';
import './Q2.css';
import { movies } from './movies';

class Question2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            translation: 0, 
            numItems: movies.length,
            viewWidth: document.body.clientWidth*this.numItems, 
            width: document.body.clientWidth, 
            time: 0
        }
        this.prevItem = this.prevItem.bind(this);
        this.nextItem = this.nextItem.bind(this);
        this.updateViewWidth = this.updateViewWidth.bind(this);
    }
    prevItem() {
        var width = this.getWidth();
        this.setState({
            time: 0.50,
            width: width
        })
        if (this.state.currentIndex === 0) {
            this.setState({
                currentIndex: this.state.numItems -1,
                translation: (this.state.numItems-1)*-width, 
            })
        }
        else {
            this.setState({
                currentIndex: this.state.currentIndex -1,
                translation: this.state.translation + width,
            })
        }
    }   
    nextItem() {
        var width = this.getWidth(); 
        this.setState({
            time: 0.25,
            width: width
        })
        if (this.state.currentIndex === this.state.numItems-1) {
            this.setState({
                currentIndex: 0,
                translation: 0, 
            })
        }
        else {
            this.setState({
                currentIndex: this.state.currentIndex +1,
                translation: this.state.translation - width, 
            })
        }
    }
    getWidth = () => {
        return window.innerWidth || document.documentElement.clientWidth|| document.body.clientWidth;
    }
    updateViewWidth() {
        this.setState({
            viewWidth: (this.getWidth())*this.state.numItems, 
            translation: this.getWidth()*(-this.state.currentIndex),
            time: 0, 
            width: this.getWidth()
        })
    }
    componentWillMount() {
        this.updateViewWidth(); 
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateViewWidth);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateViewWidth);
    }
    render() {
      return (
        <div className="carousel">
            <Arrow clickHandler = {this.prevItem} direction = {'left'}/>
            <Arrow clickHandler = {this.nextItem} direction = {'right'}/>
            <div className="carousel-view" style = {{width: this.state.width}}>
                <div className = "carousel-item-container" style={{
                transform: `translateX(${this.state.translation}px)`,
                transition: `transform ease-in ${this.state.time}s`, 
                width: this.state.viewWidth + 'px'
              }}>
                {
                movies.map((item,i) => {
                    return (<CarouselItem 
                                key = {i}
                                title = {movies[i].title} 
                                imgUrl = {movies[i].imgUrl} 
                                info={movies[i].description}
                                buttonColor={movies[i].buttonColor}
                            />);
                })
            }
                </div>
            </div>
        </div>
      );
    }
  }
  

    const Arrow = ({ direction, clickHandler }) => {
        if (direction === 'right'){
            return (
                <div className="nextArrow" onClick={clickHandler}>
                    <i className="fas fa-chevron-right"></i>
                </div>
            );
        } else if (direction === 'left') {
            return (
                <div className="prevArrow" onClick={clickHandler}>
                   <i className="fas fa-chevron-left"></i>
                </div>
            );
        }
    };

     
                    

class CarouselItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth || document.documentElement.clientWidth|| document.body.clientWidth
        }
        this.updateWidth = this.updateWidth.bind(this);
    } 
    updateWidth() {
        this.setState({width: window.innerWidth || document.documentElement.clientWidth|| document.body.clientWidth});
    } 
    componentWillMount() {
        this.updateWidth(); 
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateWidth);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWidth);
    }
    render() {
        return (
        <div>
        <div className="carousel-item-background" style={{
            width: `${this.state.width}px`,
            background: `url(${this.props.imgUrl}) center`,
            'backgroundSize': 'cover'
          }} ></div>
        <div className = "carousel-item" style={{
            width: `${this.state.width}px`
          }} >
            <img className = "carousel-image" alt="carouselimage" src = {this.props.imgUrl}/>
                <div className = "carousel-item-text">
                    <h1>{this.props.title}</h1>
                    <p>{this.props.info}</p>
                    <div className="carousel-item-buttons">
                        <div className = "carousel-item-buynow" style ={{backgroundColor: this.props.buttonColor}}><span><i className="far fa-play-circle"></i> Buy Now</span></div>
                        <div className = "carousel-item-trailer"><span>Watch Now</span></div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}


  export default Question2;