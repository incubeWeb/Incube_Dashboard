import React from 'react';

const MeterComponent = ({ value }) => {
  const max = 100;  // Max value of the meter
  const min = 0;    // Min value of the meter
  const percentage = Math.max(min, Math.min(value, max)); // Ensure the value is within bounds

  return (
    <div className='font-roboto tracking-wider text-[14px]' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <svg width="200" height="120" viewBox="0 0 200 100" >
        {/* Background arc */}
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="10"
          
        />
        {/* Foreground arc, changes based on the value */}
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="#00aaff"
          strokeWidth="10"
          strokeDasharray="565"
          strokeDashoffset={565 - (percentage / 100) * 565}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        {/* Text in the center showing the value */}
        <text x="100" y="80" textAnchor="middle" fontSize="20" fill="#000">
          {`${percentage}%`}
        </text>
      </svg>
      <p>Meter Value: {percentage}%</p>
    </div>
  );
};

export default MeterComponent;
