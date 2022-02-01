import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login.view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { Container, Row, Col, Button } from 'react-bootstrap'


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }



  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // This will update the 'user' property in state to that user when successfully login in
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    })


    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }


  /* User registers */
  onRegistration(registration) {
    this.setState({
      registration,
    });
  }

  getMovies(token) {
    axios.get('https://driveindb.herokuapp.com/login', {
      headers: { Authorization: `Bearer${token}` }
    })
      .then(response => {
        // This will assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) {
      return (
        <Row>
          <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
          </Col>
        </Row>
      )
    }

    // User Registration

    if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)} />);

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}


class Button extends React.Component {

  render() {

    return <button>{this.props.label}</button>,
      <button onClick={() => { this.onLoggedOut() }}>Logout</button>

  }
}

