import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Read() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        setData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/users/${id}`, formData);
      toast.success("update the data successfully", {
        autoClose: 700,
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast.error("update the data failed", {
        autoClose: 700,
        position: "top-center",
      });
    }
    setTimeout(() => {
      navigate("/create/listofusers");
    }, 2000);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-8">
      <ToastContainer />
      <div className="bg-white p-8 shadow-2xl rounded-lg w-1/2">
        <h3 className="text-2xl font-bold mb-4 text-center  border-gray-400 pb-3 border-b">User Details</h3>
        <div className="flex justify-evenly">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex justify-evenly">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="flex justify-center gap-[50px] mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md mr-4 focus:outline-none focus:ring focus:ring-blue-400"
            onClick={handleUpdate}
          >
            Update
          </button>
          <Link
            to={`/create/listofusers`}
            className="px-4 py-2 bg-green-700 text-white rounded-md focus:outline-none focus:ring focus:ring-green-400"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
}
