import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);
  const { id } = useParams();

  useEffect(() => {
    getData();
    loadReviews();
    window.scrollTo(0, 0);
  }, []);

  // ✅ Fetch movie details from TMDb API
  const getData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e00941df3fc0eaa106c5464b43b3f69d&language=en-US`
      );
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  // ✅ Load reviews from localStorage
  const loadReviews = () => {
    const storedReviews = JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
    setReviews(storedReviews);
  };

  // ✅ Submit a new review
  const submitReview = () => {
    if (!reviewerName || !reviewText) {
      alert("Please enter your name and a review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: reviewerName,
      text: reviewText,
      rating: rating,
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));

    // Reset form & close modal
    setReviewerName("");
    setReviewText("");
    setRating(5);
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center py-10 px-4">
      {currentMovieDetail ? (
        <>
          {/* Full-Size Background Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center brightness-75"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${currentMovieDetail.backdrop_path})`,
            }}
          ></div>

          {/* Movie Content */}
          <div className="relative z-10 w-full max-w-4xl bg-gray-900 p-6 rounded-xl shadow-lg text-center">
            <img
              className="w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] rounded-lg shadow-xl object-cover"
              src={currentMovieDetail.poster_path 
                ? `https://image.tmdb.org/t/p/w500/${currentMovieDetail.poster_path}`
                : "https://via.placeholder.com/400"}
              alt={currentMovieDetail.title}
            />
            <h2 className="text-4xl font-bold mt-4">{currentMovieDetail.title}</h2>
            <p className="text-lg text-gray-300">{currentMovieDetail.genres?.map(g => g.name).join(", ")}</p>
            <p className="text-gray-400 mt-2">🕒 {currentMovieDetail.runtime} min</p>
            <p className="text-gray-400">📅 Release Date: {currentMovieDetail.release_date}</p>

            {/* Synopsis */}
            <div className="w-full text-center mt-6">
              <h3 className="text-xl font-bold">Synopsis</h3>
              <p className="text-gray-300">{currentMovieDetail.overview}</p>
            </div>

            {/* ⭐ Write a Review Button */}
            <button 
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={() => setIsModalOpen(true)}
            >
              Write a Review
            </button>
          </div>

          {/* ⭐ Reviews Section */}
          <div className="relative z-10 w-full max-w-4xl bg-gray-900 p-6 rounded-xl shadow-lg mt-8">
            <h3 className="text-2xl font-bold mb-4">User Reviews</h3>

            {/* Display Reviews */}
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="p-4 mb-4 bg-gray-800 rounded-lg">
                  <p className="text-lg font-bold">{review.name} - ⭐ {review.rating}/10</p>
                  <p className="text-gray-300">{review.text}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </>
      ) : (
        <h2 className="text-center text-2xl mt-20">Movie details not found.</h2>
      )}

      {/* ✅ Review Modal with Background Blur */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md transition-all transform scale-100">
            <h2 className="text-2xl font-bold mb-4 text-black">Write a Review</h2>
            
            {/* Review Form */}
            <input
              type="text"
              placeholder="Your Name"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              className="w-full p-2 rounded bg-gray-200 border border-gray-400 mb-3 text-black"
            />
            <textarea
              placeholder="Write a review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-2 rounded bg-gray-200 border border-gray-400 mb-3 text-black"
            />
            <input
              type="number"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 rounded bg-gray-200 border border-gray-400 mb-3 text-black"
              placeholder="Rating (1-10)"
            />

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
