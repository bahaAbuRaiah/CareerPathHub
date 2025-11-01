import React, { useEffect } from "react";
import Img1 from "../../assets/blog1.jpg";
import Img2 from "../../assets/blog2.jpg";
import Img3 from "../../assets/blog3.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import BlogCard from "./BlogCard"; 

const Blogs = () => {
  return (
    <main data-aos="fade-up" data-aos-offset="200">
      <section className="container mx-auto mb-10 py-8">
        <h1 className="mb-8 border-l-8 py-2 pl-2 text-center text-3xl font-bold">
          Our Latest IT Blogs
        </h1>
        <div className="grid grid-cols-1 gap-3 place-items-center sm:grid-cols-2 md:grid-cols-3">
          <BlogCard
            Img1={Img1}
            title="Exploring the Future of Cloud Computing"
            description="Learn how cloud computing is shaping the future of IT jobs and its growing role in every tech industry."
            date="April 24, 2022"
            author="Dilshad"
          />
          <BlogCard
            Img1={Img2}
            title="Top 5 Programming Languages in 2024"
            description="A deep dive into the top programming languages that are trending in the IT industry and their demand in the job market."
            date="Jan 3, 2023"
            author="Akshay"
          />
          <BlogCard
            Img1={Img3}
            title="Cybersecurity Best Practices for 2024"
            description="Cybersecurity is one of the fastest-growing fields in IT. This blog highlights the best practices to stay safe in the digital world."
            date="April 24, 2024"
            author="Satya"
          />
        </div>
      </section>
    </main>
  );
};

export default Blogs;
