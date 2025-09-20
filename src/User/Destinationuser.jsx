import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import Footer from "./Footer";

const token = "RTzcbSNYBybOqY1f";
const API_URL = "https://generateapi.techsnack.online/api/destination";

const DestinationUser = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: token },
      });
      const apiData = res.data?.Data || [];
      setList(apiData);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setList([]); // No fallback to default destinations
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-pink-100 via-white to-blue-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Explore Dream <span className="text-pink-600">Destinations</span>
          </h1>
          <p className="mt-3 text-gray-600 text-lg">
            Discover hand-picked locations across the world.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">
            Loading destinations...
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {list.length > 0 ? (
              list.map((dest) => (
                <div
                  key={dest._id || dest.name}
                  className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-[1.02]"
                >
                  {/* Image */}
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Text Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-semibold">{dest.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-pink-300">
                      <FaMapMarkerAlt /> {dest.region}
                    </div>
                    <p className="mt-1 text-xs text-gray-200 line-clamp-2">
                      {dest.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 text-lg">
                No destinations found.
              </p>
            )}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default DestinationUser;
