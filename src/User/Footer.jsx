import React from "react";
import { Link } from "react-router-dom";
import { RiSendPlaneLine } from "react-icons/ri";
import { FaLinkedinIn, FaInstagramSquare } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { TbBrandGithubFilled } from "react-icons/tb";

const Footer = () => {
    const linkStyle =
        "text-sm text-gray-700 hover:text-orange-500 transition-colors duration-300";

    const socialStyle =
        "w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-orange-400 hover:bg-orange-400 hover:text-white text-gray-700 transition-all duration-300";

    return (
        <footer className="bg-gradient-to-r from-blue-50 via-teal-50 to-blue-100 text-gray-800 relative overflow-hidden">
            <div className="relative container mx-auto px-6 py-14 lg:py-10">
                <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
                    {/* Logo + Description */}
                    <div>
                        <Link to="/" className="flex items-center space-x-2">
                            <h1 className="text-2xl font-bold text-gray-900">Travel Buddy</h1>
                        </Link>
                        <p className="mt-5 text-sm text-gray-600 leading-relaxed max-w-xs">
                            Discover the world with{" "}
                            <span className="text-orange-500 font-medium">Travel Buddy</span>.
                            Your trusted companion for finding amazing destinations, planning
                            your trips, and making memories that last forever.
                        </p>
                    </div>

                    {/* Travel Buddy Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-5 text-gray-900">
                            Travel Buddy
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className={linkStyle}>Home</Link>
                            </li>
                            <li>
                                <Link to="/destinations" className={linkStyle}>Destination</Link>
                            </li>
                            <li>
                                <Link to="/package" className={linkStyle}>Package</Link>
                            </li>
                            <li>
                                <Link to="/about" className={linkStyle}>About</Link>
                            </li>
                            <li>
                                <Link to="/contact" className={linkStyle}>Contact</Link>
                            </li>
                            <li>
                                <Link to="/login" className={linkStyle}>Login</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Explore Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-5 text-gray-900">Explore</h3>
                        <ul className="space-y-3">
                            {[
                                "Destinations",
                                "Travel Packages",
                                "Hotel Bookings",
                                "Holiday Trips",
                                "Adventure Tours",
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <a href="/" className={linkStyle}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-lg mb-5 text-gray-900">
                            Stay Updated
                        </h3>
                        <form className="flex w-full max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-5 py-3 rounded-full bg-white text-sm text-gray-700 
                 placeholder-gray-400 border border-gray-300
                 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
                            />
                            <button
                                className="-ml-16 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 
                 text-white flex items-center justify-center rounded-full 
                 transition-all duration-300 shadow-md"
                            >
                                <RiSendPlaneLine className="w-5 h-5" />
                            </button>
                        </form>

                        <div className="flex space-x-4 mt-6">
                            {[
                                { icon: <TbBrandGithubFilled />, href: "https://github.com/login" },
                                { icon: <BsTwitter />, href: "https://x.com/i/flow/login?lang=en" },
                                { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/login" },
                                { icon: <FaInstagramSquare />, href: "https://www.instagram.com/accounts/login/?hl=en" },
                            ].map((item, idx) => (
                                <a key={idx} href={item.href} className={socialStyle}>
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-12 border-t border-gray-200 pt-6 text-center">
                    <p className="text-sm text-gray-600">
                        © {new Date().getFullYear()}{" "}
                        <span className="text-orange-500 font-medium">Travel Buddy</span>.
                        Designed with ❤️ for travelers worldwide.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
