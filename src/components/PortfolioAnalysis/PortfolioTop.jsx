import React, { useEffect, useState } from 'react'
import { IoAddSharp } from 'react-icons/io5'
import { LuPencil } from 'react-icons/lu'
import { PiCards } from 'react-icons/pi'
import { RiFundsLine } from 'react-icons/ri'
import PortfolioCards from './PortfolioCards'
import axios from 'axios'
import PortfolioTopGraph from './PortfolioTopGraph'
import { Bars } from 'react-loader-spinner'

const PortfolioTop = ({hidenavbar,sheetedited,selectedSheetId}) => {
    const [valueid,setvalueid]=useState([{id:1,labelname:'Total fund',showValue:'$0'},{id:2,labelname:'Fund utilized',showValue:'$0'},{id:3,labelname:'Funds remaining',showValue:'$0'},{id:4,labelname:'ROI',showValue:'$0'}])

    const [changevalue,setchangevalue]=useState(false)
    
    
    useEffect(()=>{
        const setTopCardsValues=async()=>{
            
            const isEqual = JSON.stringify(valueid) === JSON.stringify([{id:1,labelname:'Total fund',showValue:'$0'},{id:2,labelname:'Fund utilized',showValue:'$0'},{id:3,labelname:'Funds remaining',showValue:'$0'},{id:4,labelname:'ROI',showValue:'$0'}]);
            
            const organization=`${localStorage.getItem('organization')}_Topcards`
            if(!isEqual && (valueid[0]['labelname']!=''))
            {
                await axios.post('http://localhost:8999/setportfoliostate',{
                    organization:organization,
                    portfolioState:JSON.stringify(valueid)
                })
            }
        }
        
         
        setTopCardsValues()
        
    },[valueid])

    useEffect(()=>{
        const getTopCardsValues=async()=>{
            
            const organization=`${localStorage.getItem('organization')}_Topcards`
            const response=await axios.post('http://localhost:8999/getportfoliostate',{organization:organization})
            const data=response.data.data
    
           // const stateValues=JSON.parse(localStorage.getItem('portfolioState'))||[]
           const stateValues=JSON.parse(data)||[]
           setvalueid(stateValues)
           console.log(stateValues,"sheet edited")
        }
        getTopCardsValues()

    },[sheetedited])

  useEffect(()=>{
    const getTopCardsValues=async()=>{
        const organization=`${localStorage.getItem('organization')}_Topcards`
        const response=await axios.post('http://localhost:8999/getportfoliostate',{organization:organization})
        const data=response.data.data

       // const stateValues=JSON.parse(localStorage.getItem('portfolioState'))||[]
       const stateValues=JSON.parse(data)||[]
       setvalueid(stateValues)
       console.log(stateValues)
    }
    getTopCardsValues()
  },[])


  return (
    <div className='w-[100%] font-roboto  flex flex-col space-y-4'>
        <div className=' h-[60px] p-2 w-[100%] flex flex-row rounded-md'>
            <div className='w-[50%] flex items-center justify-start'><p className='text-[30px] tracking-wider font-inter font-semibold '>Portfolio</p></div>
            <div className='w-[50%] flex items-center justify-end space-x-2'>
                <div><PiCards size={20} /></div>
                <p className='text-[16px] tracking-wider font-inter font-semibold'>Portfolio</p>
            </div>
        </div>
        
        
        <div className='grid grid-cols-4 gap-6'> 
           
            <PortfolioCards selectedSheetId={selectedSheetId}  sheetedited={sheetedited} id={1} setchangevalue={setchangevalue} changevalue={changevalue} hidenavbar={hidenavbar}  style='w-[40px] items-center flex justify-center h-[40px] bg-green-300 rounded-[50%]' valueid={valueid} setvalueid={setvalueid}/>
            <PortfolioCards selectedSheetId={selectedSheetId} sheetedited={sheetedited} id={2} setchangevalue={setchangevalue} changevalue={changevalue} hidenavbar={hidenavbar}  style='w-[40px] items-center flex justify-center h-[40px] bg-violet-400 rounded-[50%]' valueid={valueid} setvalueid={setvalueid}/>
            <PortfolioCards selectedSheetId={selectedSheetId} sheetedited={sheetedited} id={3} setchangevalue={setchangevalue} changevalue={changevalue} hidenavbar={hidenavbar}  style='w-[40px] items-center flex justify-center h-[40px] bg-pink-300 rounded-[50%]' valueid={valueid} setvalueid={setvalueid}/>
            <PortfolioCards selectedSheetId={selectedSheetId} sheetedited={sheetedited} id={4} setchangevalue={setchangevalue} changevalue={changevalue} hidenavbar={hidenavbar}  style='w-[40px] items-center flex justify-center h-[40px] bg-sky-400 rounded-[50%]' valueid={valueid} setvalueid={setvalueid}/>
                
            
        </div>
        
        <div>
            <PortfolioTopGraph sheetedited={sheetedited}  hidenavbar={hidenavbar}/>
        </div>
    </div>
  )
}

export default PortfolioTop