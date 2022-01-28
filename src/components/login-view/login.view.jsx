<<<<<<< Updated upstream
import React from 'react';
=======
import React, { useState } from 'react';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/Button';
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

export class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit() {
    const { username, password } = this.state;
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
    // this.props.onLoggedIn(username);
  }

<<<<<<< Updated upstream
  render() {
    return (
      <form>
        <label>
          Username:
          <input type="text" value={this.state.username} onChange={this.onUsernameChange} />
        </label>
        <label>
          Password:
          <input type="password" value={this.state.password} onChange={this.onPasswordChange} />
        </label>
        <button type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}
=======
  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
