import AOS from "aos";
import "aos/dist/aos.css";

import Banner from "./components/Banner/CompaniesSection.jsx";
import Blogs from "./components/Blogs/Blogs";
import Swipe from "./components/Blogs/Swipe";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero.jsx/Hero";
// import Navbar from "./components/navbar/Navbar";
import Navbar2 from "./components/navbar/Navbar2";
import { useEffect } from "react";
import Service from "./components/Service/Service";
import BannerDetails from "./components/BannerDetails/BannerDetails";
import Banner1 from "./assets/job.jpg";
import Banner2 from "./assets/fr.jpg";
import "./index.css";
// import Register from '../../Register/src_R/App.jsx'
function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Navbar2 />
      <Hero />
      {/* <Service /> */}

      {/* القسم الأول مع صورة أولى ونصوص مخصصة */}
      <BannerDetails
        Button={"Find Job"}
        targetPage={"JobBoard"}
        smallHeight={true}
        reverse={true}
        img={Banner1}
        title="Job Search for Freshly Graduated IT Students"
        description="The job search service for recent IT graduates provides personalized career opportunities, empowering them to explore a wide range of roles such as software development, network engineering, data analysis, and beyond."
        bulletPoints={[
          "Tailored job and internship opportunities in IT roles.",
          "Gateway to exciting IT careers.",
          "Supports professional growth for graduates.",
        ]}
      />

      {/* القسم الثاني مع صورة ثانية ونصوص مخصصة */}
      <BannerDetails
        Button={"Start The Test"}
        targetPage={"/exam"}
        img={Banner2}
        smallHeight={true}
        title="Discover Your Tech Journey"
        description="We offer IT specialization tests for new students, training opportunities for current students, and job search support for graduates to succeed in the IT field.
        
."
        bulletPoints={[
          "Guidance Test for IT Specialization.",
          "Training Opportunities for Current Students. ",
          "Job Support for Graduates .",
        ]}
      />

      <Banner />
      <Blogs />
      {/* <Swipe /> */}
      <Footer />
    </>
  );
}

export default App;
