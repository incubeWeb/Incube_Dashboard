import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { IoMdClose } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import { jwtDecode } from 'jwt-decode';

const NewsWidgit = ({ id, boxes, setBoxes,setdashboardbotdata }) => {
    const [fetchedNews, setFetchedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const token=localStorage.getItem('token')
    const userdata=jwtDecode(token)
    const Logemail=userdata.userdetails.email
    const Logorganization=userdata.userdetails.organization
    const Logrole=userdata.userdetails.role

    useEffect(() => {
        const setNews = async () => {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/googlenewssearch`, {
                search: "latest startup news"
            },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
            if (response.data.status === 200) {
                setFetchedNews(response.data.data.Results);
            
            }

            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };
        setNews();
    }, []);

    const deleteWidgit = async () => {
        const email = Logemail;
        const organization = Logorganization;
        const position = JSON.stringify(boxes.filter((box, index) => box.id !== id));

        if (boxes.length === 0) {
            await axios.post(`${import.meta.env.VITE_HOST_URL}8999/deletedashboard`, { email, organization },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
            setBoxes([]);
        } else {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updatedashboard`, { email, position, organization },{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              });
            if (response.data.status === 200) {
                setBoxes(boxes.filter((box, index) => box.id !== id));
            }
        }
    };

    useEffect(()=>{
        setdashboardbotdata(prevData => {
            const keyExists = prevData.some(item => Object.keys(item).includes(`NewsInfo`));
            if (keyExists) {
                // Update the value for the existing key
                return prevData.map(item =>
                    Object.keys(item).includes(`NewsInfo`)
                        ? { ...item, [`NewsInfo`]: fetchedNews }
                        : item
                );
            } else {
                // Insert a new object with the key-value pair
                return [...prevData, { [`NewsInfo`]: fetchedNews }];
            }
        });
        },[fetchedNews])

    return (
        <div className='w-[100%] h-[100%] flex flex-col font-sans'>
            {/* Header with Red Background and Diagonal Effect */}
            

            {/* Loading State */}
            {loading ? (
                <div className='w-[100%]' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Bars color="#8884d8" height={80} width={80} />
                </div>
            ) : (
                <div className='flex flex-col space-y-2 h-[95%] overflow-y-auto'
                    style={{
                        overflowY: 'auto',
                        scrollbarWidth: 'none', // For Firefox
                        msOverflowStyle: 'none', // For Internet Explorer and Edge
                    }}>
                    {/* News Cards */}
                    {(fetchedNews || []).map(val => (
                        <a target='_blank' href={val.Link} key={val._id} className='cursor-pointer flex flex-col space-y-2 border-t border-gray-400 p-2'>
                            <div className='flex flex-row space-x-2'>
                                <div className='w-[60%] space-x-2 flex flex-row items-center'>
                                    <IoNewspaperOutline size={20} className='text-gray-600' />
                                    <p className='text-[15px] tracking-wide font-semibold'>{val.Publisher}</p>
                                </div>
                                <div className='w-[50%] flex justify-end'>
                                    <p className='text-[13px]'>{val.PublishedAt}</p>
                                </div>
                            </div>
                            <div>
                                <p className='text-[13px] tracking-wide text-gray-800'>
                                    {val.Description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            )}

            {/* Delete Button */}
            <div className='z-[10] cursor-pointer flex items-center justify-center w-[20px] h-[20px] rounded-full bg-gray-100 fixed right-[-10px] top-[-15px] mt-4 mr-3' onClick={deleteWidgit}>
                <IoMdClose size={15} />
            </div>
        </div>
    );
};

export default NewsWidgit;
