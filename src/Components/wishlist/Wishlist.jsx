// import React from "react";
// import { useSelector } from "react-redux";
// import Cards from "../card/card";

// const Wishlist = () => {
//   const wishlist = useSelector((state) => state.favorites.wishlist);

//   return (
//     <div className="w-full min-h-screen bg-gray-900 text-white px-6 py-10">
//       <h2 className="text-3xl font-bold mb-6">Your Wishlist</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {wishlist.length > 0 ? (
//           wishlist.map((movie) => <Cards key={movie.imdbID} movie={movie} />)
//         ) : (
//           <p className="col-span-4 text-center text-lg">No wishlist items added.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Wishlist;



import React from "react";
import { useSelector } from "react-redux";
import Cards from "../card/card";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.favorites.wishlist); // ✅ Fetch wishlist from Redux

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {wishlist.length > 0 ? (
          wishlist.map((movie) => <Cards key={movie.id} movie={movie} />)
        ) : (
          <p className="col-span-4 text-center text-lg text-gray-400">No wishlist items added.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
