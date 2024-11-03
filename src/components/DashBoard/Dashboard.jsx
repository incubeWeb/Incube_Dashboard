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
import Portfoliocard from '../Charts/Portfoliocard';
import NewsWidgit from '../News_widgit/NewsWidgit';
import { FaPlus } from "react-icons/fa6";
import AssignedDeals from '../AssignedDeals/AssignedDeals';
import OpenGrid from '../OpenGridTemplate/OpenGrid';
import OpenCompleteGrid from '../OpenGridTemplate/OpenCompleteGrid';
import OpenUnassignedGrid from '../OpenGridTemplate/OpenUnassignedGrid';
import CalendarWidgit from '../Calendar/CalendarWidgit';
import { jwtDecode } from 'jwt-decode';

import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);


const Dashboard = ({boxes, setBoxes,handlePlusClick,setshowvalue,showValue,setsheetpopup,mygoogleaccountisconnected,setdealpipelinefromdashboardcompany,navbarref,showsmallnav,realtimetimeline,setActiveField,realtimetabchats,realtimedealpipelinecompanyInfo,realtimeChat,investmentchange,hidenavbar}) => {
  
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
  const [companyName,setCompanyName]=useState('')
  const [companyDiscription,setcompanyDiscription]=useState('')
  const [status,setstatus]=useState('')
  const [TeamLead_status,setTeamLead_status]=useState('')
  const [completed,setcompleted]=useState('')

  const token=localStorage.getItem('token')
  const userdata=jwtDecode(token)
  const Logemail=userdata.userdetails.email
  const Logorganization=userdata.userdetails.organization
  const Logrole=userdata.userdetails.role


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
  
  const [portfoliocardwidgit,setportfoliocardwidgit]=useState(false)
  const [portfoliocardwidgitcount,setportfoliocardwidgitcount]=useState([])
  
  const [xAxis,setXaxis]=useState(0)
  const [yAxis,setYaxis]=useState(0)

  const [xAxisValues,setXaxisValues]=useState(Array(xAxis).fill(0))
  const [yAxisValues,setYaxisValues]=useState(Array(yAxis).fill(0))
  const [addingBox,setaddingBox]=useState(false)
  const [typeofChart,settypeofchart]=useState('')
  const [fromApi,setFromApi]=useState(false)
  const [isSheetchart,setisSheetChart]=useState(false)
  const [capturingPortfoliowidgitvalues,setcapturingPortfoliowidgitvalues]=useState([])
  
  const [assigneddealclicked,setassigneddealclicked]=useState(false)

  const [retry,setretry]=useState(false)
  const [loading,setloading]=useState(true)
  
  const drawerRef=useRef(null)

  const chatRef=useRef(null)
  const blockerRef=useRef(null)
  const rndRef=useRef(null)
  
  const cardData = [
    { id: 1, name: 'Card One' },
    { id: 2, name: 'Card Two' },
    { id: 3, name: 'Card Three' },
    // This array can grow infinitely
  ];


  const Navigate=useNavigate()
  const handleOpenGrid=async()=>{
    
    setassigneddealclicked(!assigneddealclicked)
    localStorage.setItem('activeField','/dealpipeline')
    setActiveField('/dealpipeline')
    
    Navigate('/dealpipeline')
    
}

const dashboardwidgitref=useRef(null)
const addwidgitref=useRef(null)

useEffect(() => {
  
  

  if(!hidenavbar){
    
    gsap.to(dashboardwidgitref.current,{
      paddingLeft:"21%"
    })
    gsap.to(addwidgitref.current,{
      width:"130px"
    })
    
  }else{
    gsap.to(dashboardwidgitref.current,{
      paddingLeft:"4%"
    }) 
    gsap.to(addwidgitref.current,{
      width:"177px"
    })
      
  }
}, [hidenavbar,loading]);





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

  useEffect(()=>{
    const mergedData=[
     
      ...data01,
   
   
    ]
    sessionStorage.setItem("Bot_Data",JSON.stringify(mergedData))
  },[data01])
  
  

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
  const handleretry=()=>{
    setretry(!retry)
  }

  useEffect(()=>{
    const email=Logemail
    setUseremail(email)
  },[])

  useEffect(()=>{
    const checkBoxValues=async()=>{
      
      let email=Logemail
      const organization=Logorganization
      let checkDb=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDashboardData`,{email:email,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })

      

      
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
          const portfoliowidgit=d.portfoliowidgitcount || []
          setisSheetChart(isSheetChart)
          setchartDatatypeFromApiX(prev=>[...prev,{chartDatatypeX:chartXdatatype}])
          setchartDatatypeFromApiY(prev=>[...prev,{chartDatatypeY:chartYdatatype}])
          setpiechartcount(prev=>[...prev,{values:[pievalue]}])
          setareachartcount(prev=>[...prev,{values:[areavalue]}])
          setbarchartcount(prev=>[...prev,{values:[barvalue]}])
          setcapturingPortfoliowidgitvalues(prev=>[...prev,{portfoliowidgit}])
          
          }
        )
        setBoxes(val)
        setFromApi(true)
        
      }
      setTimeout(()=>{  
        setloading(false)
      },1000)
    }
   try{
    checkBoxValues()
    
   }catch(e){
    checkBoxValues()
   }
    
  },[])

  useEffect(()=>{
    const checkBoxValues=async()=>{
      
      let email=Logemail
      const organization=Logorganization
      let checkDb=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getDashboardData`,{email:email,organization:organization},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      
      })
      

      
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
          const portfoliowidgit=d.portfoliowidgitcount || []
      
          setisSheetChart(isSheetChart)
          setchartDatatypeFromApiX(prev=>[...prev,{chartDatatypeX:chartXdatatype}])
          setchartDatatypeFromApiY(prev=>[...prev,{chartDatatypeY:chartYdatatype}])
          setpiechartcount(prev=>[...prev,{values:[pievalue]}])
          setareachartcount(prev=>[...prev,{values:[areavalue]}])
          setbarchartcount(prev=>[...prev,{values:[barvalue]}])
          setcapturingPortfoliowidgitvalues(prev=>[...prev,{portfoliowidgit}])
          
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
    
  },[retry])
  



  useEffect(() => {
    const setBoxValues=async ()=>{
        const email=Logemail
        const organization=Logorganization
        
        let position=JSON.stringify(boxes)


        if(boxes.length>0)
        {
          await axios.post(`${import.meta.env.VITE_HOST_URL}8999/addDashboardData`,{email:email,positions:position,organization:organization},{
            headers:{
             "Authorization":`Bearer ${token}`
            }
          })
        }
       
        
    }
   
    setBoxValues()
    
   
    
  }, [boxes]);

  useEffect(()=>{
  
    
      setBoxes(prev=>
      prev.map(b=>
        b.id===portfoliocardwidgitcount.id
        ? { ...b, portfoliowidgitcount: {id:portfoliocardwidgitcount.id,labelname:portfoliocardwidgitcount.labelname,showValue:portfoliocardwidgitcount.showValue,portfolioicon:portfoliocardwidgitcount.portfolioicon,currencyValue:portfoliocardwidgitcount.currencyValue} } 
        : b
      )
      )
    
  },[portfoliocardwidgitcount])
  

  const addBox = (chartType) => {
      setaddingBox(!addingBox)
   
      
    
  };
  


  const setPosition = (id, direction) => {
    
    
    if(parseInt(direction.y)<-10){
      direction.y=0
    }
    if(parseInt(direction.x)<parseInt(window.innerWidth/1.5)-0)
    {
      
      setBoxes(boxes.map(box =>
        box.id === id ? { ...box, x: direction.x, y: direction.y } : box
      ));
    }
    else{
      setBoxes(boxes.map(box =>
        box.id === id ? { ...box, x: 600, y: direction.y } : box
      ));
    }
  };

  const updateLayoutItem = (updatedItem) => {
    console.log(updatedItem.i,"id")
    const updatedLayouts = boxes.map((item) => {
      
      if (item.id === parseInt(updatedItem.i)) {
       
        return {
          ...item, // Preserve other properties
          x: updatedItem.x,
          y: updatedItem.y,
          w: updatedItem.w,
          h: updatedItem.h,
        };
      }
      return item;
    });
    setBoxes(updatedLayouts);
  };


  const onResizeStop = (layout, oldItem, newItem) => {
    console.log("Resized:", newItem);
    updateLayoutItem(newItem); // Only update x, y, w, h
  };

  // Callback for when the drag event ends
  const onDragStop = (layout, oldItem, newItem) => {
    updateLayoutItem(newItem); // Only update x, y, w, h
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
  //{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 } cols
  //{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 } brekpoints
  const breakpoints={ lg: 992, md: 768, sm: 576, xs: 0 }
  const cols={ lg: 12, md: 10, sm: 6, xs: 4, }
  return (
    
    <div className={`w-[100%] h-screen bg-white space-x-4 flex flex-row   font-roboto`}>
    
    {
      loading ? (
        <div className={`${hidenavbar? 'w-[100%] h-screen':'ml-[20%] w-[100%] h-screen'}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <Bars color="#8884d8" height={80} width={80} />
          
        </div>
      ):
      
    <div className='w-[100%] h-[100%] flex flex-col  '>
      <div  className='w-[100%] h-[7%] flex flex-col items-end pr-4 justify-end'>
        <div
        ref={addwidgitref}
          className=' z-[50] flex flex-row w-[130px] h-[33px] rounded-md bg-blue-600  text-[14px] items-center justify-center text-white cursor-pointer'
          onClick={handleShowPopup}
        >
          <p> <span className='text-[20px] font-bold'>+</span>  Add widgets</p>
        </div>
      </div>

    <div className=' flex flex-col w-[100%] h-[0%] items-end '>
    
</div>
      <div ref={dashboardwidgitref} className='  flex h-[100%]'>
        
      <ResponsiveReactGridLayout
      className="layout w-[100%] "
      
      layouts={{ lg: boxes }}
      breakpoints={breakpoints}
      cols={cols}
      rowHeight={100}
      isResizable={true}

      isDraggable={true}
      onResizeStop={onResizeStop}
        onDragStop={onDragStop}
    >
      
      
      
    
        {(boxes||[]).map((box,index) => (
         <div
         key={box.id}
        data-grid={box}
        onClick={(e)=>e.stopPropagation()}
        className="dev-box z-20 border-gray-300 bg-white border-[0.5px] rounded-lg p-4 pt-7"
  
         >
          
            {(() => {
            try {
              switch (box.type) {
                case 'news':
                  return (
                    <NewsWidgit id={index} boxes={boxes} setBoxes={setBoxes}/>
                  )
                case 'timeline':
                  return (
                    <Timeline
                    id={index}
                    setBoxes={setBoxes}
                    boxes={boxes}
                    realtimetimeline={realtimetimeline}
                    />
                  )
                case 'portfoliocard':
                  return (
                    
                    <Portfoliocard 
                    id={index}
                     setBoxes={setBoxes} 
                     boxes={boxes}
                     showValue={box.showValue}
                     setshowvalue={setshowvalue}
                     setsheetpopup={setsheetpopup}
                     handlePlusClick={handlePlusClick}
                     setportfoliocardwidgitcount={setportfoliocardwidgitcount}
                     portfoliocardwidgitcount={portfoliocardwidgitcount}
                     capturingPortfoliowidgitvalues={capturingPortfoliowidgitvalues}
                     setcapturingPortfoliowidgitvalues={setcapturingPortfoliowidgitvalues}
                     
                     />
              
                  )
                case 'chat':
                  return (
                    <ChatWidgit 
                    id={index} 
                    setBoxes={setBoxes}
                    boxes={boxes} 
                    realtimeChat={realtimeChat} 
                    Useremail={Useremail} 
                    handleSeeUsers={handleSeeUsers} 
                    setclickeduseremail={setclickeduseremail}/>
                  )
                case 'calendarwidgit':
                  return(
                    <CalendarWidgit
                      id={index}
                      setBoxes={setBoxes}
                      boxes={boxes}
                      mygoogleaccountisconnected={mygoogleaccountisconnected}
                    />
                  )
                
                case 'AssignedDeals':
                  return(
                    <AssignedDeals
                      id={index}
                      
                      setBoxes={setBoxes}
                      setdealpipelinefromdashboardcompany={setdealpipelinefromdashboardcompany}
                      boxes={boxes}
                      hidenavbar={hidenavbar}
                      realtimetabchats={realtimetabchats}
                      realtimedealpipelinecompanyInfo={realtimedealpipelinecompanyInfo}
                      setassigneddealclicked={setassigneddealclicked}
                      status={status}
                      setstatus={setstatus}
                      TeamLead_status={TeamLead_status}
                      setTeamLead_status={setTeamLead_status}
                      completed={completed}
                      setcompleted={setcompleted}
                      openViewallGrid={assigneddealclicked}
                      setOpenViewallGrid={setassigneddealclicked}
                      setcompanyDiscription={setcompanyDiscription}
                      setCompanyName={setCompanyName}
                      setActiveField={setActiveField}
                    />
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
                        setBoxes={setBoxes}
                        boxes={boxes}
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
                        setBoxes={setBoxes}
                        boxes={boxes}
                        
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
                        setBoxes={setBoxes}
                        boxes={boxes}
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
              
              setTimeout(()=>{
                handleretry()
              },1000)
              return <div></div>;
            }
          })()}
          </div>
        ))}
      </ResponsiveReactGridLayout>
      </div>
      {showPopup && (
        <ChartPopup
        showValue={showValue}
        dashboardwidgitref={dashboardwidgitref}
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
          portfoliocardwidgit={portfoliocardwidgit}
          setportfoliocardwidgit={setportfoliocardwidgit}
          portfoliocardwidgitcount={portfoliocardwidgitcount}
          setportfoliocardwidgitcount={setportfoliocardwidgitcount}
        />
      )}
      </div>
    } 

    
    
    </div>
  );
};

export default Dashboard;
