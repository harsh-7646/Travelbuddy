import React from "react";
import Footer from "./Footer";
import { FaGlobeAmericas, FaUsers, FaPlane, FaSmile } from "react-icons/fa";

const classNames = {
  section: "py-20 bg-gradient-to-br from-pink-100 via-white to-blue-100",
  container: "px-4 mx-auto max-w-7xl sm:px-6 lg:px-8",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-y-14 items-center",
  imageWrapper:
    "relative rounded-3xl overflow-hidden md:order-2 shadow-xl shadow-blue-200/40",
  image: "object-cover w-full h-full rounded-3xl",
  quoteWrapper: "absolute bottom-6 left-6 right-6",
  quoteBox:
    "bg-white/60 backdrop-blur-lg border border-white/30 rounded-xl shadow-md",
  quoteContent: "px-6 py-5 md:px-8 md:py-6",
  quoteText: "text-lg italic text-slate-800 leading-relaxed font-medium",
  name: "mt-4 text-base font-semibold text-indigo-900",
  role: "text-sm text-slate-500",
  textContent: "md:pr-12",
  heading:
    "text-3xl font-bold text-indigo-900 sm:text-4xl xl:text-4xl leading-tight tracking-tight",
  description: "mt-6 text-base text-slate-700 leading-relaxed max-w-xl",
  stars: "w-5 h-5 text-yellow-400",
  reviews: "mt-5 text-base text-slate-600",
};

function About() {
  return (
    <>
      <section className={classNames.section}>
        <div className={classNames.container}>
          <div className={classNames.grid}>
            {/* Image + Glassy Quote */}
            <div className={classNames.imageWrapper}>
              <img
                className={classNames.image}
                src="https://images.unsplash.com/photo-1665686440627-936e9700a100?q=80&w=2070&auto=format&fit=crop"
                alt="Testimonial"
              />
              <div className={classNames.quoteWrapper}>
                <div className={classNames.quoteBox}>
                  <div className={classNames.quoteContent}>
                    <blockquote>
                      <p className={classNames.quoteText}>
                        “Travel Buddy made my trip absolutely unforgettable! From
                        booking to exploring, everything was seamless and
                        enjoyable.”
                      </p>
                    </blockquote>
                    <p className={classNames.name}>Leslie Alexander</p>
                    <p className={classNames.role}>
                      Travel Enthusiast & Travel Buddy User
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className={classNames.textContent}>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className={classNames.heading}>
                    8200+ travelers absolutely love Travel Buddy.
                  </h3>
                  <p className={classNames.description}>
                    With Travel Buddy, planning your journey has never been
                    easier. From discovering amazing destinations to booking the
                    perfect trip, we help travelers create memories that last a
                    lifetime.
                  </p>
                </div>

                {/* Rating section */}
                <div className="mt-12">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={classNames.stars}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className={classNames.reviews}>
                    <span className="font-semibold text-indigo-900">
                      4.7 out of 5
                    </span>{" "}
                    from 8.2k+ reviews
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Facts Section */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-md 
                  transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-200/50">
              <FaGlobeAmericas className="mx-auto text-4xl text-indigo-600 mb-3 transition duration-300 group-hover:rotate-6" />
              <h4 className="text-2xl font-bold text-indigo-900">50+</h4>
              <p className="text-slate-600">Countries Covered</p>
            </div>

            <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-md 
                  transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-200/50">
              <FaUsers className="mx-auto text-4xl text-indigo-600 mb-3" />
              <h4 className="text-2xl font-bold text-indigo-900">8200+</h4>
              <p className="text-slate-600">Happy Travelers</p>
            </div>

            <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-md 
                  transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-200/50">
              <FaPlane className="mx-auto text-4xl text-indigo-600 mb-3" />
              <h4 className="text-2xl font-bold text-indigo-900">150+</h4>
              <p className="text-slate-600">Trips Completed</p>
            </div>

            <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-md 
                  transform transition duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-200/50">
              <FaSmile className="mx-auto text-4xl text-indigo-600 mb-3" />
              <h4 className="text-2xl font-bold text-indigo-900">98%</h4>
              <p className="text-slate-600">Positive Feedback</p>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="mt-20 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-indigo-900">Our Mission</h3>
            <p className="mt-4 text-slate-700">
              To empower travelers by making trip planning effortless and
              enjoyable, while ensuring unforgettable experiences through our
              curated destinations and personalized services.
            </p>
            <h3 className="mt-10 text-2xl font-bold text-indigo-900">
              Our Vision
            </h3>
            <p className="mt-4 text-slate-700">
              To become the world’s most trusted travel companion, helping people
              explore every corner of the globe with confidence and excitement.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
