import axios from 'axios'
import React, { useEffect, useState ,useRef} from 'react'
import { GoDotFill } from 'react-icons/go'
import { RiFilter3Line } from 'react-icons/ri'
import DatabaseSheets from './DatabaseSheets'
import PortfolioHistory from './PortfolioHistory'
import { RxCross2 } from 'react-icons/rx'
import { FaCaretRight, FaDatabase, FaPlus } from 'react-icons/fa'
import { IoMdArrowBack, IoMdEyeOff } from 'react-icons/io'
import { BsThreeDotsVertical } from 'react-icons/bs'
import PortfolioTop from './PortfolioTop'
import { Bars } from 'react-loader-spinner'
import GoogleSheetDatabaseSheets from './GoogleSheetDatabaseSheets'
import { CiShare2 } from 'react-icons/ci'
import PortfolioShared from './PortfolioShared'
import PortfolioRemoveSharedUsers from './PortfolioRemoveSharedUsers'
import { MdGroupRemove, MdOutlineRemoveRedEye } from 'react-icons/md'
import { TbCircleDotFilled } from "react-icons/tb";
import { jwtDecode } from 'jwt-decode'
import {useSheet } from '../SheetContext/SheetContext.jsx'
import { IoShareSocialOutline } from "react-icons/io5";




