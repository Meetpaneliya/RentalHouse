import { useState } from "react";
import axios from "axios";

const ListingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    propertyType: "",
    amenities: "",
    rooms: 1,
    beds: 1,
    bathrooms: 1,
    lat: "",
    lng: "",
  });

  const [images, setImages] = useState([]); // ✅ Ensures images array exists
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const fileArray = Array.from(e.target.files);
    const imagePreviews = fileArray.map((file) => ({
      url: URL.createObjectURL(file), // ✅ Creates preview URL
      file, // ✅ Stores actual file for upload
    }));
    setImages(imagePreviews);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      // Append images
      images.forEach((image) => {
        submitData.append("images", image.file); // ✅ Upload actual file
      });

      const response = await axios.post(
        "http://localhost:4000/api/v1/listings/create", // Backend API
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, // If using cookies for auth
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
        Add Your Rooms
      </h2>

      {message && <p className="text-center text-red-500 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-900 focus:border-blue-900"
          onChange={handleChange}
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-900 focus:border-blue-900 "
          onChange={handleChange}
          required
        ></textarea>

        {/* Price & Location */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-900 focus:border-blue-900 "
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-900 focus:border-blue-900 "
            onChange={handleChange}
            required
          />
        </div>

        {/* Property Type & Amenities */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="propertyType"
            placeholder="Property Type"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-900 focus:border-blue-900"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="amenities"
            placeholder="Amenities (comma separated)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-900 focus:border-blue-900 "
            onChange={handleChange}
          />
        </div>

        {/* Rooms, Beds, Bathrooms */}
        <div className="grid grid-cols-3 gap-4">
          <input
            type="number"
            name="rooms"
            placeholder="Rooms"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-900 focus:border-blue-900 "
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="beds"
            placeholder="Beds"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-900 focus:border-blue-900"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-900 focus:border-blue-900"
            onChange={handleChange}
            required
          />
        </div>

        {/* Latitude & Longitude */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="lat"
            placeholder="Latitude"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-900 focus:border-blue-900"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lng"
            placeholder="Longitude"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-900 focus:border-blue-900"
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="border p-4 rounded-lg">
          <label className="block mb-2 text-gray-700">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-900 focus:border-blue-900 cursor-pointer bg-gray-50"
            onChange={handleImageChange}
            required
          />
        </div>

        {/* Image Preview */}
        <div className="flex flex-wrap gap-2">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url || "https://via.placeholder.com/150"}
              alt={`Preview ${index}`}
              className="w-24 h-24 object-cover rounded-md"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Listing"}
        </button>
      </form>
    </div>
  );
};

export { ListingForm };
