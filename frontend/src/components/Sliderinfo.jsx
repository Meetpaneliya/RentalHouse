import React from "react";
import Slider from "react-slick";
// @ts-ignore
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
    {
        text: "The company says that unlike some short-term corporate housing companies that significantly upcharge tenants for flexibility, its rental rates are more in line with the price range you’d expect to pay on a traditional lease.",
        source: "TechCrunch",
    },
    {
        text: "This platform simplifies finding rental apartments, making the process much more seamless and transparent for users.",
        source: "Forbes",
    },
    {
        text: "A game-changer in the rental market, offering flexible and affordable solutions for tenants.",
        source: "Bloomberg",
    },
];

const Sliderinfo = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            {/* Testimonial Slider (with border and rounded corners) */}
            <div className="relative bg-white-100 py-8 px-6 w-full flex justify-center">
                <div className="relative w-full max-w-3xl p-10 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div className="text-4xl font-semibold text-white bg-blue-800 rounded-full w-14 h-14 absolute -top-7 left-10 flex items-center justify-center">
                        ❝
                    </div>
                    <Slider {...sliderSettings}>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="text-center bg-white mt-2"
                            >
                                <p className="text-lg text-blue-800">{testimonial.text}</p>
                                <p className="font-bold text-gray-600 mt-2">— {testimonial.source}</p>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Search CTA Section (with rounded corners and card effect) */}
            <div
                className="relative -mb-40 bg-cover bg-center text-white py-10 px-6 w-full max-w-5xl mx-auto rounded-3xl shadow-lg overflow-hidden"
                style={{
                    backgroundImage: "url('/assets/girlroom.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '300px', // Reduced height
                    maxHeight: '300px' // Added max-height constraint
                }}
            >

                <div className="z-10 flex justify-between items-center max-w-5xl mx-auto">
                    <div className="gap-3 p-5 w-2/6  bg-white/70 rounded-3xl">
                        <h2 className="text-4xl font-bold text-blue-800 text-center">Start your search today</h2>
                        <p className="mt-3 text-sm text-blue-800">
                            Get ready for the easiest rental experience of your life. Browse homes, take a tour,
                            submit an application, and get your key in a few clicks!
                        </p>
                    </div>


                    <div className="flex flex-col space-y-10">
                        <button className="">
                            <a href="/search" className="bg-blue-500/50 hover:bg-blue-600 text-white px-10 py-3 rounded-full">Search Apartments</a>
                        </button>

                        <button>
                            <a href="/signup" className="bg-blue-500/50 hover:bg-blue-600 text-white px-10 py-3 rounded-full">Speak to a Human</a>
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Sliderinfo;
