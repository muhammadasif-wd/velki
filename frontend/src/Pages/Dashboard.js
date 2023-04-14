import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader";
import { ServerAPI } from "../API/ServerAPI";
import AuthUser from "../Hooks/AuthUser";
import ModalImage from "react-modal-image";

const Dashboard = () => {
  //loading implement
  const [identityData, setIdentityData] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const { userInfo } = AuthUser()

  // Get Identity Data
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
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="md:text-md xs:text-xs">
          {identityData.length > 0 ? identityData?.map(d => {
            const { username, date, address, whatsapp, img } = d
            return (
              <div className="bg-secondary/50 rounded-md drop-shadow-xl p-5 grid grid-cols-2 gap-5">
                <p className="border-2 border-dark p-2 rounded">
                  User Name: {username ? username : "No data found"}
                </p>
                <p className="border-2 border-dark p-2 rounded">ID: {userInfo?._id ? userInfo?._id : "No data found"}</p>
                <p className="border-2 border-dark p-2 rounded">
                  4 Digit Code: {userInfo?.code ? userInfo?.code : "No data found"}
                </p>
                <p className="border-2 border-dark p-2 rounded">
                  Date of birth: {date ? date : "No data found"}
                </p>
                <p className="border-2 border-dark p-2 rounded">
                  Address: {address ? address : "No data found"}
                </p>
                <p className="border-2 border-dark p-2 rounded">
                  Whatsapp: {whatsapp ? whatsapp : "No data found"}
                </p>
                <p className="flex gap-3 items-center">
                  Voter ID Card:
                  {img ? <ModalImage
                    small={img}
                    large={img}
                    className="h-20 w-20"
                  /> : "No data found"}
                </p>
              </div>
            )
          }) : <p className="text-4xl text-primary font-bold text-center">আমাদের ওয়েবসাইট এ আপনাকে স্বাগতম। <br /> <br /> আমাদের সাথে আপনাকে থাকতে হলে অবশ্যই আপনার তথ্য আমাদেরকে দিতে হবে।</p>}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
