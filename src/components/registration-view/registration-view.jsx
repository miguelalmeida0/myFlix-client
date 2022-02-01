import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Form, Button } from 'react-bootstrap'

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(username, password, email, birthday);

    console.log(username, password);

    console.log(username, password);

    /* Sends request to the server for authentication */

    props.onRegistration(username);
    const isReq = validate();
    if (isReq) {
      axios.post('https://driveindb.herokuapp.com/login', {
        username: username,
        password: password
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // this second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('error registering the user')
        });
    };

  }

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
        {/* This will display a validation error */}
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} minlength="8" placeholder="Your password must be 8 or more characters" />
        {/* This will display a validation error  */}
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
        {/* This will display a validation error  */}
        {emailErr && <p>{emailErr}</p>}
      </Form.Group>

      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Enter birthday" />
      </Form.Group>

      <Button variant="outline-light" type="submit" onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};