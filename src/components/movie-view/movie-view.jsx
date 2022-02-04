import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";


export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

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