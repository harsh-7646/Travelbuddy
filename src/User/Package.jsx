import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaMapMarkerAlt, FaClock, FaTag, FaPlaneDeparture } from "react-icons/fa";
import Footer from "./Footer";

const API_URL = "https://generateapi.techsnack.online/api/package";
const token = "K4OS0XNqsLR7enT6";

function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get(API_URL, { headers: { Authorization: token } });

      if (Array.isArray(res.data)) {
        setPackages(res.data);
      } else if (res.data?.Data) {
        setPackages(res.data.Data);
      } else if (res.data?.data) {
        setPackages(res.data.data);
      } else {
        setPackages([]);
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
      setPackages([]); // no fallback defaults
    }
  };

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Packages Grid */}
      <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-blue-50 relative">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Popular Travel Packages
          </h2>
          <p className="mt-3 text-base text-gray-600 text-center">
            Choose from stunning destinations around the world.
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl flex flex-col sm:flex-row items-center p-3 gap-2">
              <div className="flex items-center w-full sm:flex-1">
                <FaSearch className="ml-2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search destination or package..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent outline-none px-3 text-gray-800"
                />
              </div>
              <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition w-full sm:w-auto">
                Search
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
                <div
                  key={pkg._id}
                  className="relative group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition transform hover:scale-[1.03]"
                >
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-5 left-5 text-white">
                    <h3 className="text-xl font-bold">{pkg.name}</h3>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <FaMapMarkerAlt className="text-yellow-400" />
                      {pkg.destination}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaClock className="text-blue-300" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-2 text-lg font-semibold text-pink-300 mt-2">
                      <FaTag /> ₹{pkg.price.toLocaleString()}
                    </div>
                    <button className="mt-3 flex items-center gap-2 bg-gradient-to-r from-pink-500 to-blue-500 py-2 px-4 rounded-lg font-semibold shadow-lg hover:opacity-90 transition">
                      <FaPlaneDeparture /> Book Now
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 text-lg">
                No packages found...
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default PackagesPage;
