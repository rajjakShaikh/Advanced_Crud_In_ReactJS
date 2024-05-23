import React, { useState } from "react";
import Linkedln from "./svg/Linkedln";
import { Link, Navigate } from "react-router-dom";
import Github from "./svg/Github";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [openPopup, setOpenPopup] = useState(false);
  const Navigate = useNavigate();
  const handleopenPopup = () => {
    setOpenPopup(true);
  };

  const handlelogout=() => {
    Navigate("/login")
    console.log("Logout success");
 }

  return (
    <>
      <div className="bg-blue-950 flex justify-between px-11  py-3 ">
        <div>
          <button
            className="bg-green-600 px-5 py-2 font-semibold rounded-md text-white"
            onClick={handleopenPopup}
          >
            Send DM
          </button>
           <button className="bg-red-600 px-4 ml-3 py-2 font-semibold rounded-md text-white" onClick={handlelogout}>Logout</button>
       
        </div>
        <div>
          <h3 className="text-white text-center font-bold pt-2 text-[20px] ">
            Advanced CRUD in React
          </h3>
        </div>
        <div className="flex justify-between gap-4 border border-white rounded-md px-3 py-1 ">
            <Link
            className="pointer-cursor-pointer"
            to={"https://www.linkedin.com/in/rajjak-shaikh-271216243/"}>
            <Linkedln />
          </Link>
          
          <Link
            className="pointer-cursor-pointer"
            to={"https://github.com/rajjakShaikh/Advanced_Crud_In_ReactJS"}
          >
            <Github />
          </Link>
        </div>
        {openPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg ">
              <div>
                <h2 className="font-semibold py-1">Enter Email :</h2>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="enter email.."
                  className="w-full border-blue-600 rounded-md"
                  formAction="mail:to"
                ></input>
                {/* </div> */}

                {/* <div className="py-7 mb-3"> */}
                <h2 className="font-semibold py-2 ">Send Message :</h2>
                <textarea
                  name="text"
                  id="text"
                  cols="30"
                  rows="5"
                  placeholder="enter message...."
                  className="w-full border-blue-600 rounded-md"
                >
                </textarea>
              </div>
              <div className="flex justify-center gap-4">
                <button className="px-7 py-2 font-bold bg-green-500 hover:bg-green-700 hover:border border-gray-600  text-white rounded-md">
                  Send
                </button>
                <button
                  className="px-7 py-2 font-bold bg-red-500 text-white rounded-md"
                  onClick={() => setOpenPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
