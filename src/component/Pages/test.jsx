import React, { useState,useEffect } from 'react'

export default function Test() {
    const [filterdata, setFilterdata] = useState([]);
    const data = [
        {
            "emp": "14",
            "empname": "rajjak77",
            "dept": "IT",
        },
        {
            "emp": "15",
            "empname": "rahill",
            "dept": "Btech",
        },
        {
            "emp": "16",
            "empname": "sonu",
            "dept": "sci",
        },
        {
            "emp": "17",
            "empname": "karan",
            "dept": "IT",
        },
    ];
    useEffect(() => {
        const filteremployee = data.filter((empfilter) => (
            empfilter.dept === "IT" && empfilter.empname=="rajjak77"
        ))
        setFilterdata(filteremployee);
        console.log(filteremployee)
    }, []);
  return (
    <div>
          <h1> hello </h1>
          <table>
              <tr>
                  <th>name</th>
                  <th>dept</th>
                  <th>emp</th>
              </tr>
              <tbody>
                      {
              filterdata.map((f,index) => (
                  <tr key={index}>
                      <td>{f.empname}</td>
                      <td>{f.dept}</td>
                      <td>{f.emp}</td>
                  </tr>
              ))
          }
              </tbody>
          </table>
    </div>
  )
}
