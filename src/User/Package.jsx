import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaMapMarkerAlt, FaClock, FaTag, FaPlaneDeparture } from "react-icons/fa";
import Footer from "./Footer";

const API_URL = "https://generateapi.techsnack.online/api/package";
const token = "K4OS0XNqsLR7enT6";

const defaultPackages = [
  {
    _id: "default-1",
    name: "Romantic Paris Getaway",
    destination: "Paris",
    duration: "5 Days",
    price: 50000,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  },
  {
    _id: "default-2",
    name: "Bali Adventure",
    destination: "Bali",
    duration: "7 Days",
    price: 40000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQci5H4dz84BSITFdM6CRrl5H927Iep5RxV2Q&s",
  },
  {
    _id: "default-3",
    name: "Maldives Escape",
    destination: "Maldives",
    duration: "4 Nights / 5 Days",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
  },
];

function PackagesPage() {
  const [packages, setPackages] = useState(defaultPackages);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get(API_URL, { headers: { Authorization: token } });

      if (Array.isArray(res.data)) {
        setPackages([...defaultPackages, ...res.data]);
      } else if (res.data?.Data) {
        setPackages([...defaultPackages, ...res.data.Data]);
      } else if (res.data?.data) {
        setPackages([...defaultPackages, ...res.data.data]);
      }
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
          alt="Travel Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">
            Discover Your Next <span className="text-yellow-300">Adventure</span>
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Handpicked packages for every traveler – explore, relax & enjoy life’s journey.
          </p>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 w-full sm:w-2/3 md:w-1/2 px-4">
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl flex items-center p-3">
            <FaSearch className="ml-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search by destination or package..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none px-3 text-gray-800"
            />
            <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-28 bg-gradient-to-br from-pink-50 via-white to-blue-50 relative">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Popular Travel Packages
          </h2>
          <p className="mt-3 text-base text-gray-600 text-center">
            Choose from stunning destinations around the world.
          </p>

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
