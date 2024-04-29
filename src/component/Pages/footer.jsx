import React from "react";
import PayphiLogo from "./svg/PayPhi";
import RupayLogo from "./svg/RupayLogo";
export default function Footer() {
  return (
    <div className="bg-gray-500">
      <div className="custom-container mx-auto py-4 px-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
        <div className="flex flex-row md:justify-start">
          <span className="text-white p-4">Developed by</span>
      <PayphiLogo />
        </div>
        <ul className="flex flex-row justify-center sm:text-[14px] md:text-[16px]  md:justify-start">
          <li className="text-white mr-4 border-r-2  border-white ">
            <a href="#" className="md:mr-1">Contact Us</a>
          </li>
          <li className="text-white mr-4 border-r-2  border-white">
            <a href="#" className="md:mr-1">Terms of Use</a>
          </li>
          <li className="text-white">
            <a href="#">Privacy Statement</a>
          </li>
        </ul>
        <div className="flex flex-row md:justify-end">
          <span className="text-white p-4">In partnership with</span>
         <RupayLogo/>
        </div>
      </div>
    </div>
  );
}
