import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

// react-bootstap UI
import Button from 'react-bootstrap/Button';

export function GenreView(props) {
  const { genre } = props
  console.log(genre, 'genre')
  return (
    <>
      <Row className="genre-view">
        <Col>
          <div className="genre-name">
            <span className="label">Name: </span>
            <span className="value">{genre.Name}</span>
          </div>
          <div className="genre-description">
            <span className="label">Description: </span>
            <span className="value">{genre.Description}</span>
          </div>
          <Link to={`/`}>
            <br></br>
            <Button className='returnButton' variant='dark'>Return</Button>
          </Link>
        </Col>
      </Row>

    </>
  )

}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};

