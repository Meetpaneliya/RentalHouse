import { useState } from "react";
import axios from "axios";

const ListingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    size: "",
    floor: "",
    location: "",
    propertyType: "",
    amenities: "",
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    lat: "",
    lng: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Convert number inputs properly
    const finalValue = type === "number" ? parseFloat(value) || "" : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleImageChange = (e) => {
    const fileArray = Array.from(e.target.files);
    const imagePreviews = fileArray.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setImages(imagePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      images.forEach((image) => {
        submitData.append("images", image.file);
      });

      const response = await axios.post(
        "http://localhost:4000/api/v1/listings/create",
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log("Listing created:", response.data);
      alert("Listing created successfully!");
    } catch (error) {
      console.error("Error creating listing:", error.response?.data || error.message);
      alert("Failed to create listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat px-4 py-10"
      style={{ backgroundImage: "url('/assets/room1.jpg')" }} // Replace with your actual image path
    >
      <div className="w-full max-w-4xl bg shadow-2xl rounded-3xl p-10 backdrop-blur-md bg-opacity-80 transition-all duration-300">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-6">
          Add Your Rooms 🏠
        </h2>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        {/* Form Start */}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            className="w-full p-4 rounded-full bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Enter Description"
            rows="4"
            className="w-full p-4 rounded-xl bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={handleChange}
            required
          ></textarea>

          {/* Price & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="number"
              name="price"
              placeholder="Price ($)"
              className="w-full p-4 rounded-full bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="w-full p-4 rounded-full bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* Size & Floor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="number"
              name="size"
              placeholder="Size (sq ft)"
              className="w-full p-4 rounded-full bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="floor"
              placeholder="Floor"
              className="w-full p-4 rounded-full bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              required
            />
          </div>

          {/* Property Type & Amenities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <select
              name="propertyType"
              className="w-full p-4 rounded-full bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500 appearance-none text-gray-400"
              onChange={handleChange}
              value={formData.propertyType || ""}
              required
            >
              <option value="" disabled className="text-gray-600">Select Property Type</option>
              <option value="apartment" className="text-gray-800">apartment</option>
              <option value="hotel" className="text-gray-800">hotel</option>
            </select>

            <input
              type="text"
              name="amenities"
              placeholder="Amenities (comma separated)"
              className="w-full p-4 rounded-full bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>

          {/* Rooms, Beds, Bathrooms */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <input
              type="number"
              name="rooms"
              placeholder="Rooms"
              className="w-full p-4 rounded-full bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="beds"
              placeholder="Beds"
              className="w-full p-4 rounded-full bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              className="w-full p-4 rounded-full bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              required
            />
          </div>

          {/*  */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <input
              type="number"
              name="lat"
              placeholder="Latitude"
              step="any"  // Allows floating numbers
              className="w-full p-4 rounded-full bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="lng"
              placeholder="Longitude"
              step="any"  // Allows floating numbers
              className="w-full p-4 rounded-full bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              required
            />

            <select
              name="availability"
              className="w-full p-4 rounded-full bg-gray-100 focus:bg-white shadow-md focus:shadow-lg transition-all outline-none focus:ring-2 focus:ring-indigo-500 appearance-none text-gray-400"
              onChange={handleChange}
              required
            >
              <option value="" disabled selected className="text-gray-600">Availibility</option>
              <option value="Available" className="text-gray-800">Available</option>
              <option value="Unavailable" className="text-gray-800">Unavailable</option>
            </select>

          </div>


          {/* Image Upload */}
          <div className="p-6 bg-indigo-50 rounded-xl shadow-md">
            <label className="block text-indigo-800 font-semibold mb-2">
              Upload Images 📸
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full p-3 bg-white rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
              onChange={handleImageChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-4 bg-indigo-800 text-white rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Listing"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ListingForm;
