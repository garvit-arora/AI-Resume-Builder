import React from "react";
import heart from "../../assets/heart.svg";
import github from "../../assets/github/github-mark/github.png";
import linkedin from "../../assets/linkedin.svg";
import potfolio from "../../assets/portfolio.svg"

function handleGithub(){
    window.open("https://github.com/garvit-arora","_blank");
    
}
function handleLinkedIn(){
    window.open("https://linkedin.com/garvit-","_blank");
    
}
function handlePortfolio(){
    window.open("https://garvit.is-a.dev","_blank");
    
}

function Footer() {
  return (
    <>
      <div className="bg-white b-0  items-center h-60">
        <div className="flex items-center text-center justify-center">
          <h1 className="text-8xl font-bold">
            Made By <span className="font-extrabold">Garvit Arora</span> with l
          </h1>
          <img src={heart} className="w-25" alt="LOVE" />
          <h1 className="text-8xl font-bold"> ve</h1>
        </div><br /><br />
        <div className="flex gap-20 items-center justify-center">
            <img src={github} onClick={handleGithub} className="w-20 cursor-pointer" alt="Github" />
            <img src={linkedin} onClick={handleLinkedIn} className="w-20 cursor-pointer" alt="LinkedIn" />
            <img src={potfolio} onClick={handlePortfolio} className="w-20 cursor-pointer" alt="Potfolio" />
        </div>
      </div>
    </>
  );
}

export default Footer;
