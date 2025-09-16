import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/images/logo.png"; 
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; 

function Footer() {
  return (
    <footer className="bg-black text-white pt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 items-start">
 
        <div className="flex items-start space-x-3">
          <img src={logoImg} alt="Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold">MyCourse.io</span>
        </div>

 
        <div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/web-development" className="hover:underline">Web Programming</Link></li>
            <li><Link to="/data-science" className="hover:underline">Mobile Programming</Link></li>
            <li><Link to="/ui-ux" className="hover:underline">Java Beginner</Link></li>
            <li><Link to="/marketing" className="hover:underline">PHP Beginner</Link></li>
          </ul>
        </div>

 
        <div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/business" className="hover:underline">Adobe Illustrator</Link></li>
            <li><Link to="/photography" className="hover:underline">Adobe Photoshop</Link></li>
            <li><Link to="/health-fitness" className="hover:underline">Design Logo</Link></li>
          </ul>
        </div>


        <div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/finance" className="hover:underline">Writing Course</Link></li>
            <li><Link to="/design" className="hover:underline">Photography</Link></li>
            <li><Link to="/music" className="hover:underline">Video Making</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-600 mx-6 py-4">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
   
          <p className="text-sm text-gray-400">
           Copyright © MyCourse.io 2024. All Rights Reserved
          </p>

  
          
          <div className="flex space-x-4 mt-4 md:mt-0">
                  <Link to="/facebook">
                   <FaFacebookF className="h-6 w-6 hover:text-gray-300 transition-colors" />
                  </Link>
                  <Link to="/twitter">
                   <FaTwitter className="h-6 w-6 hover:text-gray-300 transition-colors" />
                  </Link>
                    <Link to="/instagram">
                  <FaInstagram className="h-6 w-6 hover:text-gray-300 transition-colors" />
                    </Link>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;
