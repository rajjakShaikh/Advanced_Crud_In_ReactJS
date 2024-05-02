import React from 'react'
import Linkedln from './svg/Linkedln'
import { Link } from 'react-router-dom'
import Github from './svg/Github'
export default function Navbar() {
  return (
  <>
      <div className="bg-blue-950 flex justify-between px-6 py-3">
        <div>
        </div>
        <div>
         <h3 className="text-white font-bold pt-2 text-[20px]"> Advanced CRUD in React </h3>
        </div>
        <div className='flex justify-between gap-4 border border-white rounded-md px-3 py-1 '>
          <Link to={"https://www.linkedin.com/in/rajjak-shaikh-271216243/"}>
               <Linkedln />
          </Link>
           <Link to={"https://github.com/rajjakShaikh/Advanced_Crud_In_ReactJS"}>
               <Github />
          </Link>
     
        </div>
      </div>
</>
  )
}
