import React, { useEffect, useState } from "react";
import ModalImage from "react-modal-image";
import Loader from "../../Shared/Loader";
import AuthUser from "../../Hooks/AuthUser";
import { ServerAPI } from "../../API/ServerAPI";


const UserIdentity = () => {
    const { userInfo } = AuthUser()
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    //loading implement
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    });
    const handleSearchChange = (event) => {
        const search = event.target.value;
        setSearchText(search);
    };
    useEffect(() => {
        fetch(`${ServerAPI}/identity`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('access')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                let searchTextLowercase = searchText.toLocaleLowerCase()
                const match = data?.data?.filter(
                    (d) =>
                        d?.username.toLocaleLowerCase().includes(searchTextLowercase) ||
                        d?.number.includes(searchText)
                );
                setSearchResult(match);
            });

    }, [userInfo, searchText])


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="md:h-[82vh] md:overflow-auto my-5">
                    <form action="">
                        <input onChange={handleSearchChange} type="search" name="search" id="search" placeholder="Search by username or number" className="placeholder:text-dark outline-none border rounded border-dark/50 p-1 w-full" />
                    </form>
                    {searchResult?.map((d, index) => {
                        return (
                            <div key={d?._id} className="overflow-auto">
                                <table className="table-fixed w-full mt-3">
                                    <thead>
                                        <tr>
                                            <th className="w-10 text-start border border-primary p-1">No</th>
                                            <th className="w-72 text-start border border-primary p-1">ID</th>
                                            <th className="w-40 text-start border border-primary p-1">Name</th>
                                            <th className="w-40 text-start border border-primary p-1">Date of birth</th>
                                            <th className="w-72 text-start border border-primary p-1">Address</th>
                                            <th className="w-40 text-start border border-primary p-1">Phone</th>
                                            <th className="w-40 text-start border border-primary p-1">Whatsapp</th>
                                            <th className="w-40 text-start border border-primary p-1">Voter ID Card</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="w-10 text-start border border-primary p-1">{index + 1}</td>
                                            <td className="w-72 text-start border border-primary p-1">{d?._id}</td>
                                            <td className="w-40 text-start border border-primary p-1">{d?.name}</td>
                                            <td className="w-40 text-start border border-primary p-1">{d?.date}</td>
                                            <td className="w-72 text-start border border-primary p-1">{d?.address}</td>
                                            <td className="w-40 text-start border border-primary p-1">{d?.number}</td>
                                            <td className="w-40 text-start border border-primary p-1">{d?.whatsapp}</td>
                                            <td className="w-40 text-start border border-primary p-1">
                                                <ModalImage
                                                    small={d?.img}
                                                    large={d?.img}
                                                    className="h-20 w-20"
                                                /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    })}

                </div>
            )}
        </>
    );
};

export default UserIdentity;