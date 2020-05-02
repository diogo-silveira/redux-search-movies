
import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    searchMovie, 
    createMovieList, 
    createError,
    selectMoviesList,
    selectErrors,
    selectMovies,
    selectLoading
} from './moviesSlice';
import style from './Movies.module.css';
import Details from './Details';

function MovieItem(props) {
    
    const [modalShow, setModalShow] = React.useState(false);

    let { imdbID, Title, Poster } = props.movie;
    const divClassHighLight = `${style.highlight} border border-dark bg-white col-2 m-1 rounded`;    
    return(
        <Fragment>
            <div className={ divClassHighLight }  key={imdbID} onClick={() => setModalShow(true)}>
                <div className="container">
                    <div className="row">
                        <div className="align-items-center d-flex justify-content-center w-100 h-auto" style={{ height: "6rem" }}>
                            <span className="w-auto" >{ Title } </span>
                        </div>
                        <div className="row align-items-end" style={{ height: "18rem" }}>
                            <img className="w-100" alt={ Title } src={Poster} style={{ height: 279, width:188}} ></img>
                        </div>
                    </div>
                </div>
            </div>
            <Details show={modalShow} onHide={() => setModalShow(false)} />         
        </Fragment>
    );
}

export function Movies () {

    const [searchMovie, setSearchMovie] = useState('');
    const dispatch = useDispatch();
    const moviesList = useSelector(selectMoviesList);
    const loading = useSelector(selectLoading);

    const movieDetails = moviesList.map((movie) => 
        <MovieItem key={movie.imdbID} movie={movie}> </MovieItem>
    )

    const loadingData = () => {
            if(loading) {
                return (<span>Loading</span>)
            } else {
                return (
                    <div className="row justify-content-center">
                        { movieDetails }
                    </div>
                )
            }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-inline-flex justify-content-center pb-4">
                    <input className="form-control mr-3 w-25" type="text" value={ searchMovie } onChange={ e => setSearchMovie(e.target.value)} placeholder="Search a movie..."></input>
                    <button className="btn btn-primary px-5" onClick={() => dispatch(selectMovies(searchMovie))}>Search</button>
                </div>
            </div>
                <div className="row justify-content-center">
                    { loadingData() }
                </div>
                
        </div>
    )

}