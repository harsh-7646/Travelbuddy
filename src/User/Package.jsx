// PackagesPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";

const classNames = {
  section: "py-20 bg-gradient-to-br from-pink-100 via-white to-blue-100",
  container: "px-4 mx-auto max-w-7xl sm:px-6 lg:px-8",
  heading:
    "text-3xl font-bold text-gray-900 sm:text-4xl xl:text-4xl text-center",
  description:
    "mt-4 text-base text-gray-700 leading-relaxed max-w-2xl mx-auto text-center",
  grid: "mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center place-items-center gap-6",
  card:
    "bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transform transition duration-300 w-72 min-h-[400px]",
  image: "h-44 w-full object-cover",
  content: "p-5 flex-1 flex flex-col justify-between",
  name: "text-lg font-semibold text-gray-800",
  destination: "text-sm text-gray-600 mt-1",
  duration: "text-sm text-gray-600 mt-1",
  price: "mt-3 text-lg font-bold text-pink-600",
  button:
    "mt-auto inline-block bg-gradient-to-r from-pink-500 to-blue-500 hover:opacity-90 text-white text-sm font-semibold py-2 px-4 rounded-lg transition shadow-md",
};

const API_URL = "https://generateapi.techsnack.online/api/package";
const token = "K4OS0XNqsLR7enT6";

// 👉 Default Packages
const defaultPackages = [
  {
    _id: "default-1",
    name: "Romantic Paris Getaway",
    destination: "Paris",
    duration: "5 Days",
    price: 50000,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
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
      const res = await axios.get(API_URL, {
        headers: { Authorization: token },
      });

      console.log("Packages Response:", res.data);

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
    <section className={classNames.section}>
      <div className={classNames.container}>
        {/* Heading */}
        <h2 className={classNames.heading}>Explore Our Travel Packages</h2>
        <p className={classNames.description}>
          Discover curated trips designed to make your journey unforgettable.
          Choose from romantic escapes, adventurous getaways, and relaxing retreats.
        </p>

        {/* Search Bar */}
        <div className="mt-8 text-center">
          <input
            type="text"
            placeholder="Search by destination or package..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-96 px-5 py-3 rounded-xl border border-black/20 bg-white/60 text-black placeholder-black/60 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Packages Grid */}
        <div className={classNames.grid}>
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg) => (
              <div key={pkg._id} className={classNames.card}>
                <img src={pkg.image} alt={pkg.name} className={classNames.image} />
                <div className={classNames.content}>
                  <h3 className={classNames.name}>{pkg.name}</h3>
                  <p className={classNames.destination}>{pkg.destination}</p>
                  <p className={classNames.duration}>{pkg.duration}</p>
                  <p className={classNames.price}>₹{pkg.price}</p>
                  <button className={classNames.button}>Book Now</button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
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
