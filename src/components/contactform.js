import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component{
render() {
    return (
      <div className="contact-form">

      <form>

  <label>First Name</label>
  <input type="text" id="fname" name="firstname" placeholder="Your name.."
    value={this.state.fname}
    onChange={e => this.setState({ fname: e.target.value })}
  />

  <label>Last Name</label>
  <input type=" text" id="lname" name="lastname" placeholder="Your last name.."
    value={this.state.lname}
    onChange={e => this.setState({ lname: e.target.value })}
  />

  <label>Email</label>
  <input type="email" id="email" name="email" placeholder="Your email"
    value={this.state.email}
    onChange={e => this.setState({ email: e.target.value })}
  />


  <label>Message</label>
  <textarea id="message" name="message" placeholder="Write something.."
    onChange={e => this.setState({ message: e.target.value })}
    value={this.state.message}
  ></textarea>
  <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />

  <div>
  {this.state.mailSent &&
    <div>Thank you for contcting me.</div>
  }
</div>
</form >
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      message: '',
    }
  }

  
  handleFormSubmit( event ) {
    event.preventDefault();
    console.log(this.state);
  }

  handleFormSubmit = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: `${null}`,
      headers: { 'content-type': 'application/json' },
      data: this.state
    })
      .then(result => {
        this.setState({
          mailSent: result.data.sent
        })
      })
      .catch(error => this.setState({ error: error.message }));
  };
}

export default Form
