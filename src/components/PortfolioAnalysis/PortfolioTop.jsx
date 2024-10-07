import React, { useEffect, useState } from 'react'
import { IoAddSharp, IoPeople } from 'react-icons/io5'
import { LuPencil } from 'react-icons/lu'
import { PiCards } from 'react-icons/pi'
import { RiFundsLine } from 'react-icons/ri'
import PortfolioCards from './PortfolioCards'
import axios from 'axios'
import PortfolioTopGraph from './PortfolioTopGraph'
import { Bars } from 'react-loader-spinner'
import { BsBox, BsCurrencyDollar } from 'react-icons/bs'
import { HiChartBar } from 'react-icons/hi'
import { CiShare2 } from 'react-icons/ci'
import { jwtDecode } from 'jwt-decode'

const PortfolioTop = ({selectedTab,setportfoliocardsdata,portfoliosecurity,realtimeportfoliostate,hidenavbar,sheetedited,selectedSheetId}) => {
    const [valueid,setvalueid]=useState([{id:1,labelname:'Total fund',showValue:'$0'},{id:2,labelname:'Fund utilized',showValue:'$0'},{id:3,labelname:'Funds remaining',showValue:'$0'},{id:4,labelname:'ROI',showValue:'$0'}])
    
    const [changevalue,setchangevalue]=useState(false)
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
    
    useEffect(()=>{
      setportfoliocardsdata(valueid)
    },[valueid])
   
    
    
    useEffect(()=>{
        const getTopCardsValues=async()=>{
            
            const organization=`${Logorganization}_Topcards`
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate`,{email:selectedTab,organization:organization},{
              headers:{
                "Authorization":`Bearer ${token}`
              }
            })
            if(response.data.status==-200)
            {
              setvalueid([{id:1,labelname:'Total fund',showValue:'$0'},{id:2,labelname:'Fund utilized',showValue:'$0'},{id:3,labelname:'Funds remaining',showValue:'$0'},{id:4,labelname:'ROI',showValue:'$0'}])
              return
            }
            
            const data=response.data.data
    
           // const stateValues=JSON.parse(localStorage.getItem('portfolioState'))||[]
           const stateValues=JSON.parse(data)||[]
           setvalueid(stateValues)
        }
        try{
        getTopCardsValues()
        }catch(e)
        {
          getTopCardsValues()
        }

    },[sheetedited,realtimeportfoliostate,selectedTab])

  useEffect(()=>{
    const getTopCardsValues=async()=>{
        const organization=`${Logorganization}_Topcards`
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate`,{email:selectedTab,organization:organization},{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        if(response.data.status==-200)
          {
          //  setvalueid([{id:1,labelname:'Total fund',showValue:'$0'},{id:2,labelname:'Fund utilized',showValue:'$0'},{id:3,labelname:'Funds remaining',showValue:'$0'},{id:4,labelname:'ROI',showValue:'$0'}])
            return
          }
        const data=response.data.data

       // const stateValues=JSON.parse(localStorage.getItem('portfolioState'))||[]
       const stateValues=JSON.parse(data)||[]
       setvalueid(stateValues)
     
    }
    try{
    getTopCardsValues()
    }catch(e){
      getTopCardsValues()
    }
  },[])

  

  return (
    <div className='w-[100%] font-roboto  flex flex-col space-y-4'>
        
        
        
        <div className='grid grid-cols-4 gap-6'> 
           
            <PortfolioCards selectedTab={selectedTab} portfoliosecurity={portfoliosecurity} selectedSheetId={selectedSheetId}  sheetedited={sheetedited} id={1} setchangevalue={setchangevalue} changevalue={changevalue} hidenavbar={hidenavbar}  style='w-[40px] items-center flex justify-center h-[40px] bg-yellow-400 rounded-[50%] shadow-[0_0_15px_rgba(255,255,0,1)]' valueid={valueid} setvalueid={setvalueid} component={ <BsCurrencyDollar  size={24} className='text-white'/>}/>
            <PortfolioCards selectedTab={selectedTab} portfoliosecurity={portfoliosecurity} selectedSheetId={selectedSheetId} sheetedited={sheetedited} id={2} setchangevalue={setchangevalue} changevalue={changevalue} hidenavbar={hidenavbar}  style='w-[40px] h-[40px] flex items-center justify-center bg-violet-500 rounded-[50%] shadow-[0_0_15px_rgba(138,43,226,1)]' valueid={valueid} setvalueid={setvalueid} component={<BsBox size={24} className='text-white'/>}/>
            <PortfolioCards selectedTab={selectedTab} portfoliosecurity={portfoliosecurity} selectedSheetId={selectedSheetId} sheetedited={sheetedited} id={3} setchangevalue={setchangevalue} changevalue={changevalue} hidenavbar={hidenavbar}  style='w-[40px] h-[40px] flex items-center justify-center bg-pink-400 rounded-[50%] shadow-[0_0_15px_rgba(255,20,147,1)]' valueid={valueid} setvalueid={setvalueid} component={<HiChartBar size={24} className='text-white' />}/>
            <PortfolioCards selectedTab={selectedTab} portfoliosecurity={portfoliosecurity} selectedSheetId={selectedSheetId} sheetedited={sheetedited} id={4} setchangevalue={setchangevalue} changevalue={changevalue} hidenavbar={hidenavbar}  style='w-[40px] h-[40px] flex items-center justify-center bg-sky-400 rounded-[50%] shadow-[0_0_15px_rgba(135,206,235,1)]' valueid={valueid} setvalueid={setvalueid} component={<IoPeople size={24} className='text-white' />}/>
                
            
            
        </div>
        
        <div className='w-[100%] h-[420px] '>
            <PortfolioTopGraph selectedTab={selectedTab} portfoliosecurity={portfoliosecurity} realtimeportfoliostate={realtimeportfoliostate} sheetedited={sheetedited}  hidenavbar={hidenavbar}/>
        </div>
    </div>
  )
}

export default PortfolioTop