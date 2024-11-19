import React from 'react'
import MeterComponent from './MeterComponent'
import { HiOutlineDotsVertical } from 'react-icons/hi'

const PortfolioMeter = ({setgettingmetervalue,PortfolioMetervalue,selectedTab,realtimeportfoliostate,sheetedited}) => {
  return (
    <div className='flex items-center justify-center w-[100%]'>
        
        <MeterComponent setgettingmetervalue={setgettingmetervalue} sheetedited={sheetedited}  PortfolioMetervalue={PortfolioMetervalue} selectedTab={selectedTab} realtimeportfoliostate={realtimeportfoliostate}/> 
    </div>
  )
}

export default PortfolioMeter