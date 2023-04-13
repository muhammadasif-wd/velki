import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Shared/Loader";
import TopBar from "../Shared/TopBar";
import { ServerAPI } from "../API/ServerAPI";
import ModalImage from "react-modal-image";
import AuthUser from "../Hooks/AuthUser";

const UserIdentity = () => {
  const { userInfo } = AuthUser()
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const [identityData, setIdentityData] = useState([])

  useEffect(() => {
    fetch(`${ServerAPI}/identity?username=${userInfo?.username}`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setIdentityData(data?.data)
      })
  }, [userInfo])



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <TopBar name={"User Identity"} />
          {identityData?.map(d => {
            return (
              <div key={d?._id}>
                <table className="table-auto">
                  <thead>
                    <tr>
                      <th className="w-40 text-start border border-primary p-1">ID</th>
                      <th className="w-40 text-start border border-primary p-1">Name</th>
                      <th className="w-40 text-start border border-primary p-1">Date of birth</th>
                      <th className="w-40 text-start border border-primary p-1">Address</th>
                      <th className="w-40 text-start border border-primary p-1">Phone</th>
                      <th className="w-40 text-start border border-primary p-1">Whatsapp</th>
                      <th className="w-40 text-start border border-primary p-1">Voter ID Card</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="w-40 text-start border border-primary p-1">{d?._id}</td>
                      <td className="w-40 text-start border border-primary p-1">{d?.name}</td>
                      <td className="w-40 text-start border border-primary p-1">{d?.date}</td>
                      <td className="w-40 text-start border border-primary p-1">{d?.address}</td>
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
          <Link to={identityData?.length > 0 ? "no-add-user-details" : "user-details-add"}>
            <button>
              <p className="border border-dark/10 mt-5 w-[26px] rounded bg-dark text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6h-2Z"
                  />
                </svg>
              </p>
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default UserIdentity;
