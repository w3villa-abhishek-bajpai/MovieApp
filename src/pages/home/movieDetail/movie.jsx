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
        <div className="w-screen h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center py-10 px-5">
            {currentMovieDetail ? (
                <>
                    {/* Blurred Background Image */}
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center blur-lg brightness-50"
                        style={{
                            backgroundImage: `url(${currentMovieDetail.Poster !== "N/A" ? currentMovieDetail.Poster : "https://via.placeholder.com/600"})`,
                        }}
                    ></div>

                    {/* Movie Content */}
                    <div className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
                        {/* Movie Poster */}
                        <img
                            className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] rounded-lg shadow-xl transform hover:scale-105 transition"
                            src={currentMovieDetail.Poster !== "N/A" ? currentMovieDetail.Poster : "https://via.placeholder.com/400"}
                            alt={currentMovieDetail.Title}
                        />

                        {/* Movie Details */}
                        <div className="w-full mt-6 flex flex-col items-center text-center lg:text-left">
                            <h2 className="text-4xl font-bold">{currentMovieDetail.Title}</h2>
                            <p className="text-lg text-gray-300">{currentMovieDetail.Genre}</p>
                            
                            <div className="flex justify-center gap-3 text-lg mt-2">
                                <span className="font-semibold">⭐ {currentMovieDetail.imdbRating}</span>
                                <span className="text-gray-400">({currentMovieDetail.imdbVotes} votes)</span>
                            </div>

                            <p className="text-gray-400 mt-1">🕒 {currentMovieDetail.Runtime}</p>
                            <p className="text-gray-400">📅 Release Date: {currentMovieDetail.Released}</p>

                            {/* Genre Badges */}
                            <div className="flex flex-wrap gap-2 justify-center mt-3">
                                {currentMovieDetail.Genre.split(", ").map((genre, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-800 text-sm rounded-full shadow-md">
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            {/* Synopsis */}
                            <div className="w-full text-center lg:text-left mt-6">
                                <h3 className="text-xl font-bold">Synopsis</h3>
                                <p className="text-gray-300 text-sm sm:text-base">{currentMovieDetail.Plot}</p>
                            </div>

                            {/* Useful Links */}
                            <div className="flex justify-center gap-4 mt-6">
                                {currentMovieDetail.Website && (
                                    <a
                                        href={currentMovieDetail.Website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
                                    >
                                        Website 🌐
                                    </a>
                                )}
                                <a
                                    href={`https://www.imdb.com/title/${currentMovieDetail.imdbID}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition"
                                >
                                    IMDb 🎬
                                </a>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <h2 className="text-center text-2xl mt-20">Movie details not found.</h2>
            )}
        </div>
    );
};

export default Movie;
