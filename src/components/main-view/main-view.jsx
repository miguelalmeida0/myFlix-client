import React from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Soul', Description: 'Joe is a middle-school band teacher whose life hasn\'t quite gone the way he expected. His true passion is jazz and he\'s good. But when he travels to another realm to help someone find their passion, he soon discovers what it means to have soul.', ImagePath: 'https://lumiere-a.akamaihd.net/v1/images/hb_soul_header_mobile_18983_7bfc5464.jpeg?region=0,0,640,560', Genre: 'Animation', Director: 'Pete Docter' },
        { _id: 2, Title: 'Don\'t look up', Description: 'Two low-level astronomers must go on a giant media tour to warn mankind of an approaching comet that will destroy planet Earth.', ImagePath: 'https://lh3.googleusercontent.com/-nXzyRAt-WXA/Yccsv1DXx6I/AAAAAAAAgA0/MA25GSrmkEo8Zn0DLg9XVNKERCrbB-ABACNcBGAsYHQ/s1600/1640443071740243-0.png', Genre: 'Comedy', Director: 'Adam McKay' },
        { _id: 3, Title: 'Harry Potter and the Sorcerer\'s Stone', Description: 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.', ImagePath: 'https://images-na.ssl-images-amazon.com/images/I/51rV-Hh+mKL.jpg', Genre: 'Fantasy', Director: 'Chris Columbus' }
      ],
      selectedMovie: null
    };
  }



  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }

}