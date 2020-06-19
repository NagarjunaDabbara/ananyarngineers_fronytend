import React, { Component } from 'react'
import axios from "axios";
import './App.css'
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      message: "",
      disabled: false,
      emailSent: null,
    }
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }


  handleSubmit = (event) => {
    event.preventDefault();

    console.log(event.target);

    this.setState({
      disabled: true
    });

    axios.post('http://ananyabackend-env-1.eba-zdzqzrrb.us-east-2.elasticbeanstalk.com/api/email',{
      email:this.state.email,
      message:this.state.message
  })
      .then(res => {
        if (res.data.success) {
         return this.setState({
            disabled: false,
            emailSent: true
          });
        } else {
          this.setState({
            disabled: false,
            emailSent: false
          });
        }
      })
      .catch(err => {
        console.log(err);

        this.setState({
          disabled: false,
          emailSent: false
        });
      })

  }

  render() {
    return (
      <div>
      <div>
        {/* <!--contact --> */}
        <div id="contact" class="contact">
          <div class="team-info">
            <div class="container">
              <h3 class="title">Contact Us</h3>
              <div class="contact-form">
              <form onSubmit={this.handleSubmit}>
<input type="text" name="firstname" id="firstname" placeholder="Name" required />
    <input type="text" name="surname" id="surname" placeholder="Phone Number" required />

    <input type="email" name="email" id="email" placeholder="E-mail address"  value={this.state.email} onChange={this.handleChange} required />

    <textarea name="message" id="message" placeholder="Message" value={this.state.message} onChange={this.handleChange}></textarea>

    <input type="submit" disabled={this.state.disabled} id="submit-btn" value="Send" />
   <br/>
    {this.state.emailSent === false && <p className="d-inline success-msg">Email Sent</p>}
         
 </form>

              </div>
            </div>
          </div>
        </div>
        {/* <!--//contact --> */}
      </div>

      <div className="map-w3layouts">
        <iframe
          className="imgs1"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d947.1977792679218!2d77.59404382919512!3d14.704665999358511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQyJzE2LjgiTiA3N8KwMzUnNDAuNSJF!5e1!3m2!1sen!2sin!4v1568392550093!5m2!1sen!2sin"
          allowfullscreen=""
        ></iframe>
      </div>
    </div>
    )
  }
}

export default App
