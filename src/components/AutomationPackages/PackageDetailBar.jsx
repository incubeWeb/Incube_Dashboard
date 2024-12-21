import React, { useEffect, useState } from 'react'
import whatsapp from '../../Assets/whatsapp.svg'
import {Input} from '@material-tailwind/react'
import {Button} from '@material-tailwind/react'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {Alert} from '@material-tailwind/react'
import {Spinner} from '@material-tailwind/react'
import {Switch} from '@material-tailwind/react'

const PackageDetailBar = ({id,hidenavbar,image,title}) => {
    const [whatsappAccessToken,setwhatsappAccessToken]=useState("");
    const [whatsappBusinessId,setwhatsappBusinessId]=useState("");
    const [whatsappClientId,setwhatsappClientId]=useState("");
    const [whatsappClientSecret,setwhatsappClientSecret]=useState("");
    const token = localStorage.getItem('token');
    const userdata = jwtDecode(token);
    const Logemail = userdata.userdetails.email;
    const [showActiveBar,setShowActiveBar]=useState(false);
    const [showFaildedAlert,setshowFailderAlert]=useState(false);
    const [startspinner,setstartspinner]=useState(true);

    const [switchvalue,setswitchvalue]=useState(true);
    const [currentWorkflowId,setcurrentWorkflowId]=useState('');
    const [switchdisabled,setswitchdisabled]=useState(false);

    useEffect(()=>{
        const CheckifWorkflowCredsAreFilled=async()=>{
            const response=await axios.get(`${import.meta.env.VITE_HOST_URL}8999/getautomationpackagedetails`,{params:{
                id:id
            },headers:{
                "Authorization":`Bearer ${token}`
            }})

            if(response.data.status==200){
                if(Object.keys(response.data.data).length>0){
                    setShowActiveBar(true);
                    console.log(response.data.data.active,"here")
                    if(response.data.data.active=="false"){
                        setswitchvalue(false);
                    }else{
                        setswitchvalue(true);
                    }
                    
                    setcurrentWorkflowId(response.data.data.workflowId);
                    //off startspinner
                    setstartspinner(false);
                }else{
                    setShowActiveBar(false);
                    setswitchvalue(true);
                    setstartspinner(false)
                }
            }
        }
        CheckifWorkflowCredsAreFilled()
    },[])

    const SaveWhatsappData=async()=>{
        setstartspinner(true);
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setValues/whatsapp`,{
            "email":Logemail,
            "accessToken":whatsappAccessToken,
            "bussinessId":whatsappBusinessId,
            "clientId":whatsappClientId,
            "clientSecret":whatsappClientSecret
        },{headers:{
            "Authorization":`Bearer ${token}`
          }})
        if(response.data.status==200){
            setShowActiveBar(true);
            setstartspinner(false);
            setcurrentWorkflowId(response.data.id)
            
        }
        else{
            setshowFailderAlert(true);
            setTimeout(()=>{
                setshowFailderAlert(false);
            },4000)
            setstartspinner(false)
        }
    }
    const handleSwitchChange=async(val)=>{
        setswitchvalue(!switchvalue)
        setswitchdisabled(true);
        if(val){
            //Deactivation Request
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/deactivate-workflow`,{
                workflowId:currentWorkflowId
            },{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })

            if(response.data.status==200){
                setswitchdisabled(false);
            }else{
                setswitchdisabled(false)
                setswitchvalue(val)
            }
        }
        else{
            //Activation Request
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/activate-workflow`,{
                workflowId:currentWorkflowId
            },{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            console.log(response.data.data,"res")
            if(response.data.status==200){
                setswitchdisabled(false);
            }else{
                setswitchdisabled(false)
                setswitchvalue(val)
            }
        }

    }
  return (
    <div className={`${hidenavbar?'w-[450px]':'w-[400px]'} font-inter p-[20px] pt-[50px] bg-white fixed h-[100%] top-0 right-0 z-[70] flex flex-col`} style={{  boxShadow: "1px 2px 6px #1e293b"}}>
        <Alert 
            open={showFaildedAlert}
            onClose={()=>setshowFailderAlert(false)}
            animate={{
                mount: { y: 0 },
                unmount: { y: 100 },
            }}>
                Incorrect Credentials! Fill the details with correct data
        </Alert>
        {
            startspinner?
            <Spinner className="h-12 w-12" />
            :
            <div className='h-[100%] w-[100%] flex flex-col mt-3 space-y-8'>
                <div className='flex flex-row w-[100%] rounded-xl bg-gray-200 p-5 h-[60px] space-x-2 items-center'>
                    <img src={image} width={30} className='object-contain w-[30px]'/>
                    <p className='text-[13px]'>{title}</p>
                    
                </div>
                {
                    id=='whatsapp'?
                    !showActiveBar?
                        <div className='h-[90%] flex flex-col gap-6 '>
                            <Input color="blue" label="Access Token" value={whatsappAccessToken} onChange={(e)=>setwhatsappAccessToken(e.target.value)}/>
                            <Input color="blue" label="Business Account ID" value={whatsappBusinessId} onChange={(e)=>setwhatsappBusinessId(e.target.value)}/>
                            <Input color="blue" label="Client ID" value={whatsappClientId} onChange={(e)=>setwhatsappClientId(e.target.value)}/>
                            <Input color="blue" label="Client Secret" value={whatsappClientSecret} onChange={(e)=>setwhatsappClientSecret(e.target.value)}/>
                            <Button variant="gradient" className='h-[50px] bg-green-500 text-white' onClick={()=>SaveWhatsappData()}>Start Automation</Button>
                        </div>
                    :
                        <div className='flex ml-2 flex-row space-x-2'>
                            {switchvalue?<p>Package Currently Activated</p>:<p>Package Currently Deactivated</p>}
                            <Switch
                                id="custom-switch-component"
                                checked={switchvalue}
                                disabled={switchdisabled}
                                onChange={()=>{handleSwitchChange(switchvalue)}}
                                className="h-full w-full checked:bg-[#2ec946]"
                                containerProps={{
                                    className: "w-11 h-6",
                                }}
                                circleProps={{
                                    className: "before:hidden left-0.5 border-none",
                                }}
                            />
                        </div>
                    :
                    id=='2'?
                    <div className='h-[90%] flex flex-col gap-6 space-y-4'>
                        <Input color="blue" label="From" />
                        <Input color="blue" label="To" />
                        <Input color="blue" label="Subject" />
                        <Input color="blue" label="Message" />
                        <Button variant="gradient" className='h-[50px] bg-green-500 text-white'>Start Automation</Button>
                    </div>
                    :
                    id=='3'?
                    <div className='h-[90%] flex flex-col gap-6 space-y-4'>
                        <Input color="blue" label="Access Token" />
                        <Input color="blue" label="App Secret" />
                        <Input color="blue" label="App ID" />
                        <Input color="blue" label="Message" />
                        <Button variant="gradient" className='h-[50px] bg-green-500 text-white'>Start Automation</Button>
                    </div>
                    :
                    <div className='h-[90%] flex flex-col gap-6 space-y-4'>
                        <Input color="blue" label="Service Name" />
                        <Input color="blue" label="Service Objective" />
                        <Button variant="gradient" className='h-[50px] bg-blue-500 text-white'>Request Automation</Button>
                    </div>
                }
            </div>
        }
        

        
        
    </div>
  )
}

export default PackageDetailBar