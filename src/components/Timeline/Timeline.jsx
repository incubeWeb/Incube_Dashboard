import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { MdDonutLarge } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux'


const Timeline = ({id,boxes,setBoxes,realtimetimeline}) => {
    
    const [timelinedata,settimelinedata]=useState([])
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role

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


    function convertTimestampToReadableTime(timestamp) {
        const date = new Date(timestamp);
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Set to false for 24-hour format
        };
        return date.toLocaleTimeString('en-US', options);
    }
    
      
    const timeData=(item)=>{
        let toSend=""
        const data=JSON.parse(item.updateIs)
        const time=data.fullDocument.time
        toSend=convertTimestampToReadableTime(parseInt(time))
      
        return toSend || ""
    }
    const DateData=(item)=>{
        let toSend=""
        const data=JSON.parse(item.updateIs)
        const raw_time=parseInt(data.fullDocument.time)
        const time=new Date(raw_time)
        const month=time.getMonth()
        const date=time.getDate()
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        toSend=`${monthNames[month]} ${date}`
      
        return toSend || ""
    }
    

    const provideData=(item)=>{
        let toSend=""
        const collName=item.updateInColl
        const data=JSON.parse(item.updateIs)
        const operation_performed=data.operationType
        if(collName=='Users')
        {
            if(operation_performed=='insert')
            {
                const created_email=data.fullDocument.email
                const created_role=data.fullDocument.role
                toSend=`${created_email} has been added with ${created_role} role`
            }
            if(operation_performed=='update')
            {
                toSend=`notshow`
            }
            if(operation_performed=='delete')
            {
                toSend=`notshow`
            }
        }
        if(collName=='DealPipelineCompany')
        {
            if(operation_performed=='insert')
            {
                const company_name=data.fullDocument.title
                toSend=`a new deal pipeline company named ${company_name} has been added`
            }
            if(operation_performed=='update')
            {
                const valueStatus=Object.keys(data.updateDescription.updatedFields)
                valueStatus.map(stat=>{
                 
                    if(stat=='status' &&data.updateDescription.updatedFields[stat]=='In Progress')
                    {
                        toSend=`notshow`
                    }
                    if(stat=='completed' &&data.updateDescription.updatedFields[stat]=='completed')
                    {
                        toSend=`notshow`
                    }
                })
                
            }
        }
        if(collName=='deletedUser')
        {
        try{
            const name=data.fullDocument.email
            const doneBy=data.fullDocument.doneBy
            if(data.fullDocument.task=='delete')
            {
                toSend=`${name} has been deleted by ${doneBy}`
            }
            if(data.fullDocument.task.includes('update'))
            {
                toSend=""
               const raw=data.fullDocument.task
               const filter=raw.split('-')[1]
               const obj=filter.substring(1,filter.length).split(',')
               const email=obj[0]
               const pass=obj[1]
               const role=obj[2].split(']')[0]
               try{
                
               
               const changes=JSON.parse(obj[3])
               
             
                
                changes.map((change)=>{
                
                    if(change=='role')
                    {
                       
                        toSend+=`${email} has been updated by ${doneBy} value ${change} has been updated to ${role}`
                    }
                    if(change=='password')
                    {
                     
                        toSend+=`${email} has been updated by ${doneBy} value ${change} has been updated to ${pass}`
                       
                    }
                })
               
               }catch(e)
               {
                    toSend=''
                   
                    const filter2=raw.split('-')[1]
                    const semi_filter2=filter2.split('],[')
                    const obj2=JSON.parse("["+semi_filter2[1])
                   if(obj2.length>0)
                   {
                    obj2.map((change)=>{
                   
                        if(change=='role')
                        {
                           
                            toSend+=`${email} has been updated by ${doneBy} value ${change} has been updated to ${role}, `
                        }
                        if(change=='password')
                        {
                            toSend+=`value of ${change} has been updated to ${pass}`
                            
                        }
                    })
                   }
                   else{
                    toSend='notshow'
                   }
               }
                
                
            }
            if(data.fullDocument.task=='fileDelete')
            {
                toSend=`${data.fullDocument.doneBy} delete a file named ${data.fullDocument.email.split('-')[1]}`            
            }
            if(data.fullDocument.task=='companycompleted')
            {
                toSend=`${data.fullDocument.email} has been pushed to completed by ${data.fullDocument.doneBy}`
            }
            }catch(e)
            {
                toSend=`notshow`
            }
        }
        if(collName=='Teams')
        {
            if(operation_performed=='insert')
            {
                const company_name=data.fullDocument.organization
                const member=data.fullDocument.member
                const assignedBy=data.fullDocument.assignedBy
                toSend=`${assignedBy} assigns ${member} in company ${company_name}`
            }
        }
        if(collName=='TabChats')
        {
            if(operation_performed=='insert')
            {
                const companyName=data.fullDocument.CompanyName
                const tab=data.fullDocument.tab
                toSend=`a new chat has been added on ${companyName} at ${tab}`
            }
        }
        if(collName=='UploadedFiles')
        {
            if(operation_performed=='insert')
            {
                const companyName=data.fullDocument.CompanyName
                const tab=data.fullDocument.tab
                const filename=data.fullDocument.name
                const fileType=data.fullDocument.fileType
                toSend=`on ${companyName} at ${tab} a file named ${filename} of type ${fileType} has been added`
            }
            if(operation_performed=='delete')
            {
                toSend=`notshow`
            }
        }

        return toSend || `notshow`
    }
    
    useEffect(()=>{
      const settimelinedatas=async()=>{
          const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/gettimeline`,{organization:Logorganization},{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
          
          settimelinedata(response.data.data)
        }
        settimelinedatas()
    },[])

    useEffect(()=>{
      const settimelinedatas=async()=>{
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/gettimeline`,{organization:Logorganization},{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        
        settimelinedata(response.data.data)
      }
      settimelinedatas()
    },[realtimetimeline])

    

    useEffect(()=>{
      const mergedData=[...timelinedata]
      
      sessionStorage.setItem("Bot_Data",JSON.stringify(mergedData))
          },[timelinedata])
    
  
{   try{
    return (
   <div className="flex z-0 flex-col scrollbar-hide w-full max-h-screen h-[100%] overflow-y-auto">
  {timelinedata.map((item) =>
    provideData(item) !== "notshow" ? (
      <div
        key={item.key || item._id}
        className="flex w-[100%] h-auto flex-row space-x-2 items-center"
      >
       
        <div className="w-[100px] flex-col h-auto flex items-center bg-white">
          <div className="w-[100%] h-[100%] flex flex-row space-x-2">
   
            <div className="w-[100%] h-auto flex items-start justify-center">
              <p className="w-[100%] h-auto text-[12px] font-sans flex items-center mt-3 justify-start">
                {DateData(item)}
              </p>
            </div>

            <div className="w-[20%] h-auto flex flex-col pr-12 items-center">
              <div className="w-[2px] h-[100%] bg-gray-500"></div>
              <MdDonutLarge size={50} className="text-blue-600" />
              <div className="w-[2px] h-[100%] bg-gray-500"></div>
            </div>
          </div>
        </div>

       
        <div className="flex-grow h-auto mt-4 mb-4 flex flex-row items-start space-x-2 mr-4">
          <div className="w-[60%] h-auto">
         
            <p className="text-[12px] font-sans leading-4 break-words mr-2 mt-1">
              {provideData(item)}
            </p>
          </div>

       
          <div className="w-[40%] h-auto flex items-center justify-end pr-4">
            <p className="text-[12px]">{timeData(item)}</p>
          </div>
        </div>
      </div>
    ) : null
  )}
  

  <div
    className="z-[10] cursor-pointer flex items-center justify-center w-[20px] rounded-xl h-[20px] bg-gray-100 mt-4 mr-3 fixed right-[-10px] top-[-15px]"
    onClick={deleteWidgit}
  >
    <RxCross2 size={14} className="text-black" />
  </div>
</div>

  )}catch(e){
    console.log(e)
    return(
        <>error</>
    )
  }
    
}
}
export default Timeline