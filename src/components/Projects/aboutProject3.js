import React, { Component } from 'react';

class aboutProject3 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="project-about">
                <h2 className="project-title">About This Project</h2>
                <p>This was a very interesting project that I picked up from a youtube video and recreated with my own little touches. 
                    In this project I learned the potential ability of React. Granted I am not a game developer (yet) and this probably 
                    could have been done with a lot less code in something like C++ or Java but it was still interesting to see what can be done within the React framework.
                    This project uses alot of call backs and effects to structure the game stage, score, and actually make the pieces move accordingly. I also used several custom hooks
                    in order to help with structuring and liquidity of movement. One of the most interesting parts of this project to me was being able to recreate the Tetrominos
                    in React. It shows that React has alot of potential to be used in many different applications, although I would not suggest game development in React. It is very tideous. Overall
                    this was a great learning experience and really shows the capabilities of the React framework. </p>
            </div>
        );
    }
}

export default aboutProject3;