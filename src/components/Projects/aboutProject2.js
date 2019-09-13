import React, { Component } from 'react';

class aboutProject2 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="project-about">
                <h2 className="project-title">About This Project</h2>
                <p>This is one of my first projects in react I did a while ago. It's not as stylish as I would like it to be
                    but it does work very well. With this project I learned the integration of third party APIs and 
                    how they can be used to pull and display information within an application. The only downfall of this API would be 
                    that it only allows for an x amount of requests per minute, which can be a problem if someone tries to search for multiple
                    recipes in succession. Overall it was a fun and interesting project and a great introduction to React.     
                </p>
            </div>
        );
    }
}

export default aboutProject2;