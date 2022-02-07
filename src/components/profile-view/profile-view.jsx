import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import FavoriteMovies from './favorite-movies'
import { MovieCard } from '../movie-card/movie-card';
import UpdateUser from './update-user'
import UserInfo from './user-info'





export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.updateUserDetails = this.updateUserDetails.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteUserDetails = this.deleteUserDetails.bind(this);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
  }

  getUserDetails(token) {
    const Username = localStorage.getItem('user');
    axios.get(`https://driveindb.herokuapp.com/users${this.props.user}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.setState({
        // Store the details in the appropriate state variables (separating the FavoriteMovies array for ease of use)
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
        FavoriteMovies: response.data.FavoriteMovies,
      });
    }).catch(function (error) {
      console.log(error);
    });
  };

  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .put(
        `https://driveindb.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem('user', this.state.Username);
        alert("Profile updated");
        window.open('/profile', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  removeFavouriteMovie(_id) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    console.log(_id, '_id')
    axios.delete(`https://driveindb.herokuapp.com/user/favorites/delete/${user}/movies/${movies._id}`, {

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
      axios.delete(`https://driveindb.herokuapp.com/user/delete/${user}`,
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

  setUsername(value) {
    this.setState({
      Username: value,
    });
  }



  render() {
    const { movies, onBackClick } = this.props;
    const { FavoriteMovies, Username, Email, Birthday } = this.state;

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
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      ImagePath: PropTypes.string,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birthyear: PropTypes.string,
        Deathyear: PropTypes.string
      }),
    })
  ),
  onBackClick: PropTypes.func.isRequired
};
