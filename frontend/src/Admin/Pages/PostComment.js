import React from 'react';
import { ServerAPI } from '../../API/ServerAPI';
import { Link } from "react-router-dom"
import Swal from 'sweetalert2';

const PostComment = () => {
    const handlePostComment = (e) => {
        e.preventDefault()
        const name = e?.target?.name?.value
        const number = e?.target?.number?.value
        const code = e?.target?.code?.value
        const link = e?.target?.link?.value
        const data = { name, number, code, link }
        // Post identity Data in database
        fetch(`${ServerAPI}/post-comment`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res?.status === "success") {
                    Swal.fire({
                        title: `${res?.status}`,
                        text: `${res?.message}`,
                        icon: "success",
                        confirmButtonText: "Thank you!",
                        confirmButtonColor: "#374151",
                        background: "#1f2937",
                        color: "#fff",
                    });
                    e?.target?.reset()
                } else {
                    Swal.fire({
                        title: `${res?.status}`,
                        text: `${res?.message}`,
                        icon: "error",
                        confirmButtonText: "Try again!",
                        confirmButtonColor: "#374151",
                        background: "#1f2937",
                        color: "#fff",
                    });
                }
            })
    }
    return (
        <div>
            <form action="" className='flex flex-col gap-3' onSubmit={handlePostComment}>
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-dark">Post And Comments...</h1>
                    <Link to={"show-all"} className='text-info font-bold border border-dark/50 p-2 rounded'>Show</Link>
                </div>
                <input required type="text" name="name" id="name" placeholder='লটারীর নাম' className='font-medium placeholder:text-dark outline-none border border-dark/50 p-1 rounded' />
                <input required type="text" name="number" id="number" placeholder='লটারীর নাম্বার' className='font-medium placeholder:text-dark outline-none border border-dark/50 p-1 rounded' />
                <input required type="text" name="code" id="code" placeholder='কমেন্ট করার কোড' className='font-medium placeholder:text-dark outline-none border border-dark/50 p-1 rounded' />
                <input required type="url" name="link" id="link" placeholder='লটারীর পোষ্ট করার লিঙ্ক' className='font-medium placeholder:text-dark outline-none border border-dark/50 p-1 rounded' />
                <input type="submit" value={"Submit"} className='font-medium placeholder:text-dark outline-none border border-dark/50 p-2 cursor-pointer rounded' />
            </form>
        </div>
    );
};

export default PostComment;