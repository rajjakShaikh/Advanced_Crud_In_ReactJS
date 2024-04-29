import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData, "inputData");
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/users", inputData).then((res) => {
      console.log(res);
      navigate("/create/listofusers");
    });
  };
  return (
    <div className="bg-gray-600 w-full p-6 text-white text-[18px] flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-center mb-6">Add User</h1>
        <form onSubmit={handlesubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input-field text-black"
                  value={inputData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="input-field text-black"
                  value={inputData.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input-field text-black"
                  value={inputData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Phone
                </label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  className="input-field text-black"
                  value={inputData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-start gap-4 my-4">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white text-[18px] my-3  text-center"
            >
              Submit
            </button>
            <button
              type="Back"
              className="px-6 py-2 bg-white text-gray-600 font-bold-600 text-[18px] my-3  text-center"
              onClick={() => navigate("/create/listofusers")}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
