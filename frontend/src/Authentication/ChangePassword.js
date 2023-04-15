import React, { useEffect, useState } from "react";
import Loader from "../Shared/Loader";

const ChangePassword = () => {
  //loading implement
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1>Change Password</h1>
          <form action="">
            <div className="flex flex-col gap-2 border border-dark/50 rounded-md md:w-1/2 mt-20 p-5">
              <p className="text-2xl text-center py-3">Change Password</p>
              <input
                type="password"
                name="password"
                id="password"
                className="border border-dark/50 rounded-md p-1 outline-none"
                placeholder="type your current password"
              />
              <input
                type="password"
                name="newPassword"
                id="password"
                className="border border-dark/50 rounded-md p-1 outline-none"
                placeholder="type your new password"
              />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="border border-dark/50 rounded-md p-1 outline-none"
                placeholder="type your Confirm password"
              />
              <input
                type="submit"
                value="Confirm"
                className="bg-info py-2 text-white rounded-md"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
