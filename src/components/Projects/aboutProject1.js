import React, { Component } from 'react';



class aboutProject1 extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="project-about">
                <h2 className="project-title">About This Project</h2>
                <p>This is a hotel room finder project that i put together over the span of a month. There is still some things I would have liked to add like a 
                    weather widget and some color scheme changes but it does what it needs to do. Overall I really enjoyed making this project 
                    and learned alot about redux, react router dom, and back end hosting through contentful. The most challenging part of this project for me was learning to create 
                    filters to search rooms based on price, number of people, and room options. After breaking it several times over I was finally able to get a working version of the 
                    Room Filter which can show rooms based on dependencies and search criteria. I find that this could be a very useful device in many applications outside of hotels and real estate, such as narrowing a 
                    search for products in ecommerce or finding the perfect car. It was a good learning lesson and applicable in many instances. This project is also mobile friendly which I think is very important since we live in a world where everyone is always on 
                    their phones. I think mobile integration and responsiveness is a highly valued characterisitc of any modern web application.</p>
            </div>
        );
    }
}

export default aboutProject1;