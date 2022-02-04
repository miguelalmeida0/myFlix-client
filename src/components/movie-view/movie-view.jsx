import React from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from 'axios';
import FavoriteMovies from '../profile-view/favorite-movies'


export class MovieView extends React.Component {

  addFavoriteMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://https://driveindb.herokuapp.com/user/favorites/${username}/movies/${this.props.movie._id}`, {}, {
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

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <div className="movie-view">
              <div className="movie-poster">
                <img src={movie.ImagePath} />
              </div>

              <div className="font">
                <div className="movie-title">
                  <span className="label">Title: </span>
                  <span className="value">{movie.Title} </span>
                </div>

                <div className="movie-description">
                  <span className="label">Description: </span>
                  <span className="value">{movie.Description} </span>
                </div>
                <div className="movie-genre">
                  <span className="label">Genre: Thriller </span>
                  <span className="value">{movie.Genre}</span>
                  <Link to={`/genres/${movie.Genre.Name}`} className="value">{movie.Genre.Name}</Link>
                  <Button variant="link">{movie.Genre.Name}</Button>
                </div>

                <div className="movie-director">
                  <span className="label">Director: </span>
                  <span className="value">{movie.Director}</span>
                  <Link to={`/directors/${movie.Director.Name}`} className="value">{movie.Director.Name}</Link>
                  <Button variant="link">{movie.Director.Name}</Button>
                </div>

                <div className="button">
                  <Button variant="outline-light" onClick={() => onBackClick(null)}>Back</Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthyear: PropTypes.string,
    }),
    Featured: PropTypes.bool,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};