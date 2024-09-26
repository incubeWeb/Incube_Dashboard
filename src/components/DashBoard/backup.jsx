import React, { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import RenderBarChart from '../Charts/RenderBarChart';
import Piechart from '../Charts/Piechart';
import Areachart from '../Charts/Areachart';
import ChartPopup from '../Charts/ChartPopup';
import axios from 'axios';
import { FiSearch } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import {gsap} from 'gsap'
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { BiSolidError } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import DashBoardSingleUserChat from '../Chat/DashBoardSingleUserChat';


const Dashboard = () => {
  const [boxes, setBoxes] = useState([]);
  const [openChatbar,setopenChatbar]=useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [Useremail,setUseremail]=useState('')
  const [seeChats,setseeChats]=useState(true)
  const [seeUsers,setseeUsers]=useState(false)
  const [selectedField,setSelectedField]=useState('Chats')
  const [clickUserField,setClickedUserField]=useState(false)
  const [clickUseremail,setclickeduseremail]=useState('')

  const [searchUser,setSearchUser]=useState('')
  
  const [clickedPie, setClickedPie] = useState(false);
  const [data01,setdata01]=useState([])

  
  const [xAxis,setXaxis]=useState(0)
  const [yAxis,setYaxis]=useState(0)

  const [xAxisValues,setXaxisValues]=useState(Array(xAxis).fill(0))
  const [yAxisValues,setYaxisValues]=useState(Array(yAxis).fill(0))


  const [users,setUsers]=useState([])

  const drawerRef=useRef(null)

  const chatRef=useRef(null)


  useEffect(()=>{
    const fun=async()=>{
      const response=await axios.post('http://localhost:8999/findUsers',{
        user:searchUser
      })
      const users=response.data.data
     
      setUsers(users)
    }
    fun()
  },[searchUser])

  useEffect(()=>{
      const handleOpenChat=()=>{
        gsap.from(chatRef.current,{
          x:"200%",
          duration:0.5,
          ease:'power2.out'
    
        })
      }
      
    
    if(openChatbar)
    {
      handleOpenChat()
    }
   
  },[openChatbar])

  const handleSearchUser=(e)=>{
    setSearchUser(e.target.value)
  }

  const handleOpenchatbar=()=>{
   

    gsap.to(chatRef.current,{
      x:"200%",
      duration:"0.4",
      ease:'power2.out',
      onComplete:()=>{
        setopenChatbar(!openChatbar)
      }
    })
    
  }

  const handleSeeUsers=()=>{
    gsap.to(drawerRef.current,{
      x:"85%",
      duration:0.4,
      ease:'power2.out',
      onComplete:()=>{
        setseeUsers(true)
        setseeChats(false)
        setSelectedField('Users')
      }
    })  
  }

  useEffect(()=>{
    const email=localStorage.getItem('email')
    setUseremail(email)
  },[])

  useEffect(()=>{
    const checkBoxValues=async()=>{
  
      let email=localStorage.getItem('email')
      let checkDb=await axios.post('http://localhost:8999/getDashboardData',{email:email})
    
      if(checkDb.data.status==200)
      {
        let val=JSON.parse(checkDb.data.data.positions)
        setBoxes(val)
      }
    }
    checkBoxValues()
  },[])

  useEffect(() => {
    const setBoxValues=async ()=>{
        const email=localStorage.getItem('email')
        localStorage.setItem(email,JSON.stringify(boxes))
        let position=JSON.stringify(boxes)
        if(boxes.length!=0)
        {
         await axios.post('http://localhost:8999/addDashboardData',{email:email,positions:position})
        }
    }
    setBoxValues()
  }, [boxes]);

  const addBox = (chartType) => {
    // Calculate the next position based on the last box
    const lastBox = boxes[boxes.length - 1];
    const newBox = {
      id: lastBox ? lastBox.id + 1 : 1,
      width: '40%',
      height: '230px',
      x: 10,
      y: (lastBox ? lastBox.y + parseInt(lastBox.height) + 10 : 10) // Add some space below the last box
    };
    setBoxes([...boxes, { ...newBox, type: chartType }]);
    setShowPopup(false);
  };

  const setPosition = (id, direction) => {
    setBoxes(boxes.map(box =>
      box.id === id ? { ...box, x: direction.x, y: direction.y } : box
    ));
  };

  const setSize = (id, ref, position) => {
    setBoxes(boxes.map(box =>
      box.id === id ? {
        ...box,
        height: ref.style.height,
        width: ref.style.width,
        ...position
      } : box
    ));
  };

  const handleShowPopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className='w-[80%] ml-[20%] space-x-4 flex flex-row h-screen p-[44px] pr-0 pt-0 pb-0 font-roboto'>
    <div className='w-[70%] h-[100%] flex flex-col'>
      <div className='flex flex-col w-[100%] h-[10%] items-start mt-[44px]'>
        <div
          className='flex flex-row w-[120px] h-[33px] rounded-md bg-gradient-to-r from-blue-600 to-blue-300 text-[14px] items-center justify-center text-white cursor-pointer'
          onClick={handleShowPopup}
        >
          <p>Widgets</p>
        </div>
      </div>
      <div className='w-[100%] flex flex-col items-center'>
        {boxes.map(box => (
          <Rnd
            key={box.id}
            className='border-gray-700 shadow-md border-[1px] rounded-lg p-4 pt-7'
            size={{ width: box.width, height: box.height }}
            position={{ x: box.x, y: box.y }}
            onDragStop={(e, direction) => setPosition(box.id, direction)}
            onResizeStop={(e, direction, ref, delta, position) => setSize(box.id, ref, position)}
            // Ensure the Rnd component stays within its parent container
          >
            {box.type === 'Areachart' && <Areachart />}
            {box.type === 'Piechart' && <Piechart data01={data01} clickedPie={clickedPie} setClickedPie={setClickedPie}/>}
            {box.type === 'BarChart' && <RenderBarChart />}
          </Rnd>
        ))}
      </div>
      {showPopup && (
        <ChartPopup
          showlist={handleShowPopup}
          addComponent={addBox}
          xAxisValues={xAxisValues}
          setXaxisValues={setXaxisValues}
          yAxisValues={yAxisValues}
          setYaxisValues={setYaxisValues}
          xAxis={xAxis}
          yAxis={yAxis}
          setXaxis={setXaxis}
          setYaxis={setYaxis}
          clickedPie={clickedPie}
          setClickedPie={setClickedPie}
          data01={data01}
          setdata01={setdata01}
        />
      )}
      </div>
      <div className='fixed right-0 bg-white space-y-2 font-roboto shadow-gray-400 w-[25%] p-[45px] h-[100%] border-gray-300 border-[1px] shadow-md rounded-md flex flex-col'>
          <div className='shadow-md rounded-md w-[100%] h-[10%] border-gray-300 border-[1px] p-4 flex flex-row space-x-2 items-center justify-start'>
              <div><FiSearch className='text-gray-400' /></div>
              <input className='w-[100%] h-[100%] outline-none text-gray-700 text-[14px] ' placeholder='Search' onChange={(e)=>handleSearchUser(e)}/>
          </div>
          <div className='flex flex-row space-x-4 w-[100%] h-[10%] text-gray-700 font-roboto items-center justify-start'>
              <div className='flex items-center text-gray-700'><FaCircleUser size={20} /></div>
              <div><p className='text-[14px]'>{Useremail}</p></div>
          </div>
          <div className='relative space-x-4 bg-gray-300 rounded-md flex flex-row items-center justify-center  w-[100%] h-[10%] '>
                
                <div className='cursor-pointer h-[65%] bg-gray-300 text-white flex items-center justify-center w-[50%] border-gray-300 border-[1px] rounded-md' onClick={handleSeeUsers}>
                      <p className='text-[13px] text-gray-700'>Users</p>
                </div>
          </div>  
          <div className='overflow-y-auto flex w-[100%] h-[100%] flex-row items-center justify-center '>
            {
              users.length==0?
              <div className='flex flex-row w-[100%] h-[100%] items-center justify-center text-gray-700 space-x-4'>
                <BiSolidError size={20}/>
                <p className='text-[14px]'>No Users</p>
              </div>
              :
              users.length>0?
              <div className=' bg-white flex pt-[0px] mt-[-40px] flex-col w-[100%] h-[385px] text-gray-700 space-y-1 overflow-y-auto scrollbar-hide'>
               
              {
                users.map(user=>
               
                user.email!=localStorage.getItem('email')
                    ?
                   <div key={user._id} onClick={()=>setclickeduseremail(user.email)} className=' h-[60px] w-[100%] flex flex-row' >
                      <div onClick={handleOpenchatbar}  className=' cursor-pointer h-[100%] w-[100%] border-[1px] rounded-md shadow-sm shadow-gray-300 border-gray-300 flex flex-row'>
                        <div className='h-[100%] w-[30%] flex items-center justify-center'>
                            <img src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" className='w-[70%] h-[60%] object-contain rounded-[20%]'/>
                        </div>
                        <div className='h-[100%] w-[50%] flex items-center justify-start'>
                              <p className='text-[13px] lowercase'>{user.email}</p>
                        </div>
                        <div className='w-[20%] flex items-center justify-center'>
                          <IoChatboxEllipsesOutline />
                        </div>
                    </div>
                    
                   </div>
                  
                  :<></>

                
                )
                
              }

              </div>:<></>
            }
          </div>
      </div>
     { openChatbar?
      <div ref={chatRef} className='fixed flex flex-col w-[430px] h-[90%] rounded-md top-[5%] z-50 right-[23%] bg-white border-gray-300 border-[1px] shadow-lg shadow-gray-400'>
                    <div className=' shadow-md border-gray-300 border-b-[1px] w-[100%] h-[10%] flex items-center p-[24px] justify-end flex-row' >
                      <div className='flex flex-row w-[90%] h-[100%]'>
                            <p className='text-[15px] text-gray-500'>{clickUseremail}</p>
                      </div>
                      <RxCross2 size={20} className='text-gray-600 cursor-pointer' onClick={handleOpenchatbar}/>
                      
                    </div>
                    <div className='w-[100%] h-[90%] '>
                      <DashBoardSingleUserChat receiver={clickUseremail} clickUserField={clickUseremail} openChatbar={openChatbar}/>
                    </div>
            </div>
            :
            <></>
     }

    </div>
  );
};

export default Dashboard;
