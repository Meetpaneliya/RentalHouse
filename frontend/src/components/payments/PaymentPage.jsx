import { useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentFormStripe from "./PaymentFormStripe";
import PaymentFormRazorpay from "./PaymentFormRazorpay";
import PaymentFormPaypal from "./PaymentFormPaypal";
import {
  CreditCard,
  Wifi,
  Dog,
  Droplets,
  Home,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Star,
  Calendar,
} from "lucide-react";
import StripeProvider from "./StripeProvider";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const PaymentPage = () => {
  const orders = useSelector((state) => state.order.orders);
  const room = orders.length ? orders[orders.length - 1] : null;

  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    {
      id: "stripe",
      name: "Stripe",
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-stripe-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-6-pack-logos-icons-2945188.png?f=webp&w=256",
      colors: "from-[#6772E5] to-[#4B45EC]",
    },
    {
      id: "razorpay",
      name: "Razorpay",
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-razorpay-logo-icon-download-in-svg-png-gif-file-formats--payment-gateway-brand-logos-icons-1399875.png?f=webp&w=256",
      colors: "from-[#2D88FF] to-[#1F5EFF]",
    },
    {
      id: "paypal",
      name: "PayPal",
      logo: "https://cdn.iconscout.com/icon/free/png-512/free-paypal-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-5-pack-logos-icons-3030197.png?f=webp&w=256",
      colors: "from-[#003087] to-[#009cde]",
    },
  ];

  const amenityIcons = {
    wifi: <Wifi className="w-5 h-5" />,
    pets: <Dog className="w-5 h-5" />,
    geyser: <Droplets className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Room Details Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
              <div className="flex items-center space-x-2">
                <Home className="h-8 w-8 text-white" />
                <h1 className="text-2xl font-bold text-white">
                  Property Details
                </h1>
              </div>
            </div>

            <div className="p-8">
              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {room.images.map((image, index) => (
                  <img
                    key={image._id}
                    src={image.url}
                    alt={`Room view ${index + 1}`}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                ))}
              </div>

              {/* Title and Location */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {room.title}
                </h2>
                <div className="flex items-center mt-2 text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{room.location}</span>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Bed className="w-5 h-5" />
                  <span>{room.beds} Beds</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Bath className="w-5 h-5" />
                  <span>{room.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Maximize className="w-5 h-5" />
                  <span>{room.size} m²</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Star className="w-5 h-5" />
                  <span>{room.rating} Rating</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-3 gap-3">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg"
                    >
                      {amenityIcons[amenity]}
                      <span className="capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and Booking Details */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${room.price}
                  </span>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>Available Now</span>
                  </div>
                </div>
                <p className="text-gray-600">{room.description}</p>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
              <div className="flex items-center justify-center space-x-2">
                <CreditCard className="h-8 w-8 text-white" />
                <h1 className="text-2xl font-bold text-white">
                  Secure Checkout
                </h1>
              </div>
            </div>

            <div className="px-8 py-6">
              {/* Amount Display */}
              <div className="mb-8 bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Payment Amount
                </h2>
                <div className="text-3xl font-bold text-indigo-600">
                  ${room.price} USD
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Select Payment Method
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`relative w-full rounded-lg p-4 flex items-center justify-between transition-all duration-200 ${
                        selectedMethod === method.id
                          ? `bg-gradient-to-r ${method.colors} shadow-lg transform scale-[1.02]`
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 flex items-center justify-center rounded-full bg-white`}
                        >
                          <img
                            src={method.logo}
                            alt={`${method.name} logo`}
                            className="h-8 w-auto object-contain"
                          />
                        </div>
                        <span
                          className={`font-medium ${
                            selectedMethod === method.id
                              ? "text-white"
                              : "text-gray-900"
                          }`}
                        >
                          Pay with {method.name}
                        </span>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 ${
                          selectedMethod === method.id
                            ? "border-white bg-white"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedMethod === method.id && (
                          <div className="w-4 h-4 m-0.5 rounded-full bg-indigo-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Forms */}
              <div className="mt-8">
                {selectedMethod === "stripe" && (
                  <StripeProvider>
                    <PaymentFormStripe amount={room.price} room={room} />
                  </StripeProvider>
                )}
                {selectedMethod === "razorpay" && (
                  <PaymentFormRazorpay amount={room.price} room={room} />
                )}
                {selectedMethod === "paypal" && (
                  <PaymentFormPaypal amount={room.price} room={room} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
