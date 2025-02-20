import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getData();
        window.scrollTo(0, 0);
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=7b853542`);
            const data = await response.json();
            if (data.Response === "True") {
                setMovie(data);
            } else {
                setMovie(null);
            }
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    return (
        <div className="movie">
            {currentMovieDetail ? (
                <>
                    <div className="movie__intro">
                        <img 
                            className="movie__backdrop" 
                            src={currentMovieDetail.Poster !== "N/A" ? currentMovieDetail.Poster : "https://via.placeholder.com/600"}
                            alt={currentMovieDetail.Title}
                        />
                    </div>
                    <div className="movie__detail">
                        <div className="movie__detailLeft">
                            <div className="movie__posterBox">
                                <img 
                                    className="movie__poster" 
                                    src={currentMovieDetail.Poster !== "N/A" ? currentMovieDetail.Poster : "https://via.placeholder.com/300"} 
                                    alt={currentMovieDetail.Title}
                                />
                            </div>
                        </div>
                        <div className="movie__detailRight">
                            <div className="movie__detailRightTop">
                                <div className="movie__name">{currentMovieDetail.Title}</div>
                                <div className="movie__tagline">{currentMovieDetail.Genre}</div>
                                <div className="movie__rating">
                                    {currentMovieDetail.imdbRating} ⭐
                                    <span className="movie__voteCount">({currentMovieDetail.imdbVotes} votes)</span>
                                </div>  
                                <div className="movie__runtime">{currentMovieDetail.Runtime}</div>
                                <div className="movie__releaseDate">Release date: {currentMovieDetail.Released}</div>
                                <div className="movie__genres">
                                    {currentMovieDetail.Genre.split(", ").map((genre, index) => (
                                        <span key={index} className="movie__genre">{genre}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="movie__detailRightBottom">
                                <div className="synopsisText">Synopsis</div>
                                <div>{currentMovieDetail.Plot}</div>
                            </div>
                        </div>
                    </div>
                    <div className="movie__links">
                        <div className="movie__heading">Useful Links</div>
                        {currentMovieDetail.Website && (
                            <a href={currentMovieDetail.Website} target="_blank" rel="noopener noreferrer">
                                <p><span className="movie__homeButton movie__Button">Website</span></p>
                            </a>
                        )}
                        <a href={`https://www.imdb.com/title/${currentMovieDetail.imdbID}`} target="_blank" rel="noopener noreferrer">
                            <p><span className="movie__imdbButton movie__Button">IMDb</span></p>
                        </a>
                    </div>
                </>
            ) : (
                <h2 className="text-white">Movie details not found.</h2>
            )}
        </div>
    );
};

export default Movie;
