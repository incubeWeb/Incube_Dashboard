import React from 'react'
import MeterComponent from './MeterComponent'

<<<<<<< Updated upstream
const PortfolioMeter = () => {
  return (
    <div className='flex items-center justify-center w-[100%]'>
        <MeterComponent value={10} /> 
=======
const PortfolioMeter = ({selectedTab,hidenavbar}) => {
  return (
    <div className='flex items-center justify-center w-[100%]'>
    
        <MeterComponent selectedTab={selectedTab} hidenavbar={hidenavbar}  /> 
>>>>>>> Stashed changes
    </div>
  )
}

export default PortfolioMeter