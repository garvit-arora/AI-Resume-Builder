import React, { useEffect } from "react";
import { useState } from "react";
import intro from "../../assets/pic1.png";
import mouse from "../../assets/mouse4.svg";
import key1 from "../../assets/card1.png";
import key2 from "../../assets/card2.png";
import key3 from "../../assets/card3.png";
import key4 from "../../assets/card4.png";
import { alpha, motion } from "framer-motion";
import google from "../../assets/google.jpg";
import youtube from "../../assets/yt.jpg";
import amazon from "../../assets/amazon.svg";
import apple from "../../assets/apple.jpg";
import meta from "../../assets/meta.jpg";
import netflix from "../../assets/netflix.jpg";
import microsoft from "../../assets/microsoft.png";
import juspay from "../../assets/juspay.avif";
import { object } from "framer-motion/client";

function Home() {
  const [showMouse, setShowMouse] = useState(true);
  const features = {
    feature1: {
      heading: "Smart Resume Builder",
      about:
        "AI crafts tailored resumes that match your skills with the job description, saving you hours while boosting your chances of landing interviews — so recruiters see exactly why you’re the right fit.",
    },
    feature2: {
      heading: "ATS-Friendly Design",
      about:
        "Optimized layouts so Applicant Tracking Systems never filter you out. Every keyword aligned, every detail structured — so your resume speaks the language recruiters actually read.",
    },
    feature3: {
      heading: "Instant Suggestions",
      about:
        "Get real-time tips for stronger wording, impactful achievements, and better formatting — guiding you a step by step to transform your resume into a polished, professional document.",
    },
    feature4: {
      heading: "One-Click Export",
      about:
        "Download your resume instantly in multiple formats like PDF and DOCX — perfectly polished and ready to send to recruiters, job portals, or hiring managers without a single extra edit.",
    },
  };
  const logos = [
    meta,
    microsoft,
    youtube,
    google,
    netflix,
    apple,
    juspay,
    amazon,
  ];
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowMouse(false);
      } else {
        setShowMouse(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  function handleMain(){
        window.location.href = "builder";
    }
  return (
    <>
      <div className="overflow-hidden">
        <div className="flex h-screen justify-between  items-center -m-10 flex-row text-white px-20 ">
          <div className="">
            <h1 className="text-6xl font-extrabold ">AI Resume Maker</h1>
            <br />
            <p className="text-xl mt-4 font-light">
              The One and Only best AI Resume Maker especially for <br /> those
              looking for jobs and want to increase their selection Rate.
            </p>
            <br />
            <br />
            <button onClick={handleMain} className="text-black text-center mt-6 bg-white w-40 h-13 font-bold text-xl rounded-2xl cursor-pointer ">
              Get Started !
            </button>
          </div>
          <img className="flex w-150" src={intro} alt="intro pic" />
        </div>
        <div></div>
        {showMouse && (
          <img
            src={mouse}
            className="w-12 fixed bottom-0 z-50 left-1/2 transform -translate-x-1/2 animate-bounce"
            alt="scroll-down"
          />
        )}
        <br /> <br />
        <br />
        <div className="text-white">
          <h1 className="text-white text-5xl font-bold px-10">
            Key Features We Provide
          </h1>
          <br /><br />
          <div className="flex m-20 leading-loose tracking-wider gap-4 justify-between">
            {Object.entries(features).map(([key, value]) => (
              <motion.div
                key={key}
                className="border-white h-auto border-2 p-6 rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h1 className="text-2xl font-bold text-white border-b border-b-white pb-3 mb-3">
                  {value.heading}
                </h1>
                <p className="text-lg mt-4">{value.about}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div><br /><br /><br />
      <div className="">
        <h1 className="text-6xl font-bold text-white px-10">
          Resumes Accepted by Companies WorldWide
        </h1><br /><br /><br /> <br />
        <br />
        <div className="flex mb-50">
          <div className="animate-marquee">
            {logos.map((logo, i) => (
        <img
          key={i}
          src={logo}
          alt="company"
          className="mx-8 h-20 w-20 rounded-full object-cover shadow-lg"
        />
      ))}
          </div>
         </div>
      </div>
    </>
  );
}
export default Home;
