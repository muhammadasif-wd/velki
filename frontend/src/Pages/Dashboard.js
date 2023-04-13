import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader";

const Dashboard = () => {
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="md:text-md xs:text-xs">
          <div className="bg-secondary/50 rounded-md drop-shadow-xl p-5 grid grid-cols-2 gap-5">
            <p className="border-2 border-dark p-2 rounded">
              User Name: Muhammad Asif
            </p>
            <p className="border-2 border-dark p-2 rounded">ID: 73493</p>
            <p className="border-2 border-dark p-2 rounded">
              4 Digit Code: 21432
            </p>
            <p className="border-2 border-dark p-2 rounded">
              Date of birth: 12/12/1202
            </p>
            <p className="border-2 border-dark p-2 rounded">
              Address: Lorem ipsum dolor sit{" "}
            </p>
            <p className="border-2 border-dark p-2 rounded">
              Whatsapp: 54322434132131
            </p>
            <p className="flex gap-3 items-center">
              Voter ID Card:
              <button className="bg-dark rounded-md px-3 py-1 text-white">
                View
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
