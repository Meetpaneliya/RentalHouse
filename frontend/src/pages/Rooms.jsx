import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar2";
import { FaWifi, FaTv, FaSnowflake, FaShower, FaStar } from "react-icons/fa";
import Footer from "../components/Footer";
import { Dialog } from "@headlessui/react";
import { FaShareSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Rooms = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/KYC'); // Navigate to /KYC
};

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        console.log("Fetching room details for ID:", id);
        const response = await axios.get(
          `http://localhost:4000/api/v1/listings/${id}`,
          { headers: { "Cache-Control": "no-cache" } }
        );

        console.log("API Response:", response.data);
        if (!response.data.success) throw new Error("Listing not found");

        setRoom(response.data.data.listing);
        setReviews(response.data.data.reviews);
      } catch (err) {
        console.error("Error fetching room details:", err);
        setError("Failed to load room details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/reviews/${id}`);
      setReviews(response.data.reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const submitReview = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/reviews/",
        { listingId: id, rating, comment },
        { withCredentials: true }
      );

      console.log("Review Added:", response.data);

      setSuccessMessage("Review submitted successfully!");
      setIsModalOpen(false);

      fetchReviews();
    } catch (err) {
      console.error("Error adding review:", err);
      setError("Failed to submit review.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "Hey, take a look at this amazing content!",
          url: window.location.href, // Current page URL
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!room) return <p className="text-center text-gray-600">No room details available.</p>;

    return (
      <div className="">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-800">{room.title} - #{room._id}</h1>
            <FaShareSquare onClick={handleShare} className="text-2xl" />
          </div>

          {/* Image & Thumbnails */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="col-span-1 sm:col-span-3">
              <img
                className="w-full h-64 sm:h-96 object-cover rounded-xl shadow-md"
                src={room.images[0]?.url}
                alt={room.title}
              />
            </div>
            <div className="col-span-1 sm:col-span-2 grid grid-cols-2 gap-2">
              {room.images?.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  className="w-full h-32 sm:h-36 object-cover rounded-lg hover:scale-105 transition"
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Overview & Booking Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            {/* Overview Section */}
            <div className="col-span-1 sm:col-span-2">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="text-gray-600">📏 {room.size} ft² | 🏢 {room.floor} Floor | 🛏 {room.beds} Beds | 🛁 {room.bathrooms} Bath</p>
              <p className="text-green-600 font-medium mt-1">📅 Available from {room.availableDate || "N/A"}</p>
              <p className="text-gray-700 mt-2 leading-relaxed">{room.description}</p>

              {/* Amenities */}
              <div className="mt-6 border-t pt-4">
                <h2 className="text-xl font-semibold">This place offers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                  {room.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                      <span className="text-blue-600">{amenity === "wifi" ? <FaWifi /> : amenity === "tv" ? <FaTv /> : amenity === "ac" ? <FaSnowflake /> : amenity === "geyser" ? <FaShower /> : null}</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-6 border-t pt-4">
                <h2 className="text-xl font-semibold">Reviews</h2>
                {reviews.length > 0 ? (
                  <div className="mt-3 space-y-4">
                    {reviews.map((review) => (
                      <div key={review._id} className="p-4 bg-gray-100 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{review.user?.name || "Anonymous"}</span>
                          <div className="flex text-yellow-500">
                            {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                          </div>
                        </div>
                        <p className="text-gray-700 mt-1">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mt-2">No reviews yet.</p>
                )}
              </div>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => setIsModalOpen(true)}>Add Your Review</button>
            </div>

            {/* Booking Section */}
            <div className="col-span-1 p-6 bg-white shadow-md rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold">Select bedroom and dates</h3>
              <div className="flex flex-col gap-3 mt-3">
                <input type="date" className="w-full p-2 border rounded-md" />
                <input type="date" className="w-full p-2 border rounded-md" />
              </div>
              <div className="mt-3 text-gray-700">
                <p>💲 {room.price} x nights</p>
                <p>🔖 Discount: -${Math.floor(room.price * 0.1)}</p>
                <p>🎉 Service Fee: ${Math.floor(room.price * 0.05)}</p>
              </div>
              <div className="mt-2 text-lg font-bold text-blue-800">
                Total: ${room.price - Math.floor(room.price * 0.1) + Math.floor(room.price * 0.05)}
              </div>
              <button onClick={handleNavigate} className="mt-4 w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Reserve</button>
              <p className="text-gray-500 text-sm text-center mt-2">You won't get charged yet</p>
            </div>
          </div>

          {/* Review Modal */}
          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full sm:w-96">
              <h2 className="text-xl font-semibold">Add Your Review</h2>
              <div className="mt-3">
                <label className="block text-gray-700">Rating:</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num} Star</option>
                  ))}
                </select>
              </div>
              <div className="mt-3">
                <label className="block text-gray-700">Comment:</label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button className="px-4 py-2 bg-gray-400 text-white rounded-lg" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={submitReview}>Submit</button>
              </div>
            </div>
          </Dialog>
        </div>

        {/* Search CTA Section */}
        <div
          className="relative -mb-40 bg-cover bg-center text-white py-10 px-4 sm:px-6 w-full max-w-5xl mx-auto rounded-3xl shadow-lg overflow-hidden"
          style={{
            backgroundImage: "url('/assets/girlroom.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '300px',
            maxHeight: '300px'
          }}
        >
          <div className="z-10 flex flex-col sm:flex-row justify-between items-center max-w-5xl mx-auto">
            <div className="gap-3 p-5 w-full sm:w-2/6 bg-white/70 rounded-3xl">
              <h2 className="text-2xl sm:text-4xl font-bold text-blue-800 text-center">Start your search today</h2>
              <p className="mt-3 text-sm text-blue-800">
                Get ready for the easiest rental experience of your life. Browse homes, take a tour,
                submit an application, and get your key in a few clicks!
              </p>
            </div>

            <div className="flex flex-col space-y-4 sm:space-y-10 mt-4 sm:mt-0">
              <button className="">
                <a href="/search" className="bg-blue-500/50 hover:bg-blue-600 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full">Search Apartments</a>
              </button>

              <button>
                <a href="/signup" className="bg-blue-500/50 hover:bg-blue-600 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full">Speak to a Human</a>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div>
          <Footer />
        </div>

      </div>
    );
  };

  export default Rooms;