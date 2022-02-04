import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route } from "react-router-dom";


import { LoginView } from '../login-view/login.view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Link } from 'react-router-dom';
import { Navbar, Form, Button, Card, Col, Row, Container } from 'react-bootstrap';


export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
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


  getMovies(token) {
    axios.get('https://driveindb.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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


  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Navbar bg="secondary" expand="lg" className="mb-4" sticky="top">
          <Navbar.Brand className="ml-4">
            <Link style={{ color: "white" }} to={'/'}>

            </Link>
          </Navbar.Brand>
          {user && (
            <Navbar.Collapse className="justify-content-end">
              <Link to={`/users/${user}`} className="mr-2">
                <Button variant="light" style={{ color: "white" }}>Profile for {user}</Button>
              </Link>
              <Button onClick={() => this.onLoggedOut()} variant="light" style={{ color: "white" }}>Logout</Button>
            </Navbar.Collapse>
          )}
        </Navbar>
        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {

            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            )
            if (movies.length === 0) return <div className="main-view" />;

            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/login" render={() => {
            if (user) {
              return <Redirect to="/" />;
            }
            return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return (<Col>
              <RegistrationView onRegistration={() => this.onRegistration} />
            </Col>
            )
          }} />

          <Route path="/profile" render={({ history }) => {
            if (!user) {
              return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
            }

            return (
              <Col md={8}>
                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />

          <Route path="/users" render={({ history }) => {
            if (!user)
              return (
                <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>
              );
            if (movies.length === 0) return <div className="main-view" />;
            return (

              <Col>
                <ProfileView
                  user={this.state.user}
                  movies={movies}
                  onBackClick={() => history.goBack()} />
              </Col>
            )
          }} />


          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return (<Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            )
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return (<Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            )
            if (movies.length === 0) return <div className="main-view" />;
            return (<Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
            )
          }
          } />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return (<Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            )
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
        </Row>
      </Router>
    );
  }
}