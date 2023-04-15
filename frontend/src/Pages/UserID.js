import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Shared/Loader";
import TopBar from "../Shared/TopBar";
import { ServerAPI } from "../API/ServerAPI";
import AuthUser from "../Hooks/AuthUser";
import Swal from "sweetalert2";

const UserID = () => {
  const navigate = useNavigate()
  const [userIDData, setUserIDData] = useState()
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });
  const { userInfo } = AuthUser()
  // Check user identity
  useEffect(() => {
    fetch(`${ServerAPI}/user-id?username=${userInfo?.username}`, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUserIDData(data?.data)
      })
  }, [userInfo])

  // Delete Identity Information By username
  const handleDelete = (id) => {
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
        const url = `${ServerAPI}/user-id/${id}`;
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
            navigate("/user-id/user-id-add")
          })
      }
    });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <TopBar name={"User ID"} />

          {userIDData?.map(d => {
            return (
              <div key={d?._id} className="overflow-auto">
                <table className="table-auto mt-2">
                  <thead>
                    <tr>
                      <th className="w-40 text-start border border-primary p-1">ID</th>
                      <th className="w-96 text-start border border-primary p-1">User Identity</th>
                      <th className="w-40 text-start border border-primary p-1">BetSet ID</th>
                      <th className="w-40 text-start border border-primary p-1">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="w-40 text-start border border-primary p-1">{d?._id}</td>
                      <td className="w-96 text-start border border-primary p-1">{d?.identity}</td>
                      <td className="w-40 text-start border border-primary p-1">{d?.id}</td>
                      <td className="w-40 text-start border border-primary p-1"><button onClick={() => handleDelete(d?._id)} className="bg-primary text-white rounded px-5 py-2">Delete</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          })}

          <Link to={"user-id-add"}>
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

export default UserID;
