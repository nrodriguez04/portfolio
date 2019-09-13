import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import Avatar from './images/avatarHeadShot.png';

class Landing extends Component {
render() {
    return(
        <div style={{width: '100%', margin: 'auto'}}>
            <Grid className="landing-grid">
                <Cell col={12}>
                    <img src={Avatar} alt="avatar" className="avatar-img"/>
                    <div className="banner-text">
                        <h1>Full Stack Developer</h1>

                        <hr />

                        <p>
                            HTML/CSS | BootStrap | React | Node 
                        </p>

                        <div className="social-links">

                            {/*Linked In*/}
                            <a href="https://www.linkedin.com/in/nicolas-rodriguez-90576479/" rel="noopener noreferrer" target="_blank">
                                <i className="fa fa-linkedin-square" aria-hidden="true" />
                            </a>

                            {/*Github*/}
                            <a href="https://github.com/nrodriguez04" rel="noopener noreferrer" target="_blank">
                                <i className="fa fa-github-square" aria-hidden="true" />
                            </a>
                        </div>

                    </div>
                </Cell>
            </Grid>
        </div>
    );
}
}

export default Landing;
