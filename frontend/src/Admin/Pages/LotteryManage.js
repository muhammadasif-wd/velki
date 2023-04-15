import React, { useEffect, useState } from 'react';
import Loader from '../../Shared/Loader';
import { useNavigate } from 'react-router-dom';
import AuthUser from '../../Hooks/AuthUser';
import { ServerAPI } from '../../API/ServerAPI';
import Swal from 'sweetalert2';

const LotteryManage = () => {
    const navigate = useNavigate()
    const [commentData, setCommentData] = useState()
    // get user information
    const { userInfo } = AuthUser()
    //loading implement
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    });
    // Fetch user identity information
    useEffect(() => {
        fetch(`${ServerAPI}/lottery`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setCommentData(data?.data)
            })
    }, [userInfo])


    // Delete Identity Information By username
    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this information?",
            icon: "warning",
            confirmButtonText: "Yes ✔",
            showCancelButton: true,
            confirmButtonColor: "#374151",
            background: "#1f2937",
            color: "#fff",
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `${ServerAPI}/lottery/${id}`;
                fetch(url, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((res) => {
                        Swal.fire({
                            title: `${res?.status}`,
                            text: `${res?.message}`,
                            icon: `${res?.icon}`,
                            confirmButtonText: `${res?.confirmButtonText}`,
                            confirmButtonColor: "#374151",
                            background: "#1f2937",
                            color: "#fff",
                        });
                        navigate("/lottery")
                    })
            }
        });
    };

    return (
        <section>
            {loading ? (
                <Loader />
            ) : (
                <div className='h-[80vh] overflow-auto'>
                    {commentData?.map(d => {
                        return (
                            <div key={d?._id}>
                                <table className="table-auto mt-5">
                                    <thead>
                                        <tr>
                                            <th className="w-80 text-start border border-primary p-1">Lottery Name</th>
                                            <th className="w-40 text-start border border-primary p-1">Lottery Prize</th>
                                            <th className="w-40 text-start border border-primary p-1">Lottery Winner</th>
                                            <th className="w-40 text-start border border-primary p-1">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="w-80 text-start border border-primary p-1">{d?.name}</td>
                                            <td className="w-40 text-start border border-primary p-1">{d?.prize}</td>
                                            <td className="w-40 text-start border border-primary p-1">{d?.winner}</td>
                                            <td className="w-40 text-start border border-primary p-1"><button onClick={() => handleDelete(d?._id)} className="bg-primary text-white rounded px-5 py-2">Delete</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    })}
                </div>
            )}
        </section>
    );
};

export default LotteryManage;