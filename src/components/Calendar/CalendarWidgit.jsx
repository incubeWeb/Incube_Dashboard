import React, { useState } from 'react'
import Calendar from 'react-calendar';
import '../../../node_modules/react-calendar/dist/Calendar.css'; 
import { CiCalendar } from "react-icons/ci";
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
const CalendarWidgit = ({id,setBoxes,boxes}) => {
    const [value, onChange] = useState([new Date()]);
    const deleteWidgit=async()=>{
      const email=localStorage.getItem('email')
      const organization=localStorage.getItem('organization')
      const position=JSON.stringify(boxes.filter((box,index)=>index!=id))
  
      if(boxes.length===0)
      {
        await axios.post('http://localhost:8999/deletedashboard',{email:email,organization:organization})
        setBoxes([])
      }
      else{const response=await axios.post('http://localhost:8999/updatedashboard',{email:email,position:position,organization:organization})
      if(response.data.status==200)
      {
        setBoxes(boxes.filter((box,index)=>index!=id))
      }
    }
    }
  return (
    <div className='flex flex-col w-[100%] h-[100%]'>
      <div className='z-[10] cursor-pointer flex mt-3 mr-2 items-center justify-center w-[20px] rounded-xl h-[20px]  bg-gray-100 fixed right-[-2px] top-[-8px] ' onClick={deleteWidgit}>
              <RxCross2 size={14} className='text-black' />
        </div> 
        <div className='w-full h-full '>
          <Calendar
              className={`rounded-md shadow-md text-gray-600 h-full w-full`}
              onChange={onChange}
              
              value={value}
              // Optional: to ensure month/year navigation is visible
              next2Label={null}
              prev2Label={null}
              />
    </div>
    </div>
    
  )
}

export default CalendarWidgit