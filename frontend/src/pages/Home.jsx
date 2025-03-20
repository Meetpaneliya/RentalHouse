import Navbar from "../components/Navbar";
import React, { useState } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import Searchbar from "../components/Searchbar";
import CitySearch from "../components/citysearch";
import FeaturesSection from "../components/Features";
import Footer from "../components/Footer";
import Sliderinfo from "../components/Sliderinfo";
import LoginPage from "../components/auth/LoginForm";
import SignupPage from "../components/auth/RegisterForm";

export const Home = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    
    return (
        <div className="w-full h-screen overflow-y-auto">
            {/* Hero Section */}
            <div
                className="relative w-full h-screen bg-cover"
                style={{
                    backgroundImage: `url('/assets/room2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Navbar - positioned at top */}
                <div className="absolute top-0 left-0 right-0 z-20">
                    <Navbar 
                        setShowLoginModal={setShowLoginModal}
                        setShowSignupModal={setShowSignupModal}
                    />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gray-900 opacity-30"></div>

                {/* Content */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center space-y-6 px-4">
                    <div className="text-slate-200 text-center bg-gray-800/30 rounded-3xl p-5 sm:p-10 w-full max-w-lg">
                        <h2 className="text-2xl sm:text-4xl font-bold">Ready, Set, Rent.</h2>
                        <p className="mt-2 sm:mt-4 text-base sm:text-lg">
                            Furnished and unfurnished apartments <br />
                            and rooms on flexible lease terms.
                        </p>
                    </div>

                    {/* Searchbar */}
                    <Searchbar />
                </div>
            </div>

            {/* Section-2 */}
            <div className="flex flex-col justify-center w-11/12 lg:w-10/12 m-auto mt-7">
                <div className="flex items-center justify-center text-blue-950 font-semibold text-xl sm:text-2xl w-full h-24 sm:h-32 gap-3">
                    <h1> New York City Rooms for Rent </h1>
                    <FaArrowRightLong />
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {[
        { img: "/assets/room1.jpg", title: "Cozy Room in Manhattan", desc: "A beautiful room in the heart of the city." },
        { img: "/assets/room2.jpg", title: "Spacious Apartment in Brooklyn", desc: "A spacious apartment with modern amenities." },
        { img: "/assets/room3.jpg", title: "Charming Studio in Queens", desc: "A charming studio with a great view." }
    ].map((room, index) => (
        <div key={index} className="border rounded-3xl p-4 bg-white shadow-md transform hover:scale-105 transition-transform">
            <img src={room.img} alt={room.title} className="w-full h-48 object-cover rounded-t-3xl" />
            <div className="mt-4">
                <h3 className="text-xl font-semibold">{room.title}</h3>
                <p className="mt-2 text-gray-600">{room.desc}</p>
            </div>
        </div>
    ))}
</div>

            </div>

            {/* Section-3 */}
            <div className="flex flex-col lg:flex-row justify-between w-11/12 lg:w-10/12 m-auto border rounded-xl bg-blue-950 text-slate-200 p-6 lg:p-8 mt-10">
                <div className="w-full lg:w-1/2 space-y-3 text-center lg:text-left">
                    <h1 className="text-xl sm:text-2xl">Get Pre-Approved and Book Instantly</h1>
                    <h4 className="text-base sm:text-lg">Skip the line and get approved to instantly book a home with June.</h4>
                </div>

                <div className="w-full lg:w-1/2 space-y-5 mt-3 items-center flex flex-col">
                    <button className="bg-slate-200 text-black rounded-3xl w-3/4 p-2"> Get pre-approved now </button>
                    <p className="text-sm text-center">June Homes uses iDenfy and Plaid to provide a streamlined, quick, and secure way to verify your identity and income to calculate a range of homes you can instantly book.</p>
                </div>
            </div>

            {/* Section-4 */}
            <div className="w-11/12 lg:w-10/12 m-auto mt-14 mb-14">
    <h1 className="text-2xl sm:text-3xl font-semibold text-center text-blue-950 mb-10">
        Here's why renters are choosing June
    </h1>

    {/* Grid Layout for Responsiveness */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[
            { title: "Flexible Lease Terms", desc: "Check housing off your to-do list, and find your footing in a new place ASAP." },
            { title: "We're Flexible", desc: "Rent from 1-18 months and easily extend your lease as you go." },
            { title: "We're Customizable", desc: "Rent furnished or unfurnished, you can enjoy our furniture and decor or bring your own." },
            { title: "We're Fair", desc: "Pay fair market rates from Hell's Kitchen to Hollywood." }
        ].map((feature, index) => (
            <div key={index} className="bg-slate-200 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
                <h1 className="text-lg sm:text-xl font-semibold mb-3 text-blue-950">{feature.title}</h1>
                <p className="text-gray-700">{feature.desc}</p>
            </div>
        ))}
    </div>
</div>


            {/* Modal Overlays */}
            {(showLoginModal || showSignupModal) && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => {
                        setShowLoginModal(false);
                        setShowSignupModal(false);
                    }}
                />
            )}
            
            {/* Login & Signup Modals */}
            {[{ state: showLoginModal, component: LoginPage, setState: setShowLoginModal },
              { state: showSignupModal, component: SignupPage, setState: setShowSignupModal }]
              .map(({ state, component: Component, setState }, index) => (
                state && (
                    <div key={index} className="fixed inset-0 flex items-center justify-center z-50">
                        <div onClick={e => e.stopPropagation()}>
                            <Component onClose={() => setState(false)} />
                        </div>
                    </div>
                )
            ))}

            {/* Sections */}
            <CitySearch />
            <FeaturesSection />
            <Sliderinfo />
            <Footer />
        </div>
    );
};