const Portfolio = ({realtimeportfoliostate,hidenavbar,sheetedited}) => {

    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role
    const popupRef = useRef(null);

    const [sheetmethod,setsheetmethod]=useState('')
    const [allSheets,setallSheets]=useState([])
    const [selectedSheetId,setselectedSheetId]=useState([])
    const [sheetJson,setsheetJson]=useState([])
    const [sheetKeys,setsheetKeys]=useState([])
    const [selectedImageFiled,setselectedImageField]=useState('')
    const [showHistory,setshowHistory]=useState(false)
    const [showimagepopup,setshowimagePopup]=useState(false)
    const [sheetname,setsheetname]=useState('')
    const [selectfield,setselectfield]=useState(false)
    const [loading,setloading]=useState(true)
    const [showFilterMenu, setShowFilterMenu] = useState(false); // State for filter pop-up
    const [selectedFilter, setSelectedFilter] = useState(''); // Selected filter
    const [showSortMenu, setShowSortMenu] = useState(false); // State for sorting pop-up
    const [selectedSort, setSelectedSort] = useState(''); // Ascending or Descending

    const [portfoliocardsdata,setportfoliocardsdata]=useState([])
    const [sharedwithusers,setsharedwithusers]=useState([])

//Tabs variables
    const [selectedTab,setselectedTab]=useState(Logemail)
    
    const [allportfoliotabs,setallportfoliotabs]=useState([])

    const [portfoliosecurity,setportfoliosecurity]=useState('private')
    const [clickedportfolioshared,setclickedPortfolioShared]=useState(false)
  const [clickedportfolioremoveshared,setclickedportfolioremoveshared]=useState(false)
    const [SharepopUp,setSharepopUp]=useState(false)

    const [PortfoliosharedWithUsers,setPortfolioSharedwithusers]=useState([])

    const [PortfolioMetervalue,setportfoliometervalue]=useState('0')

    const [Portfoliocardvalues,setPortfoliocardvalues]=useState([])
    const [PortfolioGraphvalues,setPortfolioGraphvalues]=useState([])

    
    // Function to toggle filter menu visibility
    const toggleFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    };


    const handleFilterSelection = (filter) => {
        setSelectedFilter(filter);
     
        setShowFilterMenu(false); // Close filter menu
        setShowSortMenu(true); // Open sorting menu
    };

    // Function to handle filter selection and open sorting pop-up
   

    // Function to handle sorting selection
    const handleSortSelection = (sort) => {
        setSelectedSort(sort);
        setShowSortMenu(false); // Close sorting menu after selection
    };
    const { sheetJson1 } = useSheet();
    const {percentage1}=useSheet();
    
    useEffect(()=>{
       
        setloading(true)
        
    },[selectedTab])

    useEffect(()=>{
        console.log("from main portfolio Portfolio shared",PortfoliosharedWithUsers)
    },[PortfoliosharedWithUsers])


    useEffect(()=>{
        const setStateValues=async()=>{
           const organization=Logorganization
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate`,{email:selectedTab,organization:organization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
             
              
             
            if(response.data.status==-200)
            {
                setTimeout(()=>{
                    setloading(false)
                },1000)
                alert('Server error')
                return
            }
            const data=response.data.historydata
            const data2=response.data.cardsdata
            const data3=response.data.Graphdata
           
            

            if(response.data.security==undefined)
            {
                setportfoliosecurity('private')
            }else{
            setportfoliosecurity(response.data.security)
            }
            setportfoliometervalue(response.data.metervalue)
            
            
                    
                    try{
                        if(typeof(response.data.sharewith)=='string'){
                            const val=JSON.parse(response.data.sharewith)
                            console.log("values",typeof(val))
                            setPortfolioSharedwithusers(val)
                        }
                        else if(typeof(response.data.sharewith)=='object')
                        {
                            setPortfolioSharedwithusers(response.data.sharewith)
                        }
                        
                    }catch(e){
                        setPortfolioSharedwithusers([])
                    }
                
                console.log(typeof(response.data.sharewith))
                console.log("sharedusers",response.data.sharewith,typeof(response.data.sharewith))
            
                let stateValues=[]
               
                let val1= []
                let val2=[] 
            
           // const stateValues=JSON.parse(localStorage.getItem('portfolioState'))||[]
           try{
            stateValues=JSON.parse(data)||[]
           }catch(e)
           {
            stateValues=[]
           }
           try{
            val1=data2 || []
           }catch(e){
            val1=JSON.parse(data2) || []
           }

           try{
           val2=data3 || [] //JSON.parse(data)
           }
          catch(e){
            
            val2=JSON.parse(data3) || [] //JSON.parse(data)
           }
            
           console.log(val1,"this is the val1 value")

           setPortfoliocardvalues(val1)
           
           setPortfolioGraphvalues(val2)

          
         
            if(stateValues.length>0)
            {
                
                stateValues.map(val=>{
                setsheetmethod(val.sheetmethod)
                setallSheets(val.allSheets)
                setselectedSheetId(val.selectedSheetId)
                setsheetJson(val.sheetJson)
                setsheetKeys(val.sheetKeys)
                setselectedImageField(val.selectedImageFiled)
                setshowHistory(val.showHistory)
                setshowimagePopup(val.showimagepopup)
                setsheetname(val.sheetname)
                setselectfield(val.selectfield)
               
                
                })
            }
            setloading(false)
        }
        
        setStateValues()
        
    },[])


    useEffect(()=>{
        const setStateValues=async()=>{
           const organization=Logorganization
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/getportfoliostate`,{email:selectedTab,organization:organization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
             
              
             
            if(response.data.status==-200)
            {
                setTimeout(()=>{
                    setloading(false)
                },1000)
                alert('Server error')
                return
            }
            const data=response.data.historydata
            const data2=response.data.cardsdata
            const data3=response.data.Graphdata
           
            

            if(response.data.security==undefined)
            {
                setportfoliosecurity('private')
            }else{
            setportfoliosecurity(response.data.security)
            }
            setportfoliometervalue(response.data.metervalue)
            
            
                    
                    try{
                        if(typeof(response.data.sharewith)=='string'){
                            const val=JSON.parse(response.data.sharewith)
                            console.log("values",typeof(val))
                            setPortfolioSharedwithusers(val)
                        }
                        else if(typeof(response.data.sharewith)=='object')
                        {
                            setPortfolioSharedwithusers(response.data.sharewith)
                        }
                        
                    }catch(e){
                        setPortfolioSharedwithusers([])
                    }
                
                console.log(typeof(response.data.sharewith))
                console.log("sharedusers",response.data.sharewith,typeof(response.data.sharewith))
            
                let stateValues=[]
               
                let val1= []
                let val2=[] 
            
           // const stateValues=JSON.parse(localStorage.getItem('portfolioState'))||[]
           try{
            stateValues=JSON.parse(data)||[]
           }catch(e)
           {
            stateValues=[]
           }
           try{
            val1=data2 || []
           }catch(e){
            val1=JSON.parse(data2) || []
           }

           try{
           val2=data3 || [] //JSON.parse(data)
           }
          catch(e){
            
            val2=JSON.parse(data3) || [] //JSON.parse(data)
           }
            
           console.log(val1,"this is the val1 value")

           setPortfoliocardvalues(val1)
           
           setPortfolioGraphvalues(val2)

          
         
            if(stateValues.length>0)
            {
                
                stateValues.map(val=>{
                setsheetmethod(val.sheetmethod)
                setallSheets(val.allSheets)
                setselectedSheetId(val.selectedSheetId)
                setsheetJson(val.sheetJson)
                setsheetKeys(val.sheetKeys)
                setselectedImageField(val.selectedImageFiled)
                setshowHistory(val.showHistory)
                setshowimagePopup(val.showimagepopup)
                setsheetname(val.sheetname)
                setselectfield(val.selectfield)
               
                
                })
            }
            setloading(false)
        }
        
        setStateValues()
        
    },[realtimeportfoliostate,selectedTab])


    const handlesavestate=async()=>{
        const organization=`${Logorganization}_Topcards`
        const organization1=Logorganization
        const organization2=`${Logorganization}_ShownGraph`
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`,{
            email:Logemail,
            organization:organization,
            portfolioState:JSON.stringify(portfoliocardsdata),
            sharedwith:JSON.stringify(sharedwithusers),
            organization1:organization1,
            organization2:organization2,
            
            
        },{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })




            // useEffect(()=>{
            //     handlesavestate()
            // },[portfoliocardsdata])


                    console.log(response)
                    if(response.data.status==200){
                        alert("State Saved")
                    }
                
            }
 
    
    

    const handleselect=async()=>{
        
        const constructPortfolioState=[{sheetmethod:'',allSheets:allSheets,selectedSheetId:selectedSheetId,sheetJson:sheetJson,sheetKeys:sheetKeys,selectedImageFiled:selectedImageFiled,showHistory:true,showimagepopup:!showimagepopup,sheetname:sheetname,selectfield:selectfield}]
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/setportfoliostate`,{
            email:Logemail,
            security:portfoliosecurity,
            Historyorganization:Logorganization,
            portfolioState:JSON.stringify(constructPortfolioState)
        },{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
        if(response.data.status==200)
        {
            setshowHistory(true)
            setsheetmethod('')
            setshowimagePopup(!showimagepopup)
        }
        
        
    }
    const [clickedDots,setclickedDots]=useState(false)

    useEffect(()=>{
        const setavailableDatabaseSheets=async()=>{
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/alluploadedFiles`,{organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
              
            const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/get-document-visibility`,{
                email:Logemail,
                organization:Logorganization
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            const set2DocsIds=response2.data.allfiles.map(doc=>doc.Document_id)
            
            const filteredSet1=response.data.data.filter(doc=>!set2DocsIds.includes(doc._id))
            const tosetdata=[...response2.data.data,...filteredSet1]

            
            setallSheets(tosetdata)
          

        }

        const setavailableGoogleDatabaseSheets=async()=>{
            const response3=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-drivesheets`,{
                email:Logemail,
                organization:Logorganization
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            if(response3.data.status==200 && response3.data.message!="no refresh token found")
            {
                const files=response3.data.data
                setallSheets(files)
            }
            else{
                setallSheets([])
            }
            
          
            

        }
        
        try{
            if(sheetmethod=='Database')
                {
                    setavailableDatabaseSheets()
                }
                else if(sheetmethod=='Google Sheet')
                {
                    setavailableGoogleDatabaseSheets()
                }
        }catch(e)
        {
            if(sheetmethod=='Database')
                {
                    setavailableDatabaseSheets()
                }
                else if(sheetmethod=='Google Sheet')
                {
                    setavailableGoogleDatabaseSheets()
                }
        }
    },[])

    useEffect(()=>{
        const setavailableDatabaseSheets=async()=>{
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/alluploadedFiles`,{organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/get-document-visibility`,{
                email:Logemail,
                organization:Logorganization
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            const set2DocsIds=response2.data.allfiles.map(doc=>doc.Document_id)
            
            const filteredSet1=response.data.data.filter(doc=>!set2DocsIds.includes(doc._id))
            const tosetdata=[...response2.data.data,...filteredSet1]

            
            setallSheets(tosetdata)
        }

        const setavailableGoogleDatabaseSheets=async()=>{
            const response3=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-drivesheets`,{
                email:Logemail,
                organization:Logorganization
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            if(response3.data.status==200 && response3.data.message!="no refresh token found")
            {
                const files=response3.data.data
                setallSheets(files)
            }
            else{
                setallSheets([])
            }
          
            
        }
    

        try{
            if(sheetmethod=='Database')
                {
                    setavailableDatabaseSheets()
                }
                else if(sheetmethod=='Google Sheet')
                {
                    setavailableGoogleDatabaseSheets()
                }
        }catch(e){
            if(sheetmethod=='Database')
                {
                    setavailableDatabaseSheets()
                }
                else if(sheetmethod=='Google Sheet')
                {
                    setavailableGoogleDatabaseSheets()
                }
        }
    },[sheetmethod])

    useEffect(()=>{
     
        const setJSon=async()=>{
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/sheetfromdb`,{id:selectedSheetId,organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            const data=JSON.parse(response.data.data)
          
            setsheetJson(data)
          
            const key=Object.keys(data[0])
            
            const fileteredKey=[]
            data.map(d=>{
                key.map(k=>{
                    if(d[k]!=""&&!fileteredKey.includes(k)){
                    fileteredKey.push(k)
                    }
                }
                )
            })
         
            setsheetKeys(fileteredKey)
        }
        const googleSheetJson=async()=>{
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/get-google-sheet-json`,{sheetId:selectedSheetId,email:Logemail,organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
        

            if(response.data.status==200)
            {
            const allJson=response.data.data
            
            const keys=allJson[0].data
            const finalJson=[]
            allJson.map(val=>{
                if(val.rowIndex!=1)
                {
                    const result=keys.reduce((obj,key,value)=>{obj[key]=val.data[value]; return obj},{})
                    finalJson.push(result)
                }
            })

        const data=finalJson
        setsheetJson(data)
          
            const key=Object.keys(data[0])
            
            const fileteredKey=[]
            data.map(d=>{
                key.map(k=>{
                    if(d[k]!=""&&!fileteredKey.includes(k)){
                    fileteredKey.push(k)
                    }
                }
                )
            })
        
            setsheetKeys(fileteredKey)
        }else{
            setsheetKeys(['none'])
        }
        
        }
        try{
            if(sheetmethod=='Database')
                {
                    setJSon()
                }
                if(sheetmethod=='Google Sheet')
                {
                    googleSheetJson()
                }
        }catch(e){
            if(sheetmethod=='Database')
                {
                    setJSon()
                }
                if(sheetmethod=='Google Sheet')
                {
                    googleSheetJson()
                }
        }
        
        
    },[selectedSheetId,sheetedited])

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setclickedPortfolioShared(false);
        }
    };

    useEffect(() => {
        if (clickedportfolioshared) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [clickedportfolioshared]);

    const handleGooglesheet=async()=>{
        const response=await axios.post(`${import.meta.env.VITE_HOST_URL}1222/check-login-google`,{
            email:Logemail,
            organization:Logorganization
          },{
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })  
          if(response.data.status==400)
          {
              alert('Google Session Ended')
              return
          }
          else if(response.data.status==200 && response.data.msg=="no refresh token found")
          {
            alert('Google account not connected')
            return
          }
          else if(response.data.status==-200)
          {
            alert('Google account not connectd')
            return
          }
    }

    const handleselectedportfoliotab=(email)=>{
        setselectedTab(email)
      }
    

    

    const settingupTabs=async()=>{
            const response=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/get-public-portfoliostate`,{organization:Logorganization},{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            const response2=await axios.post(`${import.meta.env.VITE_HOST_URL}8999/get-shared-portfoliostate`,{
                organization:Logorganization,
                email:Logemail
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
            let publicdata=[]
            let privatedata=[]
            if(response.data.status==200)
            {
                if(response.data.data.length>0)
                {
                    publicdata=response.data.data
                    
                }
            }
            if(response2.data.status==200)
            {
                if(response2.data.data.length>0)
                {
                    privatedata=response2.data.data
                }
            }
            const mydata=[{email:Logemail}]
            const combined=[...mydata,...publicdata,...privatedata]
            const uniqueCombined = combined.filter(
                (value, index, self) =>
                  index === self.findIndex((obj) => obj.email === value.email)
              );
            setallportfoliotabs(uniqueCombined)
        }

    useEffect(()=>{
        
        settingupTabs()
        
    },[])


    useEffect(()=>{
        
        settingupTabs()
        
    },[realtimeportfoliostate])

    

    

    // useEffect(()=>{
    //     handlesavestate()
    // },[portfoliocardsdata])
   

    const PortfolioCard=[]
    portfoliocardsdata.map((val=>{
        PortfolioCard.push({"Label Name":val.labelname,"Values":val.showValue})
    }))


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setclickedDots(false); // Close the popup
            }
        };

        if (clickedDots) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [clickedDots]);
    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setclickedPortfolioShared(false)
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(()=>{
        const mergedData = {
            investmentHistory: {
                keys: sheetKeys,
                data: sheetJson,
                
               
            },
                PortfolioCard,
               ChartData:{ sheetJson1
               },
               MeterPercentage:{percentage1}
            
        };
    sessionStorage.setItem("Bot_Data",JSON.stringify(mergedData))
   
    
        },[sheetJson,sheetKeys,portfoliocardsdata,sheetJson1])
  return (
    <div className={`${hidenavbar?'pl-[6%] w-[100%]':'ml-[21%] w-[79%]'} p-4 font-noto  flex flex-col space-y-4 bg-gray-100`}> 
        <div className=' w-[100%] scrollbar-hide  items-end pb-1 pl-2 mt-1 overflow-x-auto h-[40px] bg-white rounded-lg flex flex-row '>
                    
                    {
                        allportfoliotabs?.length>0 && !clickedportfolioshared?
                        allportfoliotabs.map((val, index)=>
                            
                            <div onClick={()=>handleselectedportfoliotab(val.email)} key={val.id} className={`cursor-pointer p-2 h-[30px] w-[200px] flex items-center justify-center 
          ${selectedTab === val.email ? 'bg-gray-100  rounded-lg' : 'bg-white boder-l border-r border-gray-300'}
          ${selectedTab === val.email && index > 0 ? '' : ''}
          ${selectedTab === val.email && index <  allportfoliotabs.length - 1 ? '' : ''}
          ${selectedTab !== val.email && selectedTab ===  allportfoliotabs[index - 1] ? 'border-l-0' : ''}
          ${selectedTab !== val.email && selectedTab ===  allportfoliotabs[index + 1] ? 'border-r-0' : ''}`}
          style={{
            zIndex: selectedTab === val.email ? 10 : 1, // Raise the selected tab
          }}


        >
                                <p className='text-[10px] font-inter font-semibold'>{val.email}</p>
                                {selectedTab === val.email && (
          <p className=' text-green-600 ml-1 mt-0.5'>
          <TbCircleDotFilled size={12}/>
          </p>
        )}
                            </div>
                            
                            
                        )
                        :
                        <></>
                    }
                    
                </div>
        <div className=' h-[60px] p-2 w-[100%] flex  flex-row rounded-md'>
        
            <div className='w-[90%] space-x-2 flex items-center justify-start'>
                <p className='text-[30px]  tracking-wider font-inter font-semibold '>
                    Portfolio
                </p>
                {/*div for portfolio tabs */}
                


            </div>
            <div className='w-[20%] flex items-center justify-end space-x-2'>
                {
                    selectedTab==Logemail?
                    <div className='flex flex-row space-x-4 items-center justify-center'>
                  
                            <div className='flex flex-row space-x-2 '>
                                <div onClick={()=>setclickedPortfolioShared(true)} className='w-[24px] h-[24px] cursor-pointer'>
                                {
                                    portfoliosecurity=='private'?
                                    <IoMdEyeOff size={24 }/>
                                    :
                                    <MdOutlineRemoveRedEye size={24 } />
                                }
                              
                                </div>
                            {/* <div onClick={()=>setclickedportfolioremoveshared(true)} className='w-[20px] h-[20px]  '>
                            <MdGroupRemove size={20} className='mr-12 cursor-pointer'/>
                            </div> */}
                        </div>
                    
                    {/* <select className='h-[30px]  font-inter font-bold text-[12px] rounded-md' value={portfoliosecurity} onChange={(e)=>{setportfoliosecurity(e.target.value)}}>
                        <option value='public'>Public</option>
                        <option value='private'>Private</option>
                    </select> */}
                    
                </div>
                :
                <></>
                }
                
            </div>
        </div>
        <div className='w-[100%]  flex flex-col'>{/*Portfolio content */}
            <PortfolioTop PortfolioGraphvalues={PortfolioGraphvalues} Portfoliocardvalues={Portfoliocardvalues} PortfolioMetervalue={PortfolioMetervalue} selectedTab={selectedTab} setportfoliocardsdata={setportfoliocardsdata} portfoliosecurity={portfoliosecurity} realtimeportfoliostate={realtimeportfoliostate} selectedSheetId={selectedSheetId} hidenavbar={hidenavbar} sheetedited={sheetedited}/>
        </div>

        <div className='tracking-wider    select-none mt-[20px] w-[100%] bg-white rounded-xl p-4 flex flex-col space-y-2 font-noto'>
            <div className='flex flex-col  space-y-3'>
                <div className='h-[50px] w-[100%] flex flex-row'>
                    <p className='flex w-[50%] text-[16px] font-inter font-semibold tracking-wider'>Investment History</p>
                    <div className=' w-[75%]  flex flex-row justify-end '>
                        {
                            clickedDots && showHistory?
                            <div ref={popupRef} className='border-[1px] mr-52 mt-8 w-[180px] p-3  h-[120px] z-[40]  bg-white border-gray-300 rounded-md'>
                                <div onClick={()=>{setsheetmethod('Database'); setselectfield(false);setclickedDots(false);}} className={`${sheetmethod=='Database'?'bg-white':''} p-1 hover:bg-gray-100 flex items-center rounded-md text-[14px] font-roboto`}>
                                                <FaDatabase className='text-gray-700'/>
                                                <p className='p-2 cursor-pointer font-inter'>Database</p>
                                            </div>
                                            <div onClick={()=>{setsheetmethod('Google Sheet'); setselectfield(false);setclickedDots(false)}} className={`${sheetmethod=='Google Sheet'?'bg-white':''} p-1 hover:bg-gray-100 flex items-center rounded-md text-[14px] font-roboto`}>
                                                <FaDatabase className='text-gray-700'/>
                                                <p className='p-2 cursor-pointer font-inter'>Google Sheet</p>
                                            </div>
                            </div>
                            :<></>
                        }
                        {
                            showHistory && selectedTab==Logemail?
                            <div className='h-[30px] flex items-center absolute right-56 mt-2' onClick={()=>{setclickedDots(!clickedDots)}}>
                                <BsThreeDotsVertical className='cursor-pointer'/>
                            </div>
                            :
                            <></>
                        }
                        
{/* 
                        <div className='w-[90px] text-[14px] rounded-md space-x-2 h-[30px] border-[1px] border-gray-300 items-center justify-center font-inter font-semibold flex flex-row'>
                            <RiFilter3Line size={15}/>
                            <p>Filters</p>
                        </div>
                         */}

                         <div className='relative'>
                                    

                                    {/* Filter options pop-up */}
                                    {/* {showFilterMenu && (
                                        <div className='absolute right-0 mt-2 w-[200px] p-3 bg-white border-gray-300 border-[1px] rounded-md z-50'>
                                            <div
                                                className='p-1 hover:bg-blue-500 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer'
                                                onClick={() => handleFilterSelection('Investor Name')}>
                                                <p className='p-2'>Investor Name</p>
                                            </div>
                                            <div
                                                className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-inter font-semibold cursor-pointer'
                                                onClick={() => handleFilterSelection('Amount Invested')}>
                                                <p className='p-2'>Amount Invested</p>
                                            </div>
                                            <div
                                                className='p-1 hover:bg-blue-400 flex items-center rounded-md text-[12px] font-inter font-semibold cursor-pointer'
                                                onClick={() => handleFilterSelection('Total Invested Amount')}>
                                                <p className='p-2'>Total Invested Amount</p>
                                            </div>
                                        </div>
                                    )} */}

                                    {/* Sorting options pop-up */}
                                    {/* {showSortMenu && (
                                        <div className='absolute right-0 mt-2 w-[200px] p-3 bg-white border-gray-300 border-[1px] rounded-md z-50'>
                                            <div
                                                className='p-1 hover:bg-blue-500 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer'
                                                onClick={() => handleSortSelection('Ascending')}>
                                                <p className='p-2'>Ascending</p>
                                            </div>
                                            <div
                                                className='p-1 hover:bg-blue-500 flex items-center rounded-md text-[12px] font-semibold font-inter cursor-pointer'
                                                onClick={() => handleSortSelection('Descending')}>
                                                <p className='p-2'>Descending</p>
                                            </div>
                                        </div>
                                    )} */}
                                </div>  
                    </div>
                </div>
                <div className={`w-[100%] flex justify-center items-center ${showHistory?'':'h-[150px]'} `}>
                    {
                        !showHistory && !loading && Logemail==selectedTab?
                        <div className='w-[500px] h-[100%] space-x-4 items-center justify-center flex mt-8'>
                            <div onClick={()=>{setsheetmethod('Database'); setselectfield(false)}} className='cursor-pointer flex flex-col w-[130px] h-[50px] bg-gradient-to-r font-inter font-bold from-blue-500 to-blue-700 text-[14px] rounded-md text-white items-center p-2 justify-center'>
                                <p>Select sheet from Database</p>
                            </div>
                            <div onClick={()=>{setsheetmethod('Google Sheet'); setselectfield(false)}} className='cursor-pointer flex flex-col w-[130px] h-[50px] bg-gradient-to-r   font-inter font-bold from-blue-500 to-blue-700 text-[14px] rounded-md text-white items-center p-2 justify-center'>
                                <p>Select sheet from Google</p>
                            </div>
                        </div>
                      :
                    <></>
                    }
                    {
                        selectfield?
                        <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-black bg-opacity-40  top-0  fixed flex items-center justify-center z-[80]`}>
                            <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' >
                                <div onClick={()=>{setselectfield(false);setsheetmethod('')}} className='cursor-pointer h-[50px]'>
                                    <RxCross2/>
                                </div>
                                <div onClick={()=>{setsheetmethod('Database'); setselectfield(false)}} className={`${sheetmethod=='Database'?'bg-white':''} p-1 hover:bg-gray-100 flex items-center rounded-md text-[14px] font-roboto`}>
                                    <FaDatabase className='text-gray-700'/>
                                    <p className='p-2 cursor-pointer'>Database</p>
                                </div>
                                <div onClick={()=>{setsheetmethod('Google Sheet'); setselectfield(false)}} className={`${sheetmethod=='Google Sheet'?'bg-white':''} p-1 hover:bg-gray-100 flex items-center rounded-md text-[14px] font-roboto`}>
                                    <FaDatabase className='text-gray-700'/>
                                    <p className='p-2 cursor-pointer'>Google Sheet</p>
                                </div>
                                
                            </div>
                        </div>
                        :
                    <></>
                    }
                    {
                        !selectfield && sheetmethod!="Google Sheet" && sheetmethod!="" ?
                        <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-black bg-opacity-40  top-0  fixed flex items-center justify-center z-[80]`}>
                            <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' >
                                {
                                    clickedDots?
                                    <div onClick={()=>{setselectfield(!selectfield);setsheetmethod('Database')}} className='cursor-pointer h-[50px]'>
                                        <IoMdArrowBack />
                                    </div>
                                    :
                                    <div onClick={()=>{setselectfield(false);setsheetmethod("")}} className='cursor-pointer h-[50px]'>
                                        <RxCross2/>
                                    </div>
                                }
                                <div className='flex items-center justify-center'><p className='font-inter font-semibold flex justify-center items-center text-white bg-blue-500 p-2 w-[280px] rounded-md mt-4 mb-4'>Select sheet from database</p></div>
                                <div  className={`${sheetmethod=='Database'?'bg-white':''} p-1 flex items-center rounded-md text-[14px] flex-col font-roboto overflow-y-auto  scrollbar-hide`}style={{ maxHeight: '320px' }}>
                                {(allSheets||[]).map(doc=>
                                        doc.fileType=='xlsx'?
                                        <DatabaseSheets setsheetname={setsheetname} showimagepopup={showimagepopup} setshowimagePopup={setshowimagePopup} setsheetmethod={setsheetmethod} key={doc._id} sheetKeys={sheetKeys} selectedImageFiled={selectedImageFiled} setselectedImageField={setselectedImageField} id={doc._id} setportfolioHistory={setshowHistory} setshowHistory={setshowHistory} sheetname={doc.name} setselectedSheetId={setselectedSheetId}/>
                                        :
                                        <></>
                                    )}  
                                </div>
                                
                                
                            </div>
                        </div>
                        :
                        <></>
                    }

                    {
                        !selectfield && sheetmethod!="Database" && sheetmethod!="" ?
                        <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-black bg-opacity-40  top-0  fixed flex items-center justify-center z-[80]`}>
                            <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md'>
                                {
                                    clickedDots?
                                    <div onClick={()=>{setselectfield(!selectfield);setsheetmethod('Google Sheet')}} className='cursor-pointer h-[50px]'>
                                        <IoMdArrowBack />
                                    </div>
                                    :
                                    <div onClick={()=>{setselectfield(false);setsheetmethod("")}} className='cursor-pointer h-[50px]'>
                                       <RxCross2/>
                                    </div>
                                }
                                <div className='flex items-center justify-center'><p className='font-inter font-semibold flex justify-center items-center text-white bg-blue-500 p-2 w-[280px] rounded-md mt-4 mb-4'>Select from google sheet</p></div>
                                <div className={`${sheetmethod=='Google Sheet'?'bg-white':''} p-1 flex items-center rounded-md text-[14px] flex-col font-roboto overflow-y-auto scrollbar-hide`}style={{ maxHeight: '320px' }}>
                                {(allSheets||[]).map(doc=>
                                        <GoogleSheetDatabaseSheets setsheetname={setsheetname} showimagepopup={showimagepopup} setshowimagePopup={setshowimagePopup} setsheetmethod={setsheetmethod} key={doc.id} sheetKeys={sheetKeys} selectedImageFiled={selectedImageFiled} setselectedImageField={setselectedImageField} id={doc.id} setportfolioHistory={setshowHistory} setshowHistory={setshowHistory} sheetname={doc.name} setselectedSheetId={setselectedSheetId}/>
                                        
                                    )}  
                                </div>
                                
                                
                            </div>
                        </div>
                        :
                        <></>
                    }

                            {
                                showimagepopup && sheetmethod!="Google Sheet" && sheetmethod!=""   ?
                                <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-black bg-opacity-40  top-0  fixed flex items-center justify-center z-[80]`}>
                                    <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' >
                                        
                                        <div className='w-[100%] h-[20%] flex space-x-2 items-start justify-start'>
                                            <div className='flex items-center justify-center h-[40px]' onClick={(()=>{setshowimagePopup(false); setsheetmethod('Database')})}>
                                            <IoMdArrowBack  className=' cursor-pointer' size={17}/>
                                            </div>
                                            <div className='text-gray-500 h-[40px] text-[15px] flex items-center justify-center'>
                                                {sheetname}
                                            </div>
                                            
                                        </div>
                                        <div className=' w-[100%] h-[40%] flex flex-col items-center justify-center space-y-8 space-x-2'>
                                            <p className='text-[15px] text-white'>select image field</p>
                                            <select onChange={(e)=>setselectedImageField(e.target.value)} className='w-[220px] h-[30px] text-[14px] text-gray-700 rounded-md border-gray-300 border-[1px]'>
                                                            
                                                {sheetKeys.map(k=>
                                                    <option key={k._id}>{k}</option>
                                                    )
                                                }

                                            </select>
                                        </div>
                                        <div className='w-[100%] mt-[14px] flex flex-row items-center justify-center'>
                                            <div onClick={handleselect} className='select-none cursor-pointer flex flex-row w-[120px] rounded-md h-[40px] items-center justify-center bg-gradient-to-r from-green-500 to-green-800 spae-x-2'>
                                                <p className='text-[14px] text-white'>Set image key</p>
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                    :
                                    <></>
                        }

{
                                showimagepopup && sheetmethod!="Database" && sheetmethod!=""   ?
                                <div className={`${hidenavbar?'w-[100%]':'left-[20%] w-[80%]'}  h-screen bg-black bg-opacity-40  top-0  fixed flex items-center justify-center z-[80]`}>
                                    <div className='p-2 flex flex-col  w-[360px] h-[430px] space-y-2 bg-white  z-[40]  rounded-md' >
                                        
                                        <div className='w-[100%] h-[20%] flex space-x-2 items-start justify-start'>
                                            <div className='flex items-center justify-center h-[40px]' onClick={(()=>{setshowimagePopup(false); setsheetmethod('Google Sheet')})}>
                                            <IoMdArrowBack  className=' cursor-pointer' size={17}/>
                                            </div>
                                            <div className='text-gray-500 h-[40px] text-[15px] flex items-center justify-center'>
                                                {sheetname}
                                            </div>
                                            
                                        </div>
                                        <div className=' w-[100%] h-[40%] flex flex-col items-center justify-center space-y-8 space-x-2'>
                                            <p className='text-[15px] text-white'>select image field</p>
                                            <select onChange={(e)=>setselectedImageField(e.target.value)} className='w-[220px] h-[30px] text-[14px] text-gray-700 rounded-md border-gray-300 border-[1px]'>
                                                            
                                                {sheetKeys.map(k=>
                                                    <option key={k._id}>{k}</option>
                                                    )
                                                }

                                            </select>
                                        </div>
                                        <div className='w-[100%] mt-[14px] flex flex-row items-center justify-center'>
                                            <div onClick={handleselect} className='select-none cursor-pointer flex flex-row w-[120px] rounded-md h-[40px] items-center justify-center bg-gradient-to-r from-green-500 to-green-800 spae-x-2'>
                                                <p className='text-[14px] text-white'>Set image key</p>
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                    :
                                    <></>
                        }
                </div>
            </div>  
            {
             loading?
             
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Bars color="#8884d8" height={80} width={80} />
            </div>
                : 
            ((showHistory &&!selectfield)||(!clickedDots&&sheetmethod.length>0)) && !loading?
            <div className='overflow-y-auto h-[100%]' >
                <PortfolioHistory realtimeportfoliostate={realtimeportfoliostate} selectedImageFiled={selectedImageFiled} setportfolioHistory={setshowHistory} sheetKeys={sheetKeys}  
                    selectedFilter={selectedFilter}
                                    selectedSort={selectedSort}
                                    sheetJson={sheetJson}
                />
            </div>
            :
        <></>
        }

        <div className='h-[120px] '>

        </div>
        
        
        </div>

        {
            clickedportfolioshared?
            <div className='fixed overflow-hidden left-0 w-[100%] top-[-2.2%] h-[100%] bg-opacity-40 bg-black'>
            <div ref={popupRef} className=''>
                <PortfolioShared setclickedportfolioremoveshared={setclickedportfolioremoveshared} mainportfoliosecurity={portfoliosecurity} PortfoliosharedWithUsers={PortfoliosharedWithUsers}  realtimeportfoliostate={realtimeportfoliostate} setsharedwithusers={setsharedwithusers} hidenavbar={hidenavbar} setclickedPortfolioShared={setclickedPortfolioShared} handlesavestate={handlesavestate} sharedwithusers={sharedwithusers} />
            </div>
            </div>
            :
            <></>
        }
        {
            clickedportfolioremoveshared?
            <div className='fixed overflow-hidden left-0 w-[100%] top-[-2.2%] z-[60] h-screen bg-opacity-40 bg-black'>
                <PortfolioRemoveSharedUsers setPortfolioSharedwithusers={setPortfolioSharedwithusers} setclickedportfolioremoveshared={setclickedportfolioremoveshared} setclickedPortfolioShared={setclickedPortfolioShared} mainportfoliosecurity={portfoliosecurity} PortfoliosharedWithUsers={PortfoliosharedWithUsers} realtimeportfoliostate={realtimeportfoliostate} setsharedwithusers={setsharedwithusers} hidenavbar={hidenavbar}  />
            </div>
            :
            <></>
        }
        
    </div>
  )
}

export default Portfolio