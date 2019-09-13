import React, { Component } from 'react';

import Headshot from './images/AboutHeadShot.png';

class About extends Component {
render() {
    return(
        <div className="about-color">
            <h2 className="about-title">About Me</h2>
            <hr className="about-hr" />
        <div className="cover-image">
            <img src={Headshot} alt="cover" />
        </div>
        <div className="about-me">
        <p>I am a Full Stack React Developer from Hawaii, that now lives in Texas. The next question is always "Why did you move from Hawaii?" or "Do you surf?". Simply put, my family moved here 19 years ago and have been here ever since, and no. I don't surf. Like at all. But, I do enjoy coding, gaming, going to the gym, working on cars, and anything that involves music. I produce music as a hobby and enjoy going to concerts and festivals when I'm not "running sleek performing, low overhead, scholar code with high rotor functions that will run on anything" (Silicon Valley Reference, great show). I have been coding for about 2 years now and have 1 year of React experience. I started learning through Youtube, Udemy, Freecodecamp, and have been continuously learning ever since. I am a really creative person, so I enjoy the fact that in development you can take an idea and turn it in to a working product. Right now I am more into front-end, UI, and mobile development, but I hope to one day get into the Artificial Intelligence space and branch out into other ventures.</p>
        </div>

        </div>
    );
}
}

export default About
