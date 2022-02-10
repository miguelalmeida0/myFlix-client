import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";




export class MovieView extends React.Component {

  addFavoriteMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://driveindb.herokuapp.com/user/favorites/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST'
    })
      .then(response => {
        alert(`Movie was added to the Favorite List`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /* render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movieContainer">
        <Row>
          <Col>
            <div className="movies-view">
              <div className="movie-poster">
                <img src={movie.ImagePath} />
              </div>

              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title} </span>
              </div>

              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description} </span>
              </div>
              <div className="movie-genre">
                <span className="label">Genre: </span>
                <span className="value">{movie.Genre}</span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">{movie.Genre.Name}</Button>
                </Link>
              </div>

              <div className="movie-director">
                <span className="label">Director: </span>
                <Link to={`/directors/${movie.Director.Name}`} >
                  <Button variant="link">{movie.Director.Name}</Button>
                </Link>
              </div>

              <div className="button">
                <Button variant="outline-light" onClick={() => onBackClick(null)}>Back</Button>
              </div>

            </div>
          </Col>
        </Row>
      </Container >
    );
  }
} */


  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container fluid className="moviesContainer">
        <Row>
          <Col>
            <div className="movie-view">
              <div className="movie-poster">
                <img src={movie.ImagePath} />
              </div>
              <br></br>
              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>
              <br></br>
              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>
              <br></br>
              <div className="movie-genre">
                <span className="label">Genre: </span>
                <br></br>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="light">{movie.Genre.Name}</Button>
                </Link>
              </div>
              <br></br>
              <div className="movie-director">
                <span className="label">Director: </span>
                <br></br>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="light">{movie.Director.Name}</Button>
                </Link>
              </div>
              <br></br>
              <Button variant="outline-light" onClick={() => onBackClick(null)}>Back</Button>
              <br></br>  <br></br> <br></br>  <br></br>
            </div>

          </Col>

        </Row>
      </Container>

    );
  }
} 