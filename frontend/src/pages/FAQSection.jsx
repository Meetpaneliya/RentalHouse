import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Navbar from "../components/Navbar2";
import Footer from "../components/Footer";

const faqs = [
  {
    question: "Why should I rent with June Homes?",
    answer: `Ready, set, rent! June Homes is the simplest, fastest way to rent a home.

    Here’s why renters are choosing June Homes:
    • **Flexible leases:** Enjoy lease terms that range from 1 to 18 months, allowing you to extend your lease at any time without hassle.
    • **Furnished or unfurnished spaces:** You get the choice of renting a fully furnished home or bringing your own furniture.
    • **Shared or entire homes:** Choose between co-living with roommates or renting the entire space for yourself.
    • **Quick move-in:** No long waits! Browse, apply, and move in within a matter of hours.
    • **24/7 support & services:** Our Resident Portal provides seamless maintenance requests, support, and communication.`
  },
  {
    question: "How do I Become a June Home resident?",
    answer: `Becoming a June Home resident is easy and convenient! Here's how it works:
    1. **Browse Listings:** Explore our available homes in your preferred city.
    2. **Apply Online:** Fill out our secure application form and upload necessary documents.
    3. **Verification & Approval:** Our team will review your application and verify details.
    4. **Sign Your Lease:** Once approved, sign the lease agreement digitally.
    5. **Move-In Ready:** Get your keys and move in hassle-free!`
  },
  {
    question: "What cities is June Homes available in?",
    answer: `June Homes is expanding rapidly! We currently provide rental solutions in several major cities including:
    - **New York City**
    - **San Francisco**
    - **Los Angeles**
    - **Boston**
    - **Chicago**
    - **Washington, D.C.**
    
    And many more! Check our website for the latest city updates.`
  },
  {
    question: "Does June Home offer co-living?",
    answer: `Yes, absolutely! Co-living is one of our most popular options. Here's why people love it:
    - **Affordability:** Rent a shared space at a lower price instead of paying full rent for an entire unit.
    - **Fully Furnished:** Co-living spaces come with all the necessary furniture and utilities included.
    - **Community Experience:** Live with like-minded individuals and enjoy a social living environment.
    - **Flexible Leasing:** Whether you need a short-term or long-term stay, we have flexible options for you!`
  },
  {
    question: "Is June Homes a hotel?",
    answer: `No, June Homes is **not a hotel**. We provide **long-term and short-term rentals** that offer a home-like experience. 
    Unlike hotels:
    - Our properties are **fully equipped apartments** designed for comfortable everyday living.
    - You can **rent for months instead of nights**, making it ideal for professionals, students, and travelers.
    - We provide **co-living options** and private residences with a seamless rental experience.
    
    Think of us as the **modern solution for hassle-free renting!**`
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
        <Navbar/>
    <div className="max-w-3xl mx-auto my-12 p-4">
      <h1 className="text-8xl font-bold text-center text-indigo-900 mb-8">FAQ</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border border-gray-300 rounded-lg shadow-lg ${
              openIndex === index ? "bg-gray-100" : "bg-white"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left p-4 text-indigo-900 font-semibold text-lg"
            >
              {faq.question}
              {openIndex === index ? (
                <FaMinus className="text-indigo-900" />
              ) : (
                <FaPlus className="text-indigo-900" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 text-gray-700 text-md">
                {faq.answer.split("\n").map((line, i) => (
                  <p key={i} className="mb-2">{line}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default FAQSection;
