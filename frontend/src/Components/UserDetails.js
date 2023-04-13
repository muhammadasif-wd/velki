import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader";

const UserDetails = () => {
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-4xl text-dark">Personal Data</h1>
          <p className="text-sm text-dark mt-5">
            Your account contains personal data that you have given us. This
            page allows you to download or delete that data.
          </p>
          <p className="text-sm bg-primary rounded-md text-white p-3 mt-5 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 1536 1568"
            >
              <path
                fill="currentColor"
                d="M1312 797q0-161-87-295l-754 753q137 89 297 89q111 0 211.5-43.5T1153 1184t116-174.5t43-212.5zm-999 299l755-754q-135-91-300-91q-148 0-273 73T297 523t-73 274q0 162 89 299zm1223-299q0 157-61 300t-163.5 246t-245 164t-298.5 61t-298.5-61t-245-164T61 1097T0 797t61-299.5T224.5 252t245-164T768 27t298.5 61t245 164T1475 497.5t61 299.5z"
              />
            </svg>
            Deleting this data will permanently remove your account, and this
            cannot be recovered.
          </p>
          <div className="flex gap-2 mt-5">
            <button className="px-3 py-2 bg-info rounded-md drop-shadow-xl text-white">
              Download
            </button>
            <button className="px-3 py-2 bg-info rounded-md drop-shadow-xl text-white">
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetails;
