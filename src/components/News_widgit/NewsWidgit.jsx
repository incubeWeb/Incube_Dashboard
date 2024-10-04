import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import { IoMdClose } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";

const NewsWidgit = ({ id, boxes, setBoxes }) => {
    const [fetchedNews, setFetchedNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const setNews = async () => {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/googlenewssearch`, {
                search: "latest startup news"
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
        const email = localStorage.getItem('email');
        const organization = localStorage.getItem('organization');
        const position = JSON.stringify(boxes.filter((box, index) => index !== id));

        if (boxes.length === 0) {
            await axios.post(`${import.meta.env.VITE_HOST_URL}8999/deletedashboard`, { email, organization });
            setBoxes([]);
        } else {
            const response = await axios.post(`${import.meta.env.VITE_HOST_URL}8999/updatedashboard`, { email, position, organization });
            if (response.data.status === 200) {
                setBoxes(boxes.filter((box, index) => index !== id));
            }
        }
    };

    return (
        <div className='w-[100%] h-[100%] flex flex-col font-sans'>
            {/* Header with Red Background and Diagonal Effect */}
            <div className='w-[100%] h-[40px] relative  flex items-center justify-between px-4'
            
            style={{
                     background: 'linear-gradient(90deg, #1e3a8a, #2563eb)', // Blue gradient
                 }}>
            
                <p className='text-white text-[19px] tracking-wider font-sans font-bold'>News</p>
                {/* Diagonal effect */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#fff',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                    }}
                ></div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className='w-[100%]' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Bars color="#8884d8" height={80} width={80} />
                </div>
            ) : (
                <div className='flex flex-col space-y-2 h-[85%] overflow-y-auto'
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
