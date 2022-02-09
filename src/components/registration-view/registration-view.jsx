import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { Link, Router } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const validate = () => {
    let isReq = true;
    if (!Username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (Username.length < 6) {
      setUsernameErr('Username must be 6 characters long');
      isReq = false;
    }
    if (!Password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (Password.length < 8) {
      setPasswordErr('Password must be 8 characters long');
      isReq = false;
    }
    if (!email) {
      setemailErr('Please user valid email')
    } else if (email.indexOf('@') === -1) {
      setemailErr('Please user valid email')
      isReq = false;
    }
    if (!Birthdate) {
      setBirthdateErr('Please enter birthdate')
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    console.log(username, password)
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
    <div className="registration-view">
      <Container fluid style={{ paddingTop: '0.75rem' }}>
        <Row>
          <Col>
            <CardGroup>
              <Card bg="secondary" text="white" border="light">
                <Card.Body>
                  <Card.Title>Register</Card.Title>
                  <Form>
                    <Form.Group>
                      <Form.Label> Username: </Form.Label>
                      <Form.Control
                        type="text"
                        value={Username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        placeholder="Enter a username" />
                      {UsernameErr && <p>{UsernameErr}</p>}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        value={Password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength="6"
                        placeholder="Your password must be at least 6 characters" />
                      {PasswordErr && <p>{PasswordErr}</p>}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email" />
                      {emailErr && <p>{emailErr}</p>}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control
                        type="date"
                        value={Birthdate}
                        onChange={e => setBirthdate(e.target.value)}
                        required
                        placeholder="Enter your Birthday" />
                      {BirthdateErr && <p>{BirthdateErr}</p>}
                    </Form.Group>
                    <Button variant="light" style={{ color: "white" }} type="submit"
                      onClick={handleSubmit}>
                      Submit
                    </Button>

                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}