import React, { useState } from 'react';
import { FaStar, FaRegStar, FaUserCircle } from 'react-icons/fa';


const Ratings = ({ listing }) => {
    const [expandedReviews, setExpandedReviews] = useState({});

    // Add this function after the reviews array
    const truncateText = (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + '...';
    };

    const toggleExpand = (index) => {
        setExpandedReviews(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const reviews = listing?.reviews || [
        {
            title: 'Great Place!',
            content: 'I had a wonderful stay. The house was clean and well-maintained. The host was very friendly and helpful.',
            rating: 5,
            username: 'John Doe',
        },
        {
            title: 'Good Experience',
            content: 'The location was perfect and the amenities were great. The host was very accommodating and made sure we had everything we needed.',
            rating: 4,
            username: 'Lorem ipsum',
        },
        {
            title: 'Average Stay',
            content: 'The house was okay, but there were some issues with the plumbing. The host was responsive and fixed the issue quickly.',
            rating: 3,
            username: 'Alice Doe',
        },
    ];

    const renderStars = (rating) => {
        return (
            <div className="flex gap-2 text-center justify-center">
                {[...Array(5)].map((_, index) => (
                    <span key={index}>
                        {index < rating ? (
                            <FaStar className="text-yellow-400 text-3xl" />
                        ) : (
                            <FaRegStar className="text-gray-300 text-3xl" />
                        )}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 mb-10">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] 
                        hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] transition-shadow 
                        duration-300 border border-gray-100 relative"
                    >
                        <div className="p-6">
                            <div className="flex flex-col gap-3 text-center">
                                {renderStars(review.rating)}
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {review.title}
                                </h3>
                                <div className="h-px bg-gray-200 w-full"></div>
                                <div className="text-gray-600 leading-relaxed">
                                    {expandedReviews[index] 
                                        ? review.content 
                                        : truncateText(review.content)}
                                    {review.content.length > 100 && (
                                        <button
                                            onClick={() => toggleExpand(index)}
                                            className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            {expandedReviews[index] ? 'Show less' : 'Show more'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
    
                        {/* User Avatar - Positioned to overlap sections */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-16">
                            <div className="w-16 h-16 bg-white rounded-full p-1">
                                <FaUserCircle className="w-full h-full text-gray-700" />
                            </div>
                        </div>
    
                        {/* User Section */}
                        <div className="bg-gray-900 w-full py-6 mt-4 flex flex-col items-center rounded-b-xl">
                            <p className="text-white mt-4 font-medium">{review.username}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ratings;