import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';

import Stonks from './images/avatarStock.png';

class Contact extends Component {
render() {
    return(
        <div className="contact-body">
            <Grid className="contact-grid">
                <Cell col={6}>
                    <h3>Contact Me</h3>
                    <hr />

                    <h4>Email: nicolasmrodriguez3@gmail.com</h4>
                </Cell>

                <Cell col={6}>
                    <h2>Hello World :)</h2>
                    <img src={Stonks} alt="avatar" style={{height: '250px'}}/>
                    <p style={{width: '75%', margin: 'auto', paddingTop: '1em'}}><div className="thank-you">Thank you for visting my website!</div></p>
                </Cell>
            </Grid>
        </div>
    );
}
}

export default Contact
