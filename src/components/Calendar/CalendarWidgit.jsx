import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { RxCross2 } from "react-icons/rx";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { LuClock } from "react-icons/lu";


import { Space, TimePicker } from 'antd';
import { FaTrashAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Setting up moment as the localizer for react-big-calendar
const localizer = momentLocalizer(moment);



const CalendarWidgit = ({id,setBoxes,boxes,mygoogleaccountisconnected}) => {

  const token=localStorage.getItem('token')
  const userdata=jwtDecode(token)
  const Logemail=userdata.userdetails.email
  const Logorganization=userdata.userdetails.organization
  const Logrole=userdata.userdetails.role
  const [calendarview,setcalendarview]=useState('month');

  

  const [slottimestart,setslottimestart]=useState('');
  const [slottimeend,setslottimeend]=useState('');

  const [showsetEvent,setShowSetevent]=useState(false);
  const [newEventtitle, setNewEventtitle] = useState('');
  const [newEventdescription,setneweventdescription]=useState('')

  const [selecteddate,setselectedDate]=useState('')

  const [saveingooglecalendar,setsaveingooglecalendar]=useState(false)

  // Sample events
  const [events, setEvents] = useState([
    
  ]);

  useEffect(()=>{
    const setAllEventsfromdb=async()=>{
      const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/get-calendar-db`,{
        useremail:Logemail,
        organization:Logorganization,
        
      },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      if(response.data.status==200){
        if(response.data.data.length>0)
        {
          response.data.data.map(val=>{
            setEvents(prev=>[...prev,{title:val.title,start:JSON.parse(val.start),end:JSON.parse(val.end),allDay:val.allDay,fromgoogle:val.fromgoogle,Gid:""}])
          })
        }
      }
      else{
        alert('Check you internet connection')
      }
    }
    setAllEventsfromdb()
  },[])


  useEffect(()=>{
    const settingandgettingGoogleEvents=async()=>{
      const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-mycalender-details`,{
        email:Logemail,
        organization:Logorganization
      },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      if(response.data.status==200)
      {
        response.data.data.map(val=>{
          let start= new Date(val.start.dateTime);
          let end=new Date(val.end.dateTime)
          let description=val?.description || ""

          setEvents(prev=>[...prev,{
            Gid:val.id,
            fromgoogle:true,
            title:val.summary,
            description:description,
            start:start,
            end:end,
            allDay:false

          }])
        })
      }

    }
    if(mygoogleaccountisconnected)
    {
      settingandgettingGoogleEvents()
    }
  },[])

  useEffect(()=>{
    const settingandgettingGoogleEvents=async()=>{
      const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-mycalender-details`,{
        email:Logemail,
        organization:Logorganization
      },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      if(response.data.status==200)
      {
        response.data.data.map(val=>{
          let start= new Date(val.start.dateTime);
          let end=new Date(val.end.dateTime)
          let description=val?.description || ""

          setEvents(prev=>[...prev,{
            Gid:val.id,
            fromgoogle:true,
            title:val.summary,
            description:description,
            start:start,
            end:end,
            allDay:false

          }])
        })
      }

    }
    if(mygoogleaccountisconnected)
    {
    settingandgettingGoogleEvents()
    }else{
      setEvents(events.filter((e,index)=>e.fromgoogle!=true))
    }
  },[mygoogleaccountisconnected])

  
  const handleSelectSlot = (slotInfo) => {
   
    

    if(calendarview=='day' || calendarview=='week')
    {
      setslottimestart(slotInfo.start)
   
      setslottimeend(slotInfo.end)
  
      
      setShowSetevent(true);
    }
    
  };

  // Function to handle event submission
  const handleAddEvent = async() => {
    
    if(newEventtitle.trim().length==0){
      alert("title is empty")
    }
    else{

      if(saveingooglecalendar){
        const startDateTime=JSON.stringify(slottimestart)
        const endDateTime=JSON.stringify(slottimeend)

        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/create-google-calendar-event`,{
          email:Logemail,
          organization:Logorganization,
          startDateTime:startDateTime,
          endDateTime:endDateTime,
          summary:newEventtitle,
          description:newEventdescription

        },{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        

        if(response.data.status==200){
          setEvents((prevEvents) => [...prevEvents, {
            title: newEventtitle,
            description:newEventdescription,
            fromgoogle:true,
            start: slottimestart,
            end: slottimeend,
          }]);
          setShowSetevent(false);
          setneweventdescription('')
          setNewEventtitle('')
        }
        else if(response.data.status==400, response.data.message=="Invalid Refresh token")
        {
          alert("User Not connected to google")
        }
      }
      else{
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/add-calendar-db`,{
          useremail:Logemail,
          organization:Logorganization,
          start:JSON.stringify(slottimestart),
          end:JSON.stringify(slottimeend),
          title:newEventtitle,
        },{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        if(response.data.status==200){
          setEvents((prevEvents) => [...prevEvents, {
            title: newEventtitle,
            description:'',
            Gid:"",
            fromgoogle:false,
            start: slottimestart,
            end: slottimeend,
          }]);
        }
        else{
          alert('Check you internet connection')
        }
      setShowSetevent(false);
      setneweventdescription('')
      setNewEventtitle('')
    }
    }
  };

  const deleteWidgit=async()=>{
    const email=Logemail
    const organization=Logorganization
    const position=JSON.stringify(boxes.filter((box,index)=>index!=id))

    if(boxes.length===0)
    {
      await axios.post(`${import.meta.env.VITE_HOST_URL}8999/deletedashboard`,{email:email,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      setBoxes([])
    }
    else{const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updatedashboard`,{email:email,position:position,organization:organization},{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
    if(response.data.status==200)
    {
      setBoxes(boxes.filter((box,index)=>index!=id))
     
      
    }
  }
  }

  const TimeConversion=(time)=>{

    const date = new Date(time);
  

    // Convert to a readable date and time

    const readableTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return readableTime
  }

  const DateConversion=(time)=>{
    const date = new Date(time);
    const readableDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return readableDate;
  }

  function convertTo24Hour(time12h) {
    // Extract hours, minutes, seconds, and period (AM/PM)
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes, seconds] = time.split(":").map(Number);

    // Convert to 24-hour format
    if (modifier === "PM" && hours !== 12) {
        hours += 12;
    } else if (modifier === "AM" && hours === 12) {
        hours = 0;
    }

    // Format the result as HH:MM:SS in 24-hour format
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

  const onChange = (time, timeString) => {
    //console.log(time, timeString);
      const originalDate = new Date(slottimestart);
     
   let convertedTime24=convertTo24Hour(timeString);
   let Timearray=convertedTime24.split(':')
    // Desired time (02:02:00 PM)
    const hours = Timearray[0] // 2 PM in 24-hour format
    const minutes = Timearray[1];
    const seconds = Timearray[2];

    // Create a new date object with the same date
    const updatedDate = new Date(originalDate);

    // Set the time in the new date object
    updatedDate.setHours(hours, minutes, seconds);
    
    console.log("datepart",updatedDate)

    
    setslottimestart(updatedDate)
  };

  const onChange2 = (time, timeString) => {
   // console.log(time, timeString);
    
   const originalDate = new Date(slottimeend);
   console.log(originalDate,"originaldate")
   let convertedTime24=convertTo24Hour(timeString);
   let Timearray=convertedTime24.split(':')
    // Desired time (02:02:00 PM)
    const hours = Timearray[0] // 2 PM in 24-hour format
    const minutes = Timearray[1];
    const seconds = Timearray[2];

    // Create a new date object with the same date
    const updatedDate = new Date(originalDate);

    // Set the time in the new date object
    updatedDate.setHours(hours, minutes, seconds);
    
    console.log("datepart",updatedDate)

    
    setslottimeend(updatedDate)
  };

  

  // Handler to delete an event by ID
  const handleDeleteEvent = async(eventstart,eventend,Gid) => {
    if(Gid.length>0)
    {
      handleDeleteGoogleEvent(Gid)
    }
    else{
      //call delete api
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/delete-calendar-eventdb`,{
          useremail:Logemail,
          organization:Logorganization,
          start:JSON.stringify(eventstart),
          end:JSON.stringify(eventend),
          

        },{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })

        if(response.data.status==200)
        {
          setEvents((prevEvents) =>
            prevEvents.filter(
              (event) => JSON.stringify(event.start) !== JSON.stringify(eventstart) && JSON.stringify(event.end) !== JSON.stringify(eventend)
            )
          );
        }else{
          alert("Try again!")
        }
      
      
  }
    
  };
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formPosition, setFormPosition] = useState({ top: 0, left: 0 });
  const [isEditing,setIsEditing]=useState(false)
  const [newEvent, setNewEvent] = useState({ title: "",description:"", start: null, end: null, Gid:"" });


  useEffect(()=>{
    console.log(newEvent)
  },[newEvent])

  const handleSelectEvent = (event, e) => {
    setFormPosition({ top: e.clientY, left: e.clientX });
    setCurrentEvent(event); // Set the event to be edited
    console.log(event)
    
    setNewEvent({ title: event.title,description:event.description ,start: event.start, end: event.end,Gid:event.Gid });
    setIsEditing(true);
  };

  const [showediteventoption,setshowediteventoption]=useState(false);
  
  const handleDeleteGoogleEvent=async(calendarid)=>{
    console.log(calendarid)
    const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/delete-calendar-event`,{
      email:Logemail,
      organization:Logorganization,
      calendarevent_id:calendarid
    },{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    })
    if(response.data.status==200){
      setEvents((prevEvents) =>
        prevEvents.filter(
          (event) => calendarid !== event.Gid
        )
      );
    }
  }
 
  // Custom Event Component with Delete Button
  const EventWithDelete = ({ event }) => (
    <div className="text-[14px] relative"  style={{ display: "flex", alignItems: "center" }}>
      <div onMouseDown={(e)=>{handleSelectEvent(event,e)}} className="flex flex-row cursor-pointer items-center justify-center">
      {event.fromgoogle?
      <div >
          <div  className="w-[10px] h-[10px] mr-2 rounded-full bg-green-500"></div>
      </div>
      :<></>}
      <span  className="h-[100%] cursor-pointer w-[90%]">{calendarview=='month'?event.title.substring(0,4)+"..":event.title}</span>
      </div>
      {
        calendarview!='month'?
        <button
        onMouseDown={(e)=>{handleDeleteEvent(event.start,event.end,event.Gid,event.fromgoogle);setshowediteventoption(false)}}
        style={{
          
          border: "none",
          
          cursor: "pointer",
          marginLeft: "5px",
          
        }}
        className="text-red-400 absolute right-0"
      >
        <MdDelete />
        </button>
        :
        <></>
      }
      
    </div>
  );

  const eventFormStyle = {
    position: "absolute",
    backgroundColor: "white",
    padding: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    zIndex: 100,
  };
  const handleSubmitEvent = async(Gid,starttime,endtime,summary,description) => {
    if (currentEvent) {
      if(Gid.length>0){
        const startDateTime=JSON.stringify(starttime)
        const endDateTime=JSON.stringify(endtime)
        
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/edit-google-calendar-event`,{
          email:Logemail,
          organization:Logorganization,
          startDateTime:startDateTime,
          endDateTime:endDateTime,
          summary:summary,
          description:description,
          calendarevent_id:Gid

        },{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        if(response.data.status==200)
        {
          setEvents(events.map((evt) => (evt === currentEvent ? { ...evt, title: newEvent.title,description:newEvent.description } : evt)));
        }
        else if(response.data.status==400, response.data.message=="Invalid Refresh token")
        {
          alert("User Not connected to google")
        }
      }else{

        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/add-calendar-db`,{
          useremail:Logemail,
          organization:Logorganization,
          start:JSON.stringify(newEvent.start),
          end:JSON.stringify(newEvent.end),
          title:newEvent.title,
        },{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        if(response.data.status==200){
          setEvents(events.map((evt) => (evt === currentEvent ? { ...evt, title: newEvent.title } : evt)));
        }
        else{
          alert('Check you internet connection')
        }
      // Edit existing event
      
      }
    } else {
      // Add new event
      //setEvents([...events, newEvent]);
      alert('no event found')
    }
    setIsEditing(false);
  };

  return (
    <div style={{ height: "100%",}} className="font-inter">
      <Calendar
      selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        onView={(view) => setcalendarview(view)} // Update current view
        style={{ height: "100%", padding: "10px" }}
        onSelectSlot={handleSelectSlot} // Handle slot selection for adding events
        
        components={{
          event: EventWithDelete, // Use the custom event component
        }}
      />
      
      {
        showsetEvent?
        <div className="event-form z-[10] w-[50%] fixed right-0 h-[100%] flex flex-col item-center pt-[16%] pl-[4%] p-3 bg-white shadow-md top-0" >
          <div className="w-[100%] h-[100%] flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Add Title"
              value={newEventtitle}
              onChange={(e) => setNewEventtitle(e.target.value)}
              className="w-[100%] h-[10%]  pl-2 border-gray-300 border-[1px] rounded-md text-[14px]"

            />
            {
            saveingooglecalendar?
              <div className="w-[100%] h-[16%] flex flex-col">
              <textarea
                type="text"
                placeholder="Add Description"
                value={newEventdescription}
                onChange={(e) => setneweventdescription(e.target.value)}
                className="w-[100%] h-[100%]  pl-2 border-gray-300 border-[1px] rounded-md text-[14px]"
              />
            </div>
            :
            <></>
            }
            <div className="flex flex-row items-center space-x-2">
              <div className="w-[15px] h-[15px]">
                <LuClock size={15}/>
              </div>
              <div className="flex flex-col w-[100%] space-y-2">
                  
                  <Space wrap >
                      <b><TimePicker use12Hours placeholder={TimeConversion(slottimestart)}  onChange={onChange} /></b>
                    </Space>
                  
                  
                    <Space wrap className="w-[100%]">
                      <b><TimePicker use12Hours placeholder={TimeConversion(slottimeend)} onChange={onChange2} /></b>
                    </Space>
                  
              </div>
          </div>
          <div className="flex flex-row space-x-2">
            <input type="checkbox" value={saveingooglecalendar} onClick={()=>setsaveingooglecalendar(!saveingooglecalendar)}/>
            <p className="text-[14px] text-gray-600">Save in Google Calendar</p>
          </div>
          </div>
          
          <div className="flex flex-row space-x-2 absolute bottom-10">
            <button onClick={handleAddEvent} className="bg-blue-500 text-white text-[14px] h-[34px] p-3 flex items-center rounded-md">Add Event</button>
            <button onClick={() => setShowSetevent(false)} className="bg-red-500 text-white text-[14px] h-[34px] p-3 flex items-center rounded-md">Cancel</button>
          </div>
        </div>
        :
        <></>
      }

      {isEditing&&(
        <div className="event-form z-[10] space-y-7 w-[50%] fixed right-0 h-[100%] flex flex-col item-center pt-[16%] pl-[4%] p-3 bg-white shadow-md top-0" >
        <div className="w-[100%] h-[100%] space-y-2 flex flex-col">
          <input
            type="text"
            placeholder="Add Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-[100%] h-[35px]  pl-2 border-gray-300 border-[1px] rounded-md text-[14px]"
          />
          {
            newEvent.Gid.length>0?
            <div className="w-[100%] h-[60%] flex flex-col">
              <textarea
                type="text"
                placeholder="Add Description"
                value={newEvent.description}
                onChange={(e) => {setneweventdescription(e.target.value);setNewEvent({ ...newEvent, description: e.target.value })}}
                className="w-[100%] h-[100%]  pl-2 border-gray-300 border-[1px] rounded-md text-[14px]"
              />
            </div>
            :
            <></>
          }
        </div>
          <div className="flex flex-row space-x-2 absolute bottom-10">
            <button onClick={()=>handleSubmitEvent(newEvent.Gid,newEvent.start,newEvent.end,newEvent.title,newEvent.description)} className="bg-blue-500 text-white text-[14px] h-[34px] p-3 flex items-center rounded-md">Update Event</button>
            <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white text-[14px] h-[34px] p-3 flex items-center rounded-md">Cancel</button>
            <button
          onMouseDown={(e)=>{handleDeleteEvent(newEvent.start,newEvent.end,newEvent.Gid,newEvent.fromgoogle);setshowediteventoption(false);setIsEditing(false)}}
          style={{
            background: "transparent",
            border: "none",
            
            cursor: "pointer",
            marginLeft: "5px",
            
          }}
          className="text-red-400"
        >
          <MdDelete size={25} />
        </button>
         
        </div>
      </div>
      )

      }

        <div className='z-[10] cursor-pointer flex items-center justify-center w-[20px] rounded-xl h-[20px]  bg-gray-100 fixed right-[-2px] top-[-8px] ' onClick={deleteWidgit}>
              <RxCross2 size={14} className='text-black' />
        </div> 
    </div>
  );
};

export default CalendarWidgit;
