import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Faqs3 = () => {
  const faqs = [
    {
      id: 1,
      question: "How do I book a trip with Travel Buddy?",
      answer:
        "Simply search for your destination, select your preferred package, and follow the easy booking steps. You can pay online securely to confirm your trip.",
    },
    {
      id: 2,
      question: "Can I customize my travel package?",
      answer:
        "Yes! Travel Buddy allows you to customize your package by choosing hotels, activities, and trip duration according to your preferences.",
    },
    {
      id: 3,
      question: "What if I need to cancel my booking?",
      answer:
        "You can cancel your booking anytime from your dashboard. Refunds are processed according to our cancellation policy, which varies by package.",
    },
    {
      id: 4,
      question: "Do you provide travel support during my trip?",
      answer:
        "Absolutely! Our 24/7 support team is available via chat, email, or phone to assist you during your journey.",
    },
    {
      id: 5,
      question: "Are there any discounts for group bookings?",
      answer:
        "Yes, we offer special discounts for group trips. The larger your group, the more you save. Contact our team for custom group packages.",
    },
  ];

  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="py-8 bg-white sm:py-10 lg:py-12">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-12 xl:gap-x-16">
          {/* Left side image */}
          <div>
            <img
              className="object-cover w-full h-80 sm:h-96 lg:h-[500px] rounded-2xl shadow-lg"
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60"
              alt="Travel adventure"
            />
          </div>

          {/* Right side FAQs */}
          <div>
            {/* <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
              FAQs
            </p> */}
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>

            <div className="flow-root mt-10 sm:mt-12">
              <div className="-my-6 divide-y divide-gray-200">
                {faqs.map((faq) => (
                  <div key={faq.id} className="py-2" role="region">
                    <h3>
                      <button
                        onClick={() => toggleAccordion(faq.id)}
                        aria-expanded={activeId === faq.id}
                        className="flex items-center justify-between w-full py-4 text-lg font-medium text-left text-gray-800 hover:text-blue-600 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <span className="ml-4">
                          {activeId === faq.id ? (
                            <FaChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <FaChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </span>
                      </button>
                    </h3>

                    {activeId === faq.id && (
                      <div className="pb-4">
                        <p className="text-base text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs3;
