import React, { useEffect, useState } from 'react';
import { ServerAPI } from '../API/ServerAPI';
import AuthUser from '../Hooks/AuthUser';
import { useParams } from 'react-router-dom';

const CommentPostInformation = () => {
    const { userInfo } = AuthUser()
    const { id } = useParams()


    const [commentData, setCommentData] = useState()

    // Fetch user identity information
    useEffect(() => {
        fetch(`${ServerAPI}/add-comment/${id}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setCommentData(data);
            })
    }, [userInfo, id])
    return (
        <div>
            {commentData?.data?.commentData?.map((d, index) => {
                return (
                    <div key={index}>
                        <div className='flex border p-1 border-dark/50 rounded mt-1'><p className='w-40'>লটারীর নামঃ </p> <p>{d?.name}</p></div>
                        <div className='flex border p-1 border-dark/50 rounded mt-1'><p className='w-40'>লটারীর নাম্বারঃ </p> <p>{d?.number}</p></div>
                        <div className='flex border p-1 border-dark/50 rounded mt-1'><p className='w-40'>কমেন্ট করার কোডঃ </p> <p>{d?.code}</p></div>
                        <div className='flex border p-1 border-dark/50 rounded mt-1'><p className='w-40'>লটারীর পোষ্ট লিঙ্কঃ </p><a className='text-info hover:underline' href={d?.link} target='_blank' rel="noreferrer">{d?.link}</a></div>
                    </div>
                )
            })}
        </div>
    );
};

export default CommentPostInformation;