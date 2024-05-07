import React, { useEffect, useState,useCallback } from "react";
import axios from "axios";
import {Link, useNavigate,} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pagination } from "flowbite-react";
// import _ from "lodash";
import debounce from "lodash.debounce";
import { Spinner } from "flowbite-react";
import Adduser from './svg/Adduser'
import Delete from './svg/Delete'
import View from "./svg/View";
import Search from "./svg/Search";


export default function Listofusers() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(100); // Add state for total pages
  const [searchterm, setSearchTerm] = useState("")
  const [confirmation, setConfirmation] = useState(false);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true); // Add loading state

  // component render first time this get api call first time
  useEffect(() => {
       setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setData(response.data);
        setTotalPages(Math.ceil(response.data.length / perPage));
       
      } catch (error) {
        console.log(error);
      } finally {
          setLoading(false);
      }
    };
    toast.promise(fetchData, {
    pending: "data is pending",
    success: "data is Loaded",
      error: "error",
      padding: "0 20px",
    }, {
    autoClose:700,
  });
    fetchData();
  }, [perPage]);

  const handleAdd = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]:e.target.value });
  };

  // confirmation box after click delete button data will be delete 
  const [idToDelete, setIdToDelete] = useState(null);
  const [dName, setDName] = useState("");

 const handlestatusdelete = (id,name) => {
    setConfirmation(true);
    setIdToDelete(id)
    setDName(name)
  }
  
  const handleConfirmDelete = async () => {
    console.log("delete the user")
    try {
      await axios.delete(`http://localhost:3000/users/${idToDelete}`);
      setData(data.filter((user) => user.id !== idToDelete));
      toast.error("User Delete successfully!", {
        autoClose: 700,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setConfirmation(false);
    }
  }
  const handleconfirmationSubmit = () => {
    setSubmitConfirmation(true);
}

  const handleConfirmADD = async () => {
    // if user do not add any data on input field form and click on submit so give them error code-- start
    if (Object.values(formData).some(value => value.trim() === "")) {
      toast.error("Please fill in all fields",{
        autoClose: 1000,
        position: "top-center"
      });
      return;
    }
    // if user do not add any data on input field form so give them error code---- end
    try {
      await axios.post("http://localhost:3000/users", formData);
      setSubmitConfirmation(false)
      setShowPopup(false);
      toast.success("User added successfully!", {
        autoClose: 700,
        position: "top-center"
      });
      const response = await axios.get("http://localhost:3000/users");
      setData(response.data);
      //   window.location.reload(true);  
    } catch (error) {
      toast.error("An error occurred", {
        autoClose: 500,
        position: "top-center"
      })
      console.log(error);
    } finally {
      setFormData({
        name: "",
        username: "",
        email: "",
        phone: "",
  });
    }
  };


// Debouncing functionality starts here
  const updatequery = e => {
    console.log("search Query :", e.target.value)
    setSearchTerm(e.target.value);
  }
  const debouncedOnchange = debounce(updatequery, 1000);

// Debouncing functionality end
  
    const filterData = data.filter(
    (user) =>
        user.name.toLowerCase().includes(searchterm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchterm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchterm.toLowerCase())
  );

 const onPageChange = (page) => {
    setCurrentPage(page);
  }

  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-gray-500 p-10">
      {/* loader spinner  */}
      <div className="text-center">
          {loading && <Spinner color="purple" aria-label="text-center Loading spinner" size="xl" />}
      </div>
      
      <div className="flex justify-end">
        {/* <button className="px-8 py-2 mx-2 bg-gray-600 font-bold rounded-md text-white text-bold text-[15px] my-1" onClick={()=>navigate('/')}>Back</button> */}
      </div>
      <ToastContainer />
      <h2 className="flex justify-center text-white text-[20px] font-bold">
        List Of Users
      </h2>
      <div className="flex justify-end">
        <div className="searhcicon">
          <Search/>
        <input type="search"   name="search" id="search" placeholder="Search..."  onChange={(e)=>debouncedOnchange(e)}className="px-9 py-2 mx-2 rounded-md text-dark text-bold text-[19px] my-2"/>
        </div>
        
        {/* <button
          className="px-8 py-2 mx-2 bg-green-600  rounded-md text-white text-bold text-[19px] my-2"
          onClick={handleAdd}>
          Add User
        </button> */}
        <button className="px-8 py-2 mx-2  bg-green-600  rounded-md text-white text-bold text-[19px] my-2" onClick={handleAdd}>
        <Adduser />
        </button>
      </div>

      <div className="bg-white text-gray-600 flex justify-center text-center mt-5">
        <table className="w-full border border-black my-6">
          <thead>
            <tr className="border border-black bg-gray-500 text-white text-[20px] ">
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>  
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item,index) => (
              <tr
                key={item.id}
                className={`${index % 2 === 0 ? "bg-gray-300" : "bg-white"}`}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  {/* <Link
                    to={`/create/listofusers/${item.id}`}
                    className="px-6 mx-3 py-1 bg-blue-400 rounded-md text-white text-bold text-[16px] my-2"
                  >
                   View
                  </Link> */}
                  <button className="bg-sky-600 px-4 py-1 rounded-md">
                    <Link to={`/create/listofusers/${item.id}`} >
                      <View />
                    </Link>
                  </button>

                  {/* <button
                    className="px-6 mx-3 py-1 bg-red-600 rounded-md text-white text-bold text-[16px] my-2"
                    onClick={() => handlestatusdelete(item.id,item.name)}
                  >
                    Delete
                  </button> */}
                  <button className="px-4 mx-3 py-1 bg-red-600 rounded-md text-white text-bold text-[16px] my-2"
                    onClick={() => handlestatusdelete(item.id, item.name)}>
                  <Delete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons />
      { showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center border-b-2 pb-3 border-gray-800">
              Add User
            </h1>
            <div className="flex gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="Email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="Email"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
           

            <div className="flex justify-center gap-4">
              <button
                className="px-7 py-2 font-bold bg-green-500 text-white rounded-md"
                onClick={handleconfirmationSubmit}
              >
                Sumbit
              </button>
              <button
                className="px-6 py-2 font-bold bg-blue-500 text-white rounded-md mr-2"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {submitConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-800 bg-opacity-75">
        <div className="bg-white p-8 rounded-lg ">
              <div className="py-7 mb-3">
                <h2> Are you sure you want to Add the user 
                  <span className="text-blue-800 font-bold"> {formData.name} </span> ? </h2>
              </div>
             
              <div className="flex justify-center gap-4">
                <button className="px-7 py-2 font-bold bg-green-500 hover:bg-green-700 hover:border border-gray-600  text-white rounded-md"
              onClick={handleConfirmADD}>Yes</button>
                <button className="px-7 py-2 font-bold bg-red-500 text-white rounded-md"
                onClick={()=>setSubmitConfirmation(false)}>No</button>
              </div>
            </div>
        </div>
      )}
      {
        confirmation && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-8 rounded-lg ">
              <div className="py-7 mb-3">
                <h2> Are you sure you want to delete the user 
                  <span className="text-blue-800 font-bold"> {dName}</span> ?</h2>
              </div>
             
              <div className="flex justify-center gap-4">
                <button className="px-7 py-2 font-bold bg-green-500 hover:bg-green-700 hover:border border-gray-600  text-white rounded-md"
              onClick={handleConfirmDelete}>Yes</button>
                <button className="px-7 py-2 font-bold bg-red-500 text-white rounded-md"
                onClick={()=>setConfirmation(false)}>No</button>
              </div>
            </div>
            </div>
        )
      }
    </div>
  );
}
