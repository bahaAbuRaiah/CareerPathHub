import React from "react";
import Banner from "../../assets/li3.png";

const Hero = () => {
  return (
    <main className="bg-gradient-to-r from-blue-800 to-indigo-900 pt-16 dark:bg-gradient-to-r">
      <section className="container mx-auto flex min-h-[650px] flex-col items-center justify-start px-4 md:px-8">
        <div className="grid grid-cols-1 items-center gap-8 dark:text-white md:grid-cols-2">
          {/* Text Section */}
          <div
            data-aos="fade-right"
            data-aos-duration="400"
            data-aos-once="true"
            className="flex flex-col items-center gap-6 text-center text-white md:items-start md:text-left"
            style={{ marginTop: "-50px" }}
          >
            <h1 className="text-6xl font-bold leading-tight">
              <span className="text-teal-400">NAVIGATE</span> YOUR IT CAREER
            </h1>
            <p className="text-xl leading-relaxed">
              Explore your tech journey seamlessly by navigating specialized
              career paths and searching for job opportunities tailored to your
              skills.
            </p>
            <div className="space-x-4">
              <button className="rounded-md border-2 border-primary bg-primary px-8 py-4 text-lg text-white transition-colors duration-300 hover:bg-teal-500">
                Get Started
              </button>
            </div>
          </div>

          {/* Banner Section */}
          <div
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-once="true"
            className="mx-auto p-4"
            style={{ marginTop: "-30px" }}
          >
            <img
              src={Banner}
              alt="No image"
              className="h-auto w-full max-w-[680px] ml-11 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
