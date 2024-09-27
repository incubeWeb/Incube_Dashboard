import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import '../../../node_modules/react-calendar/dist/Calendar.css'; 
import { CiCalendar } from "react-icons/ci";
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
const CalendarWidgit = ({id,setBoxes,boxes}) => {
    const [value, onChange] = useState([new Date()]);
    const [calid,setcalid]=useState('')
    const [caltimezone,setcaltimezone]=useState('')
    const [googlelogincheck,setgooglelogincheck]=useState(false)
    const [loading,setloading]=useState(true)

    useEffect(()=>
    {
      const setCalender=async()=>{
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-mycalender-details`,{email:localStorage.getItem('email'),organization:localStorage.getItem('organization')})
        console.log(response)
        if(response.data.status==200 && typeof(response.data.message)=='undefined')
        {
          setcalid(response.data.calId)
          setcaltimezone(response.data.calTimezone)
        }
      }
      if(googlelogincheck)
      {
        setCalender()
      }
      setTimeout(()=>{
        setloading(false)
      },1000)
    },[googlelogincheck])

    useEffect(()=>{
      const checkgooglelogin=async()=>{
          const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/check-login-google`,{email:localStorage.getItem('email'),organization:localStorage.getItem('organization')})
          if(response.data.status==200)
          {
            setgooglelogincheck(true)
          }
          else{
            setgooglelogincheck(false)
          }
      }
      checkgooglelogin()
      
    },[])

    const deleteWidgit=async()=>{
      const email=localStorage.getItem('email')
      const organization=localStorage.getItem('organization')
      const position=JSON.stringify(boxes.filter((box,index)=>index!=id))
  
      if(boxes.length===0)
      {
        await axios.post(`${import.meta.env.VITE_HOST_URL}8999/deletedashboard`,{email:email,organization:organization})
        setBoxes([])
      }
      else{const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updatedashboard`,{email:email,position:position,organization:organization})
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
       <div className='w-[100%] h-[100%]'>
        {
          loading?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Bars color="#8884d8" height={50} width={100} />
              </div>
            :
            <iframe
            src={`https://calendar.google.com/calendar/embed?src=${calid}&ctz=${caltimezone}`}
            style={{ border: 0 }}
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            className='h-[100%] w-[100%]'
          ></iframe>
        }
          
       </div>
    </div>
    
  )
}

export default CalendarWidgit