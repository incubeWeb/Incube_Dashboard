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
import ChatWidgit from '../Chat/ChatWidgit';
import Timeline from '../Timeline/Timeline';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';


const Dashboard = ({realtimeChat,investmentchange}) => {
  const [boxes, setBoxes] = useState([]);
  const [openChatbar,setopenChatbar]=useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [Useremail,setUseremail]=useState('')
  const [seeChats,setseeChats]=useState(true)
  const [seeUsers,setseeUsers]=useState(false)
  const [selectedField,setSelectedField]=useState('Chats')
  const [clickUserField,setClickedUserField]=useState(false)
  const [clickUseremail,setclickeduseremail]=useState('')
  const [chartDatatypeY,setchartDatatypeY]=useState('string')
  const [chartDatatypeX,setchartDatatypeX]=useState('string')

  const [chartDatatypeFromApiX,setchartDatatypeFromApiX]=useState([])
  const [chartDatatypeFromApiY,setchartDatatypeFromApiY]=useState([])
  
  const [clickedPie, setClickedPie] = useState(false);
  const [data01,setdata01]=useState([])
  const [piechartCount,setpiechartcount]=useState([])

  const [clickedArea,setClickedArea]=useState(false)
  const [areachartCount,setareachartcount]=useState([])

  const [barchartCount,setbarchartcount]=useState([])
  const [clickedBar,setClickedBar]=useState(false)

  const [chatwidgit,setchatwidgit]=useState(false)
  const [chatwidgitcount,setchatwidgitcount]=useState([])

  const [timelinewidget,settimelinewidgit]=useState(false)
  const [timelinewidgitcount,settimelinewidgitcount]=useState([])
  

  
  const [xAxis,setXaxis]=useState(0)
  const [yAxis,setYaxis]=useState(0)

  const [xAxisValues,setXaxisValues]=useState(Array(xAxis).fill(0))
  const [yAxisValues,setYaxisValues]=useState(Array(yAxis).fill(0))
  const [addingBox,setaddingBox]=useState(false)
  const [typeofChart,settypeofchart]=useState('')
  const [fromApi,setFromApi]=useState(false)
  const [isSheetchart,setisSheetChart]=useState(false)


  const [loading,setloading]=useState(true)
  

  const drawerRef=useRef(null)

  const chatRef=useRef(null)

  useEffect(()=>{
      const handleOpenChat=()=>{
        gsap.from(chatRef.current,{
          x:"200%",
          duration:0.5,
          ease:'power2.out'
    
        })
      }
      
   // console.log(openChatbar)
    if(openChatbar)
    {
      handleOpenChat()
    }
   
  },[openChatbar])

  

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
      const organization=localStorage.getItem('organization')
      let checkDb=await axios.post('http://localhost:8999/getDashboardData',{email:email,organization:organization})
     // console.log(checkDb)
      
      if(checkDb.data.status==200)
      {
        let val=JSON.parse(checkDb.data.data.positions)
        val.map((d)=>{
          const pievalue=d.piechartCount
          const areavalue=d.areachartCount
          const barvalue=d.barchartCount
          const chartXdatatype=d.chartDatatypeX
          const chartYdatatype=d.chartDatatypeY
          const isSheetChart=d.isSheetChart
          
          console.log(pievalue)
          setisSheetChart(isSheetChart)
          setchartDatatypeFromApiX(prev=>[...prev,{chartDatatypeX:chartXdatatype}])
          setchartDatatypeFromApiY(prev=>[...prev,{chartDatatypeY:chartYdatatype}])
          setpiechartcount(prev=>[...prev,{values:[pievalue]}])
          setareachartcount(prev=>[...prev,{values:[areavalue]}])
          setbarchartcount(prev=>[...prev,{values:[barvalue]}])
          }
        )
        setBoxes(val)
        setFromApi(true)
        
      }
      
    }
    checkBoxValues()
    setTimeout(()=>{  
      setloading(false)
    },1000)
    
  },[])


  useEffect(() => {
    const setBoxValues=async ()=>{
        const email=localStorage.getItem('email')
        const organization=localStorage.getItem('organization')
        localStorage.setItem(email,JSON.stringify(boxes))
        let position=JSON.stringify(boxes)
        
        if(boxes.length!=0)
        {
         await axios.post('http://localhost:8999/addDashboardData',{email:email,positions:position,organization:organization})
        }
    }
    setBoxValues()
    
  }, [boxes]);

  

  const addBox = (chartType) => {
      setaddingBox(!addingBox)
      //console.log(piechartCount)
      
    
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
    {
      loading ? (
        <div className='w-[100%]' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Bars color="#8884d8" height={80} width={80} />
          
        </div>
      ):
    <div className='w-[100%] h-[100%] flex flex-col'>
      <div className='flex flex-col w-[100%] h-[10%] items-start mt-[44px]'>
        <div
          className='flex flex-row w-[120px] h-[33px] rounded-md bg-gradient-to-r from-blue-600 to-blue-300 text-[14px] items-center justify-center text-white cursor-pointer'
          onClick={handleShowPopup}
        >
          <p>Widgets</p>
        </div>
      </div>
      <div className='w-[100%] flex flex-col items-center'>
        {boxes.map((box,index) => (
          <Rnd
            
            key={box.id}
            className='border-gray-300  border-[1px] rounded-lg p-4 pt-7'
            size={{ width: box.width, height: box.height }}
            position={{ x: box.x, y: box.y }}
            onDragStop={(e, direction) => setPosition(box.id, direction)}
            onResizeStop={(e, direction, ref, delta, position) => setSize(box.id, ref, position)}
            // Ensure the Rnd component stays within its parent container
          >
            {console.log("its is type os")}
            {(() => {
            try {
              switch (box.type) {
                case 'timeline':
                  return (
                    <Timeline/>
                  )
                case 'chat':
                  return (
                    <ChatWidgit id={box.id} realtimeChat={realtimeChat} Useremail={Useremail} handleSeeUsers={handleSeeUsers} setclickeduseremail={setclickeduseremail}/>
                  )
                case 'Areachart':
                  if (areachartCount.length > 0) {
                    return (
                      <Areachart
                        key={index}
                        id={index}
                        data01={areachartCount[[box.id]-1]['values']}
                        clickedArea={clickedArea}
                        setClickedArea={setClickedArea}
                        fromApi={fromApi}
                        setFromApi={setFromApi}
                        chartDatatypeX={chartDatatypeX}
                        chartDatatypeY={chartDatatypeY}
                        chartDatatypeFromApiX={chartDatatypeFromApiX[[box.id]-1]['chartDatatypeX']}
                        chartDatatypeFromApiY={chartDatatypeFromApiY[[box.id]-1]['chartDatatypeY']}
                        isSheetchart={isSheetchart}
                        investmentchange={investmentchange}
                        
                      />
                    );
                  } else {
                    return <div>No Areachart data available</div>;
                  }
                case 'Piechart':
                  if (piechartCount.length > 0) {
                    return (
                      <Piechart
                        key={index}
                        id={index}
                        data01={piechartCount[[box.id]-1]['values']}
                        clickedPie={clickedPie}
                        setClickedPie={setClickedPie}
                        fromApi={fromApi}
                        setFromApi={setFromApi}
                        chartDatatypeX={chartDatatypeX}
                        chartDatatypeY={chartDatatypeY}
                        chartDatatypeFromApiX={chartDatatypeFromApiX[[box.id]-1]['chartDatatypeX']}
                        chartDatatypeFromApiY={chartDatatypeFromApiY[[box.id]-1]['chartDatatypeY']}
                        isSheetchart={isSheetchart}
                        investmentchange={investmentchange}
                        
                        
                      />
                    );
                  } else {
                    return <div>No Piechart data available</div>;
                  }
                case 'BarChart':
                  if (barchartCount.length > 0) {
                    return (
                      <RenderBarChart
                        key={index}
                        id={index}
                        data01={barchartCount[[box.id]-1]['values']}
                        clickedBar={clickedBar}
                        setClickedBar={setClickedBar}
                        fromApi={fromApi}
                        setFromApi={setFromApi}
                        chartDatatypeX={chartDatatypeX}
                        chartDatatypeY={chartDatatypeY}
                        chartDatatypeFromApiX={chartDatatypeFromApiX[[box.id]-1]['chartDatatypeX']}
                        chartDatatypeFromApiY={chartDatatypeFromApiY[[box.id]-1]['chartDatatypeY']}
                        isSheetchart={isSheetchart}
                        investmentchange={investmentchange}
                      />
                    );
                  } else {
                    return <div>No Piechart data available</div>;
                  }
                default:
                  return <div>Unknown chart type</div>;
              }
            } catch (error) 
            {
              {window.location.reload()}
              return <div></div>;
            }
          })()}
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
          piechartCount={piechartCount}
          setpiechartcount={setpiechartcount}
          settypeofchart={settypeofchart}
          boxes={boxes}
          setBoxes={setBoxes}
          setShowPopup={setShowPopup}
          clickedArea={clickedArea}
          setClickedArea={setClickedArea}
          areachartCount={areachartCount}
          setareachartcount={setareachartcount}
          clickedBar={clickedBar}
          setClickedBar={setClickedBar}
          barchartCount={barchartCount}
          setbarchartcount={setbarchartcount}
          setchatwidgit={setchatwidgit}
          chatwidgit={chatwidgit}
          setchatwidgitcount={setchatwidgitcount}
          chatwidgitcount={chatwidgitcount}
          settimelinewidgit={settimelinewidgit}
          timelinewidget={timelinewidget}
          settimelinewidgitcount={settimelinewidgitcount}
          timelinewidgitcount={timelinewidgitcount}
          chartDatatypeY={chartDatatypeY}
          setchartDatatypeY={setchartDatatypeY}
          chartDatatypeX={chartDatatypeX}
          setchartDatatypeX={setchartDatatypeX}
          isSheetchart={isSheetchart}
          setisSheetChart={setisSheetChart}
        />
      )}
      </div>
    } 
     

    </div>
  );
};

export default Dashboard;
