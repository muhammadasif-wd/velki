import React from 'react';
import Swal from 'sweetalert2';
import { ServerAPI } from '../../API/ServerAPI';
import { Link, useNavigate } from 'react-router-dom';

const Lottery = () => {
    const navigate = useNavigate()
    const handleLottery = (e) => {
        e.preventDefault()
        const name = e?.target?.name?.value
        const prize = e?.target?.prize?.value
        const winner = e?.target?.winner?.value
        const data = { name, prize, winner }
        // Post identity Data in database
        fetch(`${ServerAPI}/lottery`, {
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
                    navigate("/lottery")
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
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-dark">Post And Comments...</h1>
                <Link to={"show-all"} className='text-info font-bold border border-dark/50 p-2 rounded'>Show</Link>
            </div>
            <form action="" className='flex flex-col gap-3' onSubmit={handleLottery}>
                <input className='outline-none border border-dark/50 rounded p-1 placeholder:text-dark/70 font-medium' type="text" name="name" id="name" placeholder='লটারির নাম' />
                <input className='outline-none border border-dark/50 rounded p-1 placeholder:text-dark/70 font-medium' type="text" name="prize" id="prize" placeholder='প্রাইজ টাইপ' />
                <input className='outline-none border border-dark/50 rounded p-1 placeholder:text-dark/70 font-medium' type="text" name="winner" id="winner" placeholder='উইনার এর আইডি' />
                <input type="submit" value="Submit" className="border border-dark/20 drop-shadow-xl cursor-pointer bg-dark/5 rounded-md py-2" />
            </form>
        </div>
    );
};

export default Lottery;