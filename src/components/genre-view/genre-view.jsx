import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

// react-bootstap UI
import Button from 'react-bootstrap/Button';

export function GenreView(props) {
  const { director } = props;
  console.log(director);
  return (
    <div className="genre-view">
      <div className="genre-name">
        <span className="label">Name: </span>
        <span className="value">{genre.Name}</span>
      </div>


      <Link to={`/`}>
        <Button className='returnButton'>Return to the Movie List</Button>
      </Link>


    </div>
  )
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array
  }).isRequired,
  setUser: PropTypes.func.isRequired,
}

