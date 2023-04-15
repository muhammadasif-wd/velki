import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ServerAPI } from "../../API/ServerAPI";

const AdminDashboard = () => {
    const [users, setUsers] = useState([])
    const [reloader, setReloader] = useState(true);
    const token = localStorage.getItem('access');

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/user", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`
                }
            },
        })
            .then((res) => res.json())
            .then((data) => setUsers(data?.data?.data));
    }, [token]);

    // delete user
    const handleUserDelete = (id) => {
        Swal.fire({
            title: "info!",
            text: "Are you sure delete your user?",
            icon: "info",
            confirmButtonText: 'Yes, delete it!',
            showCancelButton: true,
            confirmButtonColor: "#374151",
            background: "#1f2937",
            color: "#fff",
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `${ServerAPI}/user/${id}`;
                fetch(url, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        Swal.fire({
                            title: "Success ✔",
                            text: "Successfully delete your user!",
                            icon: "info",
                            confirmButtonText: "yes!",
                            confirmButtonColor: "#374151",
                            background: "#1f2937",
                            color: "#fff",
                        });
                        setReloader(!reloader);
                    });
            } else {
                Swal.fire({
                    title: "Info ☺",
                    text: "Now safe your user!",
                    icon: "info",
                    confirmButtonText: "Thank you!",
                    confirmButtonColor: "#374151",
                    background: "#1f2937",
                    color: "#fff",
                });
            }
        });
    };
    return (
        <section>
            <div className="flex gap-2 justify-evenly flex-wrap -z-50">
                <div className="bg-gradient-to-r from-secondary to-primary md:w-96 p-10 drop-shadow-xl rounded-xl border-info border text-center">
                    <p className="font-bold text-2xl text-white">Our total Users</p>
                    <p className="mt-2 text-xl font-bold text-white">{users?.length}</p>
                </div>
            </div>
            <div className="overflow-scroll h-96">
                <table className="table-fixed w-full mt-5">
                    <thead className="w-full">
                        <tr>
                            <th className="text-start border border-secondary p-1 font-medium w-40">
                                No
                            </th>
                            <th className="text-start border border-secondary p-1 font-medium w-40">
                                Name
                            </th>

                            <th className="text-start border border-secondary p-1 font-medium w-40">
                                Delete user
                            </th>
                        </tr>
                    </thead>
                    <tbody className="max-h-10">
                        {
                            users?.map((info, index) => {
                                return <tr key={index}>
                                    <td className="text-start border border-secondary p-1 font-normal">
                                        {index + 1}
                                    </td>
                                    <td className="text-start border border-secondary p-1 font-normal">
                                        {info.username}
                                    </td>

                                    <td className="text-start border border-secondary p-1 font-normal">
                                        <button onClick={() => handleUserDelete(info._id)} className="bg-danger text-dark px-5 py-2 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>

            {/* <div>
                <BarChart />
            </div> */}
        </section>
    );
};

export default AdminDashboard;