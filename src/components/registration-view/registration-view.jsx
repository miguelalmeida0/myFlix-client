import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, name, password, email)
    if (isReq) {
      axios.post('https://driveindb.herokuapp.com/users', {
        username: username,
        password: password
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // this second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('Error registering the user')
        });
    };

  }

  return (
    <div className="registration">
      <Router>

        <Form>
          <h1 className="form-title">Register</h1>
          <Form.Group controlId="registration-Username">
            <Form.Label>Username:</Form.Label>
            <Form.Control className="username" value={username} type="text" placeholder="Create Username" onChange={e => setUsername(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="registration-Password">
            <Form.Label>Password:</Form.Label>
            <Form.Control className="password" value={password} type="text" placeholder="Create Password" onChange={e => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="registration-Email">
            <Form.Label>Email:</Form.Label>
            <Form.Control className="email" value={email} type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)}></Form.Control>
          </Form.Group>


          <div className="registration-button">
            <Button variant="success link" className="registerBtn" type="submit" onClick={handleSubmit}>Register </Button>
            <Button onClick={() => { window.location.href = "/" }} variant="primary" type="button">Login</Button>
          </div>
        </Form>
      </Router>
    </div>
  );
}



RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func,
};