import React, { useEffect, useState } from "react";
import axios from "axios";

function Testpage() {
  const [data, setData] = useState([]);
  const [addData, setAddData] = useState({
    username: "",
    email: "",
    city: "", 
  });

  const getData = () => {
    axios.get("https://fakestoreapi.com/users").then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Corrected typo here
    const payload = {
      username: addData.username,
      email: addData.email,
      address: {
        city: addData.city,
      },
    };
    try {
      axios.post("https://fakestoreapi.com/users", payload).then(() => {
          console.log("user created successfully");
           alert("user added successfully");
          getData();
          setAddData({
              username: "",
              email: "",
              city: "", 
          })

      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddData({ ...addData, [name]: value });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1> hello</h1>
      <table className="border-b-2 border-gray-700">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>city</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={addData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={addData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={addData.city}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
}

export default Testpage;
