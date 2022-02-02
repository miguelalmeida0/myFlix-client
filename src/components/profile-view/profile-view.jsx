import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import FavoriteMovies from './favorite-movies'
import UpdateUser from './update-user'
import UserInfo from './user-info'





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
      <div>
        <Container>
          <Row>
            <Col xs={12} sm={4}>
              <Card>
                <Card.Body>
                  <UserInfo name={user.Username} email={user.Email} />
                </Card.Body>
              </Card>

            </Col>
            <Col xs={12} sm={8}>
              <Card>
                <Card.Body>
                  <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
                </Card.Body>
              </Card>

            </Col>

            <FavoriteMovies favoriteMovieList={favoriteMovieList} />

          </Row>
        </Container>
      </div>
    )
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

