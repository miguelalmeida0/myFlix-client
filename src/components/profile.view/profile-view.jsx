import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import './user-view.scss';


export class profileView extends React.Component {
  constructor(props) {
    super(props);
  }

  removeFavouriteMovie(_id) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    console.log(_id, '_id')
    axios.delete(`https://https://driveindb.herokuapp.com/user/favorites/delete/${user}/movies/${movies._id}`, {

      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        alert('Favorite was removed')
        window.location.reload();



      })
      .catch(function (error) {
        console.log(error);
      })
  }
  deleteUser() {

    const answer = window.confirm("Are you sure you want to delete your account?");
    if (answer) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      axios.delete(`https://https://driveindb.herokuapp.com/user/delete/${user}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(() => {
          alert(user + " has been deleted.");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.pathname = "/";
        })
        .catch(function (error) {
          console.log(error);
        })
    };

  }

  render() {
    const { movies, user, username, email, password } = this.props;

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <form>
              <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
              </label>
              <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </label>
              <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </label>
              <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }

}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array
  }).isRequired,
  setUser: PropTypes.func.isRequired,
}

