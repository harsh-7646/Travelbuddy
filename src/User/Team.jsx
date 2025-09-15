import React from "react";

const styles = {
  section:
    "relative py-12 sm:py-16 lg:py-20 overflow-hidden", // ✅ reduced padding
  background:
    "absolute inset-0 bg-gradient-to-b from-purple-200 via-white to-blue-200",
  container: "relative px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl",
  headerContainer:
    "text-center lg:text-left lg:flex lg:items-end lg:justify-between",
  title: "tracking-tighter text-gray-900",
  titlePart1: "text-3xl font-light sm:text-4xl md:text-5xl", // ✅ smaller font
  titlePart2:
    "font-serif text-4xl italic sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600",
  subtitle:
    "max-w-lg mx-auto lg:mx-0 mt-4 text-base font-normal leading-7 text-gray-700",
  button: `
    inline-flex
    items-center
    justify-center
    px-5
    py-2.5
    text-sm
    font-semibold
    transition-all
    duration-200
    rounded-full
    bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
    text-white
    shadow-md
    hover:shadow-lg
    hover:opacity-90
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
  `,
  grid: "grid grid-cols-1 gap-6 mt-10 sm:mt-14 lg:mt-16 text-center sm:grid-cols-2 lg:grid-cols-4",
  memberContainer:
    "relative overflow-hidden rounded-2xl shadow-lg group transform transition duration-300 hover:-translate-y-1",
  gradientOverlay:
    "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-all duration-300",
  memberInfoContainer: "absolute inset-x-0 bottom-0 px-4 py-4 text-left",
  memberName: "font-sans text-base sm:text-lg font-semibold text-white",
  memberRole: "mt-0.5 font-serif text-sm italic text-gray-200",
};

const members = [
  {
    name: "Cymone Magdalina",
    role: "Travel Photographer",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=987&auto=format&fit=crop",
  },
  {
    name: "Veronika Inaya",
    role: "Adventure Planner",
    image:
      "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=987&auto=format&fit=crop",
  },
  {
    name: "Hyeon Emily",
    role: "Local Culture Expert",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=987&auto=format&fit=crop",
  },
  {
    name: "Sophia Ella",
    role: "Food & Experience Curator",
    image:
      "https://images.unsplash.com/photo-1514626585111-9aa86183ac98?q=80&w=987&auto=format&fit=crop",
  },
];

const TravelBuddyTeam = () => {
  return (
    <section className={styles.section}>
      {/* Background */}
      <div className={styles.background}></div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerContainer}>
          <div>
            <h2 className={styles.title}>
              {/* <span className={styles.titlePart1}>Your </span> */}
              <span className={styles.titlePart2}>Travel Buddy Team</span>
            </h2>
            <p className={styles.subtitle}>
              Meet the explorers and creators behind Travel Buddy. Our team
              brings together travel expertise, adventure planning, photography,
              and local culture knowledge — making every journey unforgettable.
            </p>
          </div>

          {/* <div className="mt-6 lg:mt-0">
            <a href="#" title="Learn More" className={styles.button}>
              Learn More
              <svg
                className="h-4 w-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div> */}
        </div>

        {/* Members Grid */}
        <div className={styles.grid}>
          {members.map((member, index) => (
            <div key={index} className={styles.memberContainer}>
              <div className="h-[320px]"> {/* ✅ reduced image height */}
                <img
                  className="object-cover w-full h-full transform transition duration-500 group-hover:scale-105"
                  src={member.image}
                  alt={member.name}
                />
              </div>
              <div className={styles.gradientOverlay}></div>
              <div className={styles.memberInfoContainer}>
                <p className={styles.memberName}>{member.name}</p>
                <p className={styles.memberRole}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelBuddyTeam;
